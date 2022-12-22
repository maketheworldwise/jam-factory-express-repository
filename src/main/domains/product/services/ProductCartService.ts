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
    // 장바구니에 없는 제품일 경우 새로 등록
    // 장바구니에 있는 제품일 경우 새로 요청한 수량으로 업데이트

    try {
      const rows: any = await productCartDao.postProductCart(reqDto);
      const productId: number = rows.insertId;

      if (!productId) {
        throw new ProductCartRegisterFailedException(
          message.POST_PRODUCT_CART_FAILED
        );
      }

      return productId;
    } catch (err: any) {
      throw new ProductCartRegisterFailedException(
        message.POST_PRODUCT_CART_FAILED
      );
    }
  }

  public async getProductCartList(userId: number) {
    try {
      const rows: any = await productCartDao.getProductCartList(userId);

      return rows;
    } catch (err: any) {
      throw new ProductCartFetchFailedException(
        message.GET_PRODUCT_CART_LIST_FAILED
      );
    }
  }

  public async patchProductCart(reqDto: PatchProductCartReqDto) {
    try {
      await productCartDao.patchProductCart(reqDto);
    } catch (err: any) {
      throw new ProductCartUpdateFailedException(
        message.PATCH_PRODUCT_CART_FAILED
      );
    }
  }

  public async deleteProductCart(productCartId: number) {
    try {
      await productCartDao.deleteProductCart(productCartId);
    } catch (err: any) {
      throw new ProductCartDeleteFailedException(
        message.DELETE_PRODUCT_CART_FAILED
      );
    }
  }
}
