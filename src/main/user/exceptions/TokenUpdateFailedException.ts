class TokenUpdateFailedException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default TokenUpdateFailedException;
