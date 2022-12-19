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
}
