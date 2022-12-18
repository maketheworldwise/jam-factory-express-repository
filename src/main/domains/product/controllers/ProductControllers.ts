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
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof ProductController
   */
  public async getProductList(req: Request, res: Response) {
    // TODO: 필터링 및 페이징 처리 (페이징 정보만을 수집하는 미들웨어 등록 여부 고민 필요)
    //
    // 필터링 기준: 미정
    // 페이징 단위: 12

    const productList = await productService.getProductList();

    return res
      .status(statusCode.OK)
      .send(result.success(message.GET_PRODUCT_LIST_SUCCESS, productList));
  }
}
