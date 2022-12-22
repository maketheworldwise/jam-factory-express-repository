import { Request, Response } from 'express';
import ProductReviewInfoRequestException from '../../../exceptions/product/ProductReviewInfoRequestException';
import message from '../../../utils/resMessage';
import result from '../../../utils/resObject';
import statusCode from '../../../utils/resStatusCode';
import { PostProductReviewReqDto } from '../models/dtos/PostProductReviewReqDto';
import { ProductReviewService } from '../services/ProductReviewService';

const productReviewService = new ProductReviewService();

export class ProductReviewController {
  /**
   * 제품 후기 등록
   * [POST] http://localhost:8080/review/product/:productId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*authorization, *productId, *rating, *content)
   * @param {Response} res
   * @return {*}
   * @memberof ProductReviewController
   */
  public async postProductReview(req: Request, res: Response) {
    const userId: number = req.userId;
    const productId: number = Number(req.params.productId);
    const reqDto: PostProductReviewReqDto = req.body;

    if (!userId || !productId || !reqDto.rating || !reqDto.content) {
      throw new ProductReviewInfoRequestException(
        message.PRODUCT_REVIEW_INFO_REQUEST_ERROR
      );
    }

    const productReviewId: number =
      await productReviewService.postProductReview(userId, productId, reqDto);

    return res
      .status(statusCode.CREATED)
      .send(
        result.success(message.POST_PRODUCT_REVIEW_SUCCESS, { productReviewId })
      );
  }

  /**
   * 제품 후기 목록 조회
   * [GET] http://localhost:8080/review/product/:productId
   *
   * @version 0.1.0
   * @since 0.0.0
   * @author Kevin Ahn
   *
   * @param {Request} req (*productId)
   * @param {Response} res
   * @return {*}
   * @memberof ProductReviewController
   */
  public async getProductReviewList(req: Request, res: Response) {
    const productId: number = Number(req.params.productId);

    const productReviewList: any =
      await productReviewService.getProductReviewList(
        productId,
        req.pagingInfo
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
