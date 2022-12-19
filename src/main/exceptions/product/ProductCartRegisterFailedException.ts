import RunTimeException from '../RunTimeException';
import statusCode from '../../utils/resStatusCode';

class ProductCartRegisterFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default ProductCartRegisterFailedException;
