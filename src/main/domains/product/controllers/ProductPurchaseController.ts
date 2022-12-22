import { Request, Response } from 'express';
import ProductPurchaseFailedException from '../../../exceptions/product/ProductPurchaseFailedException';
import ProductPurchaseInfoRequestException from '../../../exceptions/product/ProductPurchaseInfoRequestException';
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
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productList)
   * @param {Response} res
   * @return {*}
   * @memberof ProductPurchaseController
   */
  public async postProductPurchase(req: Request, res: Response) {
    const userId: number = req.userId;
    const productList: PostProductPurchaseReqDto[] = req.body.productList;

    if (!userId || productList.length === 0) {
      throw new ProductPurchaseInfoRequestException(
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
