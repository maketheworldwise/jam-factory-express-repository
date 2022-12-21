import ProductFetchFailedException from '../../../exceptions/product/ProductFetchFailedException';
import message from '../../../utils/resMessage';
import { ProductDao } from '../models/daos/ProductDao';
import { PagingInfoReqDto } from '../models/dtos/PagingInfoReqDto';

const productDao = new ProductDao();

export class ProductService {
  public async getProductList(
    category: string,
    sort: string,
    reqPagingInfoDto: PagingInfoReqDto
  ) {
    try {
      const { page, size } = reqPagingInfoDto;
      const rows: any = await productDao.getProductList(
        category,
        sort,
        page,
        size
      );

      return rows;
    } catch (err: any) {
      throw new ProductFetchFailedException(message.GET_PRODUCT_LIST_FAILED);
    }
  }

  public async getProduct(productId: number) {
    try {
      // 제품 목록 화면에서 제품 상세 화면으로 넘어가기에
      // 제품이 없을 경우에 대한 처리는 생략
      const rows: any = await productDao.getProduct(productId);

      return rows[0];
    } catch (err: any) {
      throw new ProductFetchFailedException(message.GET_PRODUCT_FAILED);
    }
  }
}
