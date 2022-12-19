import ProductCartDeleteFailedException from '../../../exceptions/product/ProductCartDeleteFailedException';
import ProductCartFetchFailedException from '../../../exceptions/product/ProductCartFetchFailedException';
import ProductCartRegisterFailedException from '../../../exceptions/product/ProductCartRegisterFailedException';
import ProductCartUpdateFailedException from '../../../exceptions/product/ProductCartUpdateFailedException';
import message from '../../../utils/resMessage';
import { ProductCartDao } from '../models/daos/ProductCartDao';
import { PatchProductCartReqDto } from '../models/dtos/PatchProductCartReqDto';
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

  public async patchProductCart(reqDto: PatchProductCartReqDto) {
    try {
      await productCartDao.patchProductCart(reqDto);
    } catch (err) {
      throw new ProductCartUpdateFailedException(
        message.PATCH_PRODUCT_CART_FAILED
      );
    }
  }

  public async deleteProductCart(productCartId: number) {
    try {
      await productCartDao.deleteProductCart(productCartId);
    } catch (err) {
      throw new ProductCartDeleteFailedException(
        message.DELETE_PRODUCT_CART_FAILED
      );
    }
  }
}
