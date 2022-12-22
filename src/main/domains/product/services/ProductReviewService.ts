import ProductReviewFetchFailedException from '../../../exceptions/product/ProductReviewFetchFailedException';
import ProductReviewRegisterFailedException from '../../../exceptions/product/ProductReviewRegisterFailedException';
import message from '../../../utils/resMessage';
import { ProductPurchaseDao } from '../models/daos/ProductPurchaseDao';
import { ProductReviewDao } from '../models/daos/ProductReviewDao';
import { PagingInfoReqDto } from '../models/dtos/PagingInfoReqDto';
import { PostProductReviewReqDto } from '../models/dtos/PostProductReviewReqDto';

const productReviewDao = new ProductReviewDao();
const productPurchaseDao = new ProductPurchaseDao();

export class ProductReviewService {
  public async postProductReview(
    userId: number,
    productId: number,
    reqDto: PostProductReviewReqDto
  ) {
    try {
      const checkProductPurchased: any =
        await productPurchaseDao.verifyProductPurchase(userId, productId);

      const isProductPurchased: boolean =
        checkProductPurchased[0].isProductPurchased;

      if (!isProductPurchased) {
        throw new ProductReviewRegisterFailedException(
          message.PRODUCT_NOT_PURCHASED_ERROR
        );
      }
    } catch (err: any) {
      throw new ProductReviewRegisterFailedException(
        message.PRODUCT_NOT_PURCHASED_ERROR
      );
    }

    try {
      const rows: any = await productReviewDao.postProductReview(
        userId,
        productId,
        reqDto
      );

      return rows.insertId;
    } catch (err: any) {
      throw new ProductReviewRegisterFailedException(
        message.POST_PRODUCT_REVIEW_FAILED
      );
    }
  }

  public async getProductReviewList(
    productId: number,
    reqPagingInfoDto: PagingInfoReqDto
  ) {
    try {
      const { page, size } = reqPagingInfoDto;
      const rows = await productReviewDao.getProductReview(
        productId,
        page,
        size
      );

      return rows;
    } catch (err: any) {
      throw new ProductReviewFetchFailedException(
        message.GET_PRODUCT_CART_LIST_FAILED
      );
    }
  }
}
