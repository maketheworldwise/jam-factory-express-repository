import ProductFetchFailedException from '../../../exceptions/product/ProductFetchFailedException';
import message from '../../../utils/resMessage';
import { ProductDao } from '../models/daos/ProductDao';

const productDao = new ProductDao();

export class ProductService {
  public async getProductList() {
    try {
      const rows: any = await productDao.getProductList();
      return rows;
    } catch (err) {
      throw new ProductFetchFailedException(message.GET_PRODUCT_LIST_FAILED);
    }
  }
}
