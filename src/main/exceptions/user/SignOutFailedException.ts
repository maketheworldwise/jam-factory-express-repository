import RunTimeException from '../RunTimeException';
import statusCode from '../../utils/resStatusCode';

class SignOutFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.DB_ERROR, message);
  }
}

export default SignOutFailedException;
