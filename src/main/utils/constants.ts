const ACCESS_TOKEN_TYPE = 'access-token';
const REFRESH_TOKEN_TYPE = 'refresh-token';

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7일
};

export { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE, REFRESH_TOKEN_COOKIE_OPTIONS };
