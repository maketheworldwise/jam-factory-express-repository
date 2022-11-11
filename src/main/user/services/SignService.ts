import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from '../../utils/constants';
import { createToken, decodeToken } from '../../utils/jwtUtils';
import message from '../../utils/resMessage';
import SignUpFailedException from '../exceptions/SignUpFailedException';
import { SignDao } from '../models/daos/SignDao';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { TokensDto } from '../models/dtos/TokensDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import TokenUpdateFailedException from '../exceptions/TokenUpdateFailedException';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqDto: SignUpReqDto) {
    try {
      const rows: any = await signDao.signUp(reqDto);
      const userId = rows.insertId;
      return userId;
    } catch (err) {
      throw new SignUpFailedException(message.SIGN_UP_FAILED);
    }
  }

  public async signIn(ip: any, device: any, reqDto: SignInReqDto) {
    let userId: number;

    // 회원가입
    try {
      const rows: any = await signDao.signIn(reqDto);
      userId = rows[0].id;

      if (!userId) throw new SignUpFailedException(message.SIGN_IN_FAILED);
    } catch (err) {
      throw new SignUpFailedException(message.SIGN_IN_FAILED);
    }

    // 토큰 생성 및 업데이트 (토큰 재발급)
    const tokens = await this.createToken(userId);
    await this.updateToken(userId, ip, device, tokens);
    return tokens;
  }

  public async updateToken(
    userId: number,
    ip: string,
    device: string,
    tokens: TokensDto
  ) {
    try {
      await signDao.updateToken(userId, ip, device, tokens);
    } catch (err) {
      throw new TokenUpdateFailedException(message.TOKEN_UPDATE_FAILED);
    }
  }

  public async createToken(userId: number): Promise<TokensDto> {
    const accessToken = createToken(ACCESS_TOKEN_TYPE, userId);
    const refreshToken = createToken(REFRESH_TOKEN_TYPE, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyToken(tokenType: string, accessToken: any) {
    return await decodeToken(tokenType, accessToken);
  }
}
