import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import statusCode from '../../../main/utils/resStatusCode';

describe('ProductPurchaseController Test', () => {
  let app: any;
  let accessToken: string;

  beforeAll(async () => {
    app = createApp();

    // 회원가입 및 로그인
    await request(app).post('/sign-up').send({
      nickname: 'kevin',
      password: '12345',
      phone: '010-1234-5678',
      birth: '1994-11-22',
      email: 'kevin@example.com',
    });

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
      TRUNCATE PRODUCT_PURCHASE;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('제품 구매', async () => {
    await request(app)
      .post('/purchase/product')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        productList: [
          {
            productId: 2,
            quantity: 3,
          },
          {
            productId: 4,
            quantity: 6,
          },
          {
            productId: 6,
            quantity: 9,
          },
        ],
      })
      .expect(statusCode.CREATED);
  });
});
