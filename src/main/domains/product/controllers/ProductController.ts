import { Request, Response } from 'express';
import ProductInfoRequestException from '../../../exceptions/product/ProductInfoRequestException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

const categories: string[] = ['jam', 'tea', 'snack'];
const sorts: string[] = ['name.asc', 'name.desc', 'price.asc', 'price.desc'];

export class ProductController {
  /**
   * 제품 목록 조회
   * [GET] http://localhost:8080/product
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (page, size)
   * @param {Response} res
   * @return {*}
   * @memberof ProductController
   */
  public async getProductList(req: Request, res: Response) {
    let category: string = '%';
    let sort: string = 'id.asc';

    const queryCategory: string = String(req.query.category);
    const querySort: string = String(req.query.sort);

    if (queryCategory !== undefined && categories.includes(queryCategory)) {
      category = queryCategory;
    }
    if (querySort !== undefined && sorts.includes(querySort)) {
      sort = querySort;
    }

    const productList: object[] = await productService.getProductList(
      category,
      sort,
      req.pagingInfo
    );

    return res
      .status(statusCode.OK)
      .send(result.success(message.GET_PRODUCT_LIST_SUCCESS, productList));
  }

  /**
   * 제품 상세 조회
   * [GET] http://localhost:8080/product/:productId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*productId)
   * @param {Response} res
   * @return {*}
   * @memberof ProductController
   */
  public async getProduct(req: Request, res: Response) {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ProductInfoRequestException(message.PRODUCT_INFO_REQUEST_ERROR);
    }

    const product = await productService.getProduct(productId);

    return res
      .status(statusCode.OK)
      .send(result.success(message.GET_PRODUCT_SUCCESS, product));
  }
}
