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
      TRUNCATE PRODUCT;
      SET FOREIGN_KEY_CHECKS = 1;
    `);
    await dataSource.end();
  });

  test('제품 목록 조회', async () => {
    await request(app).get('/product?page=0&size=1').expect(statusCode.OK);
  });
});
