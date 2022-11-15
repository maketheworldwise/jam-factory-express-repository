class UserFetchFailedException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default UserFetchFailedException;
