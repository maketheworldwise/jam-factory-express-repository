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
        pc.id, 
        pc.user_id AS userId, 
        p.id AS productId,
        p.name AS productName,
        p.price AS productPrice,
        p.delivery_fee AS productDeliveryFee,
        p.image_url AS productImageUrl,
        pc.quantity, 
        pc.created_at AS createdAt, 
        pc.updated_at AS updatedAt
      FROM PRODUCT_CART AS pc
      INNER JOIN PRODUCT AS p ON pc.product_id = p.id
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
