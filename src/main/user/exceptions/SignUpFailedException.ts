class SignUpFailedException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default SignUpFailedException;
