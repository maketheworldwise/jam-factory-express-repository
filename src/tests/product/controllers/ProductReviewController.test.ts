import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import statusCode from '../../../main/utils/resStatusCode';

describe('ProductReviewController Test', () => {
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

    // 제품 구매
    await request(app)
      .post('/purchase/product')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        productList: [
          {
            productId: 1,
            quantity: 4,
          },
          {
            productId: 2,
            quantity: 5,
          },
          {
            productId: 3,
            quantity: 6,
          },
        ],
      });
  });

  afterAll(async () => {
    await dataSource.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      TRUNCATE USER;
      TRUNCATE TOKEN;
      TRUNCATE PRODUCT_PURCHASE;
      TRUNCATE PRODUCT_REVIEW;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('제품 후기 등록', async () => {
    await request(app)
      .post('/review/product/1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        rating: '5.0',
        content: '너무 좋아요',
      })
      .expect(statusCode.CREATED);
  });

  test('제품 후기 목록 조회', async () => {
    await request(app)
      .get('/review/product/1?page=0&size=1')
      .expect(statusCode.OK);
  });
});
