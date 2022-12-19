import ProductCartRegisterFailedException from '../../../exceptions/product/ProductCartRegisterFailedException';
import message from '../../../utils/resMessage';
import { ProductCartDao } from '../models/daos/ProductCartDao';
import { PostProductCartReqDto } from '../models/dtos/PostProductCartReqDto';

const productCartDao = new ProductCartDao();

export class ProductCartService {
  public async postProductCart(reqDto: PostProductCartReqDto) {
    try {
      const rows: any = await productCartDao.postProductCart(reqDto);

      return rows.insertId;
    } catch (err) {
      throw new ProductCartRegisterFailedException(
        message.POST_PRODUCT_CART_FAILED
      );
    }
  }
}
