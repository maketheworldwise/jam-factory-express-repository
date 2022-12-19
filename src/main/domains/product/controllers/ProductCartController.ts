import { Request, Response } from 'express';
import ProductCartRegisterFailedException from '../../../exceptions/product/ProductCartRegisterFailedException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { PostProductCartReqDto } from '../models/dtos/PostProductCartReqDto';
import { ProductCartService } from '../services/ProductCartService';

const productCartService = new ProductCartService();

export class ProductCartController {
  /**
   * 제품 장바구니 등록 : [POST] http://localhost:8080/cart/product/:productId
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productId, quantity)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async postProductCart(req: Request, res: Response) {
    const userId = req.userId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    if (!productId || !userId) {
      throw new ProductCartRegisterFailedException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }

    const reqDto: PostProductCartReqDto = {
      userId,
      productId,
      quantity,
    };
    const productCartId = await productCartService.postProductCart(reqDto);

    return res
      .status(statusCode.CREATED)
      .send(
        result.success(message.POST_PRODUCT_CART_SUCCESS, { productCartId })
      );
  }

  /**
   * 제품 장바구니 목록 조회 : [GET] http://localhost:8080/cart/product
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async getProductCartList(req: Request, res: Response) {
    const userId = req.userId;
    if (!userId) {
      throw new ProductCartRegisterFailedException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }
    const productCartList = await productCartService.getProductCartList(userId);

    return res
      .status(statusCode.OK)
      .send(
        result.success(message.GET_PRODUCT_CART_LIST_SUCCESS, productCartList)
      );
  }
}
