import { Request, Response } from 'express';
import ProductPurchaseFailedException from '../../../exceptions/product/ProductPurchaseFailedException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { PostProductPurchaseReqDto } from '../models/dtos/PostProductPurchaseReqDto';
import { ProductPurchaseService } from '../services/PruductPurchaseService';

const productPurchaseService = new ProductPurchaseService();

export class ProductPurchaseController {
  /**
   * 제품 구매
   * [POST] http://localhost:8080/purchase/product
   *
   * @version 0.0.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productList)
   * @param {Response} res
   * @return {*}
   * @memberof ProductPurchaseController
   */
  public async postProductPurchase(req: Request, res: Response) {
    // TODO: 제품을 구매했을 때 구매한 상품을 장바구니에서 제거할지에 대한 고민 필요

    const userId: number = req.userId;
    const productList: PostProductPurchaseReqDto[] = req.body.productList;

    if (!userId || productList.length === 0) {
      throw new ProductPurchaseFailedException(
        message.PRODUCT_PURCHASE_INFO_REQUEST_ERROR
      );
    }

    await productPurchaseService.postProductPurchase(userId, productList);

    return res.status(statusCode.CREATED).send(
      result.success(message.POST_PRODUCT_PURCHASE_SUCCESS, {
        productList,
      })
    );
  }
}
