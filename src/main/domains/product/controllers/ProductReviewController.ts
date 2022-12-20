import { Request, Response } from 'express';
import ProductReviewRegisterFailedException from '../../../exceptions/product/ProductReviewRegisterFailedException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { PostProductReviewReqDto } from '../models/dtos/PostProductReviewReqDto';
import { ProductReviewService } from '../services/ProductReviewService';

const productReviewService = new ProductReviewService();

export class ProductReviewController {
  /**
   * 제품 후기 등록 : [POST] http://localhost:8080/review/product/:productId
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productId, *rating, *content)
   * @param {Response} res
   * @return {*}
   * @memberof ProductReviewController
   */
  public async postProductReview(req: Request, res: Response) {
    const userId = req.userId;
    const productId = req.params.productId;
    const reqDto: PostProductReviewReqDto = req.body;
    if (!userId || !productId || !reqDto) {
      throw new ProductReviewRegisterFailedException(
        message.PRODUCT_REVIEW_INFO_REQUEST_ERROR
      );
    }

    const productReviewId = await productReviewService.postProductReview(
      Number(userId),
      Number(productId),
      reqDto
    );

    return res
      .status(statusCode.CREATED)
      .send(
        result.success(message.POST_PRODUCT_REVIEW_SUCCESS, { productReviewId })
      );
  }

  /**
   * 제품 후기 목록 조회 : [GET] http://localhost:8080/review/product/:productId
   *
   * @version 1.0.0
   * @since 1.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*productId)
   * @param {Response} res
   * @return {*}
   * @memberof ProductReviewController
   */
  public async getProductReviewList(req: Request, res: Response) {
    const productId = req.params.productId;
    const productReviewList = await productReviewService.getProductReviewList(
      Number(productId)
    );

    return res
      .status(statusCode.OK)
      .send(
        result.success(
          message.GET_PRODUCT_REVIEW_LIST_SUCCESS,
          productReviewList
        )
      );
  }
}
