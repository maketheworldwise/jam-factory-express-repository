import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenExpiredException from '../exceptions/user/TokenExpiredException';
import TokenTypeException from '../exceptions/user/TokenTypeException';
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from './constants';
import message from './resMessage';

const getExp = (tokenType: string) => {
  const actExp = Math.floor(Date.now() / 1000) + 60 * 30; // 30분
  const rftExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7일
  return tokenType === ACCESS_TOKEN_TYPE ? actExp : rftExp;
};

const getSecret = (tokenType: string) => {
  const actSecret = process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_TYPE;
  const rftSecret = process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_TYPE;
  return tokenType === ACCESS_TOKEN_TYPE ? actSecret : rftSecret;
};

const createToken = (tokenType: string, userId: number) => {
  const exp = getExp(tokenType);
  const secret = getSecret(tokenType);
  const token = jwt.sign({ exp, userId }, secret);
  return token;
};

const decodeToken = (tokenType: string, token: string) => {
  return new Promise(resolve => {
    const secret = getSecret(tokenType);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new TokenExpiredException(message.TOKEN_EXPIRED_ERROR);
        }
      }
      if (typeof decoded !== 'object') {
        throw new TokenTypeException(message.TOKEN_TYPE_ERROR);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

const getAccessToken = (authorization: string | undefined) => {
  return authorization?.split('Bearer ')[1];
};

const getRefreshToken = (cookies: { refreshToken: string | undefined }) => {
  return cookies?.refreshToken;
};

export { createToken, decodeToken, getAccessToken, getRefreshToken };
