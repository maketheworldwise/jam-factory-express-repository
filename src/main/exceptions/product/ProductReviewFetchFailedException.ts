import RunTimeException from '../RunTimeException';
import statusCode from '../../utils/resStatusCode';

class ProductReviewFetchFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default ProductReviewFetchFailedException;
