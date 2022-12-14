import { Request, Response } from 'express';
import ProductCartInfoRequestException from '../../../exceptions/product/ProductCartInfoRequestException';
import ProductInfoRequestException from '../../../exceptions/product/ProductInfoRequestException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { PatchProductCartReqDto } from '../models/dtos/PatchProductCartReqDto';
import { PostProductCartReqDto } from '../models/dtos/PostProductCartReqDto';
import { ProductCartService } from '../services/ProductCartService';

const productCartService = new ProductCartService();

export class ProductCartController {
  /**
   * 제품 장바구니 등록
   * [POST] http://localhost:8080/cart/product/:productId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productId, quantity)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async postProductCart(req: Request, res: Response) {
    const userId: number = req.userId;
    const productId: number = Number(req.params.productId);
    const quantity: number = req.body.quantity;

    if (!userId || !productId || quantity === undefined) {
      throw new ProductCartInfoRequestException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }

    const reqDto: PostProductCartReqDto = {
      userId,
      productId,
      quantity,
    };

    const productCartId: number = await productCartService.postProductCart(
      reqDto
    );

    return res
      .status(statusCode.CREATED)
      .send(
        result.success(message.POST_PRODUCT_CART_SUCCESS, { productCartId })
      );
  }

  /**
   * 제품 장바구니 목록 조회
   * [GET] http://localhost:8080/cart/product
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async getProductCartList(req: Request, res: Response) {
    const userId: number = req.userId;

    if (!userId) {
      throw new ProductInfoRequestException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }

    const productCartList: object[] =
      await productCartService.getProductCartList(userId);

    return res
      .status(statusCode.OK)
      .send(
        result.success(message.GET_PRODUCT_CART_LIST_SUCCESS, productCartList)
      );
  }

  /**
   * 제품 장바구니 수정
   * [PATCH] http://localhost:8080/cart/product/:productId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productId, *quantity)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async patchProductCart(req: Request, res: Response) {
    // 수량이 0일 경우에는 장바구니에서 삭제

    const userId: number = req.userId;
    const productId: number = Number(req.params.productId);
    const quantity: number = req.body.quantity;

    if (!userId || !productId || quantity === undefined) {
      throw new ProductCartInfoRequestException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }

    if (quantity === 0) {
      await productCartService.patchProductCartQuantity0(userId, productId);
    } else {
      const reqDto: PatchProductCartReqDto = {
        userId,
        productId,
        quantity,
      };

      await productCartService.patchProductCart(reqDto);
    }

    return res.status(statusCode.OK).send(
      result.success(message.PATCH_PRODUCT_CART_SUCCESS, {
        userId,
        productId,
        quantity,
      })
    );
  }

  /**
   * 제품 장바구니 삭제
   * [DELETE] http://localhost:8080/cart/:productCartId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productCartId)
   * @param {Response} res
   * @return {*}
   * @memberof ProductCartController
   */
  public async deleteProductCart(req: Request, res: Response) {
    const userId: number = req.userId;
    const productCartId: number = Number(req.params.productCartId);

    if (!userId || !productCartId) {
      throw new ProductInfoRequestException(
        message.PRODUCT_CART_INFO_REQUEST_ERROR
      );
    }

    await productCartService.deleteProductCart(productCartId);

    return res
      .status(statusCode.NO_CONTENT)
      .send(result.success(message.DELETE_PRODUCT_CART_SUCCESS));
  }
}
