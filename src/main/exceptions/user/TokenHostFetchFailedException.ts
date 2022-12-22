import RunTimeException from '../../exceptions/RunTimeException';
import statusCode from '../../utils/resStatusCode';

class TokenHostFetchFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.DB_ERROR, message);
  }
}

export default TokenHostFetchFailedException;
