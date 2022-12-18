import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import statusCode from '../../../main/utils/resStatusCode';

describe('SignController Test', () => {
  let app: any;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    app = createApp();
  });

  afterAll(async () => {
    await dataSource.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE USER;
      TRUNCATE TOKEN;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('아이디 중복 확인 (성공)', async () => {
    await request(app).get('/verify-nickname/kevin').expect(statusCode.OK);
  });

  test('회원가입', async () => {
    await request(app)
      .post('/sign-up')
      .send({
        nickname: 'kevin',
        password: '12345',
        phone: '01012345678',
        birth: '1994-11-22',
        email: 'kevin@example.com',
      })
      .expect(statusCode.CREATED);
  });

  test('아이디 중복 확인 (실패)', async () => {
    await request(app)
      .get('/verify-nickname/kevin')
      .expect(statusCode.BAD_REQUEST);
  });

  test('로그인', async () => {
    await request(app)
      .post('/sign-in')
      .send({
        nickname: 'kevin',
        password: '12345',
      })
      .expect(statusCode.OK)
      .then(res => {
        accessToken = res.body.data.accessToken;
        refreshToken = res.header['set-cookie'];
      });
  });

  test('Access 토큰 검증', async () => {
    await request(app)
      .post('/verify-access-token')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(statusCode.OK);
  });

  test('토큰 재발급', async () => {
    await request(app)
      .post('/reissue-token')
      .set('Authorization', 'Bearer ' + accessToken)
      .set('Cookie', refreshToken)
      .expect(statusCode.CREATED);
  });

  test('로그아웃', async () => {
    await request(app)
      .post('/sign-out')
      .set('Authorization', 'Bearer ' + accessToken)
      .set('Cookie', refreshToken)
      .expect(statusCode.NO_CONTENT);
  });
});
