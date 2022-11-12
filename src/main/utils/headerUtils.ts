import { Request } from 'express';
import { getAccessToken, getRefreshToken } from './jwtUtils';

const getHeaderInfo = (req: Request) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const device = req.headers['user-agent'] || 'web';

  const accessToken = getAccessToken(req.headers.authorization) || '';
  const refreshToken = req.headers.cookie;
  // const refreshToken = getRefreshToken(req.cookies);

  return {
    ip,
    device,
    accessToken,
    refreshToken,
  };
};

export default getHeaderInfo;
