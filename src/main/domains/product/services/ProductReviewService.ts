import ProductReviewFetchFailedException from '../../../exceptions/product/ProductReviewFetchFailedException';
import ProductReviewRegisterFailedException from '../../../exceptions/product/ProductReviewRegisterFailedException';
import message from '../../../utils/resMessage';
import { ProductReviewDao } from '../models/daos/ProductReviewDao';
import { PostProductReviewReqDto } from '../models/dtos/PostProductReviewReqDto';

const productReviewDao = new ProductReviewDao();

export class ProductReviewService {
  public async postProductReview(
    userId: number,
    productId: number,
    reqDto: PostProductReviewReqDto
  ) {
    try {
      const rows: any = await productReviewDao.postProductReview(
        userId,
        productId,
        reqDto
      );
      // TODO: 내가 구매했는지 안했는지에 대한 로직 필요
      return rows.insertId;
    } catch (err) {
      throw new ProductReviewRegisterFailedException(
        message.POST_PRODUCT_REVIEW_FAILED
      );
    }
  }

  public async getProductReviewList(productId: number) {
    try {
      const rows = await productReviewDao.getProductReview(productId);

      return rows;
    } catch (err) {
      throw new ProductReviewFetchFailedException(
        message.GET_PRODUCT_CART_LIST_FAILED
      );
    }
  }
}
