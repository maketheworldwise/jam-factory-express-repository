class SignInTryAgainException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default SignInTryAgainException;
