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

  public async getProductReview(productId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT
        pr.id,
        u.id AS userId,
        u.nickname,
        pr.product_id AS productId,
        pr.rating,
        pr.content,
        pr.created_at AS createdAt,
        pr.updated_at AS updatedAt
      FROM PRODUCT_REVIEW pr 
      INNER JOIN USER u ON pr.user_id = u.id
      WHERE pr.product_id = ?
      ORDER BY pr.created_at DESC`,
      [productId]
    );

    return rows;
  }
}
