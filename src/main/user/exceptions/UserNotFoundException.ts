class UserNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default UserNotFoundException;
