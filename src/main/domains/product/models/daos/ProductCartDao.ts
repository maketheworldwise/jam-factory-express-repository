import dataSource from '../../../../../../configs/db.config';
import { PatchProductCartReqDto } from '../dtos/PatchProductCartReqDto';
import { PostProductCartReqDto } from '../dtos/PostProductCartReqDto';

export class ProductCartDao {
  public async postProductCart(reqDto: PostProductCartReqDto) {
    const { userId, productId, quantity } = reqDto;

    const [rows, _] = await dataSource.query(
      `INSERT INTO PRODUCT_CART(user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = ${quantity}`,
      [userId, productId, quantity]
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
      [userId]
    );

    return rows;
  }

  public async patchProductCart(reqDto: PatchProductCartReqDto) {
    const { userId, productId, quantity } = reqDto;

    await dataSource.query(
      `UPDATE PRODUCT_CART SET quantity = ? 
        WHERE user_id = ? AND product_id = ?`,
      [quantity, userId, productId]
    );
  }

  public async patchProductCartQuantity0(userId: number, productId: number) {
    await dataSource.query(
      `DELETE FROM PRODUCT_CART WHERE user_id = ? AND product_id = ?`,
      [userId, productId]
    );
  }

  public async deleteProductCart(productCartId: number) {
    await dataSource.query(`DELETE FROM PRODUCT_CART WHERE id = ?`, [
      productCartId,
    ]);
  }
}
