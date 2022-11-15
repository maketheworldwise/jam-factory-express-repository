import RunTimeException from '../../exceptions/RunTimeException';
import statusCode from '../../utils/resStatusCode';

class TokenExpiredException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default TokenExpiredException;
