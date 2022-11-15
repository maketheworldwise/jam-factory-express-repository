class SignInFailedException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default SignInFailedException;
