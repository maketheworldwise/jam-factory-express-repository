import ProductCartFetchFailedException from '../../../exceptions/product/ProductCartFetchFailedException';
import ProductCartRegisterFailedException from '../../../exceptions/product/ProductCartRegisterFailedException';
import message from '../../../utils/resMessage';
import { ProductCartDao } from '../models/daos/ProductCartDao';
import { PostProductCartReqDto } from '../models/dtos/PostProductCartReqDto';

const productCartDao = new ProductCartDao();

export class ProductCartService {
  public async postProductCart(reqDto: PostProductCartReqDto) {
    try {
      const rows: any = await productCartDao.postProductCart(reqDto);
      const userId = rows.insertId;

      if (!userId) {
        throw new ProductCartRegisterFailedException(
          message.POST_PRODUCT_CART_FAILED
        );
      }
      return userId;
    } catch (err) {
      throw new ProductCartRegisterFailedException(
        message.POST_PRODUCT_CART_FAILED
      );
    }
  }

  public async getProductCartList(userId: number) {
    try {
      const rows: any = await productCartDao.getProductCartList(userId);

      return rows;
    } catch (err) {
      throw new ProductCartFetchFailedException(
        message.GET_PRODUCT_CART_LIST_FAILED
      );
    }
  }
}
