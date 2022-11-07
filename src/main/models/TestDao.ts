import dataSource from '../../../configs/db.config';

export class TestDao {
  public async createTest(content: string) {
    await dataSource.query(`INSERT INTO TEST(content) VALUES (?)`, [content]);
  }

  public async readTest() {
    const [rows, fields] = await dataSource.query(
      `SELECT id, content FROM TEST`
    );
    return rows;
  }
}
