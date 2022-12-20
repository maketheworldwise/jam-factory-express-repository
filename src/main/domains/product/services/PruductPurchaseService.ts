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
    try {
      await productPurchaseDao.postProductPurchase(userId, productList);
    } catch (err) {
      throw new ProductPurchaseFailedException(
        message.POST_PRODUCT_PURCHASE_FAILED
      );
    }
  }
}
