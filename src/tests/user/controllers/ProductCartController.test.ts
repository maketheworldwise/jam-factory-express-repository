import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import statusCode from '../../../main/utils/resStatusCode';

describe('ProductCartController Test', () => {
  let app: any;
  let accessToken: string;

  beforeAll(async () => {
    app = createApp();

    // 회원가입
    await request(app).post('/sign-up').send({
      nickname: 'kevin',
      password: '12345',
      phone: '01012345678',
      birth: '1994-11-22',
      email: 'kevin@example.com',
    });

    // 로그인
    await request(app)
      .post('/sign-in')
      .send({
        nickname: 'kevin',
        password: '12345',
      })
      .then(res => {
        accessToken = res.body.data.accessToken;
      });
  });

  afterAll(async () => {
    await dataSource.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE USER;
      TRUNCATE TOKEN;
      TRUNCATE PRODUCT_CART;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('제품 장바구니 등록', async () => {
    await request(app)
      .post('/cart/product/1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        quantity: 3,
      })
      .expect(statusCode.CREATED);
  });

  test('제품 장바구니 목록 조회', async () => {
    await request(app)
      .get('/cart/product')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(statusCode.OK);
  });

  test('제품 장바구니 수정', async () => {
    await request(app)
      .patch('/cart/product/1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        quantity: 1,
      })
      .expect(statusCode.OK);
  });
});
