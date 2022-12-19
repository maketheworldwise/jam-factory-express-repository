import { Request, Response } from 'express';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
  /**
   * 제품 목록 조회 : [GET] http://localhost:8080/product
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (page, size)
   * @param {Response} res
   * @return {*}
   * @memberof ProductController
   */
  public async getProductList(req: Request, res: Response) {
    // TODO: 필터링 (기준 미정)
    const productList = await productService.getProductList(req.pagingInfo);

    return res
      .status(statusCode.OK)
      .send(result.success(message.GET_PRODUCT_LIST_SUCCESS, productList));
  }

  /**
   * 제품 상세 조회 : [GET] http://localhost:8080/product/:productId
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*productId)
   * @param {Response} res
   * @return {*}
   * @memberof ProductController
   */
  public async getProduct(req: Request, res: Response) {
    const productId = req.params.productId;
    const product = await productService.getProduct(Number(productId));

    return res
      .status(statusCode.OK)
      .send(result.success(message.GET_PRODUCT_SUCCESS, product));
  }
}
