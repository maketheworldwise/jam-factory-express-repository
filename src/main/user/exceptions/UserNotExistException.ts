class UserNotExistException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default UserNotExistException;
