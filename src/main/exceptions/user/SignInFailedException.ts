import RunTimeException from '../RunTimeException';
import statusCode from '../../utils/resStatusCode';

class SignInFailedException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.DB_ERROR, message);
  }
}

export default SignInFailedException;
