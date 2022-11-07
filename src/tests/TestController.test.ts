import request from 'supertest';
import createApp from '../../app';
import dataSource from '../../configs/db.config';

describe('Test API', () => {
  let app: any;

  beforeAll(async () => {
    app = createApp();
    console.log('beforeAll()');
  });

  afterAll(async () => {
    dataSource.query(`TRUNCATE TEST`);
    console.log('afterAll()');
  });

  test('createTest', async () => {
    await request(app)
      .post('/test')
      .send({
        content: 'test',
      })
      .expect(201)
      .expect({ message: 'createTest' });
  });

  test('readTest', async () => {
    await request(app).get('/test').expect(200);
  });
});
