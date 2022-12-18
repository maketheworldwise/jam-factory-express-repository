const BCRYPT_SALT = 10;
const ACCESS_TOKEN_TYPE = 'accessToken';
const REFRESH_TOKEN_TYPE = 'refreshToken';

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
};

export {
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_TYPE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  BCRYPT_SALT,
};
