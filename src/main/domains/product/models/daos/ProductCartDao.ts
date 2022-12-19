import dataSource from '../../../../../../configs/db.config';
import { PostProductCartReqDto } from '../dtos/PostProductCartReqDto';

export class ProductCartDao {
  public async postProductCart(reqDto: PostProductCartReqDto) {
    const { userId, productId, quantity } = reqDto;
    const [rows, _] = await dataSource.query(
      `INSERT INTO PRODUCT_CART(user_id, product_id, quantity) VALUES(?, ?, ?)`,
      [Number(userId), Number(productId), Number(quantity)]
    );

    return rows;
  }

  public async getProductCartList(userId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT 
        id, 
        user_id AS userId, 
        product_id AS productId, 
        quantity, 
        created_at AS createdAt, 
        updated_at AS updatedAt
      FROM PRODUCT_CART 
      WHERE user_id = ?
      ORDER BY created_at DESC`,
      [Number(userId)]
    );
    return rows;
  }
}
