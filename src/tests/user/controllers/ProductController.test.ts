import request from 'supertest';
import createApp from '../../../../app';
import dataSource from '../../../../configs/db.config';
import statusCode from '../../../main/utils/resStatusCode';

describe('ProductController Test', () => {
  let app: any;

  beforeAll(async () => {
    app = createApp();
  });

  afterAll(async () => {
    await dataSource.query(`
      SET FOREIGN_KEY_CHECKS = 0;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('제품 목록 조회', async () => {
    await request(app).get('/product?page=0&size=1').expect(statusCode.OK);
  });

  test('제품 상세 조회', async () => {
    await request(app)
      .get('/product/1')
      .expect(statusCode.OK)
      .then(res => {
        expect(res.body).toEqual({
          success: true,
          message: '제품 상세 조회에 성공했습니다.',
          data: {
            id: 1,
            name: '[복음자리] 사과잼 370g',
            price: 5980,
            deliveryFee: 3000,
            imageUrl: ' http://localhost:8080/data/images/jam_1.jpeg',
          },
        });
      });
  });
});
