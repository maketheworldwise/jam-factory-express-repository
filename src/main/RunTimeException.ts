import statusCode from './utils/resStatusCode';

class RunTimeException extends Error {
  code = statusCode.INTERNAL_SERVER_ERROR;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default RunTimeException;
