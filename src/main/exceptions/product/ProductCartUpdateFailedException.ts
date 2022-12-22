import RunTimeException from '../RunTimeException';
import statusCode from '../../utils/resStatusCode';

class ProductCartUpdateFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.DB_ERROR, message);
  }
}

export default ProductCartUpdateFailedException;
