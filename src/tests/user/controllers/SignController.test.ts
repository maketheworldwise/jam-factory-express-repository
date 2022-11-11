import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import { REFRESH_TOKEN_TYPE } from '../../../main/utils/constants';
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

  test('회원가입', async () => {
    await request(app)
      .post('/sign-up')
      .send({
        nickname: 'kevin',
        password: '12345',
        phone: '01012345678',
        birth: '1994-11-22',
      })
      .expect(statusCode.CREATED);
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
      });
  });

  test('Access 토큰 검증', async () => {
    await request(app)
      .post('/verify-access-token')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(statusCode.OK);
  });
});
