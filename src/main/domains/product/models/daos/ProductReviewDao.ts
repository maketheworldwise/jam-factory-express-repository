import dataSource from '../../../../../../configs/db.config';
import { PostProductReviewReqDto } from '../dtos/PostProductReviewReqDto';

export class ProductReviewDao {
  public async postProductReview(
    userId: number,
    productId: number,
    reqDto: PostProductReviewReqDto
  ) {
    const { rating, content } = reqDto;
    const [rows, _] = await dataSource.query(
      `INSERT PRODUCT_REVIEW(user_id, product_id, rating, content) VALUES (?, ?, ?, ?)`,
      [userId, productId, rating, content]
    );

    return rows;
  }
}
