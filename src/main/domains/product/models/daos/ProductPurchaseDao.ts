import dataSource from '../../../../../../configs/db.config';
import { PostProductPurchaseReqDto } from '../dtos/PostProductPurchaseReqDto';

export class ProductPurchaseDao {
  public async postProductPurchase(
    userId: number,
    productList: PostProductPurchaseReqDto[]
  ) {
    let values = '';
    productList.forEach((item, idx) => {
      if (idx + 1 === productList.length) {
        values += `(${userId}, ${item.productId}, ${item.quantity})`;
      } else {
        values += `(${userId}, ${item.productId}, ${item.quantity}), `;
      }
    });

    await dataSource.query(
      `INSERT INTO PRODUCT_PURCHASE(user_id, product_id, quantity) 
        VALUES ${values}`
    );
  }

  public async verifyProductPurchase(userId: number, productId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT EXISTS(
        SELECT id FROM PRODUCT_PURCHASE WHERE user_id = ? AND product_id = ?) AS isProductPurchased`,
      [userId, productId]
    );

    return rows;
  }
}
