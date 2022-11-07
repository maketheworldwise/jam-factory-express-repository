import { TestDao } from '../models/TestDao';

const testDao = new TestDao();

export class TestService {
  public async createTest(content: string) {
    await testDao.createTest(content);
  }

  public async readTest() {
    const testList = await testDao.readTest();
    return testList;
  }
}
