import RunTimeException from '../../exceptions/RunTimeException';
import statusCode from '../../utils/resStatusCode';

class TokenHostMisMatchException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default TokenHostMisMatchException;
