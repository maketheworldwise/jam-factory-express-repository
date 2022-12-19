import ProductFetchFailedException from '../../../exceptions/product/ProductFetchFailedException';
import message from '../../../utils/resMessage';
import { ProductDao } from '../models/daos/ProductDao';
import { PagingInfoReqDto } from '../models/dtos/PagingInfoReqDto';

const productDao = new ProductDao();

export class ProductService {
  public async getProductList(reqPagingInfoDto: PagingInfoReqDto) {
    try {
      const { page, size } = reqPagingInfoDto;
      const rows: any = await productDao.getProductList(page, size);

      return rows;
    } catch (err) {
      throw new ProductFetchFailedException(message.GET_PRODUCT_LIST_FAILED);
    }
  }

  public async getProduct(productId: number) {
    try {
      const rows: any = await productDao.getProduct(productId);

      return rows[0];
    } catch (err) {
      throw new ProductFetchFailedException(message.GET_PRODUCT_FAILED);
    }
  }
}
