import ProductPurchaseFailedException from '../../../exceptions/product/ProductPurchaseFailedException';
import message from '../../../utils/resMessage';
import { ProductPurchaseDao } from '../models/daos/ProductPurchaseDao';
import { PostProductPurchaseReqDto } from '../models/dtos/PostProductPurchaseReqDto';

const productPurchaseDao = new ProductPurchaseDao();

export class ProductPurchaseService {
  public async postProductPurchase(
    userId: number,
    productList: PostProductPurchaseReqDto[]
  ) {
    // 동일한 제품을 구매할 경우가 있기 때문에
    // 제품을 구매했는지 여부에 대한 처리는 생략

    try {
      await productPurchaseDao.postProductPurchase(userId, productList);
    } catch (err: any) {
      throw new ProductPurchaseFailedException(
        message.POST_PRODUCT_PURCHASE_FAILED
      );
    }
  }
}
