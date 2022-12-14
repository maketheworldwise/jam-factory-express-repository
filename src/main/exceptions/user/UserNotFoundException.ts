import RunTimeException from '../../exceptions/RunTimeException';
import statusCode from '../../utils/resStatusCode';

class UserNotFoundException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.NOT_FOUND, message);
  }
}

export default UserNotFoundException;
