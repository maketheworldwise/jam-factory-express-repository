import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from '../../utils/constants';
import { createToken, decodeToken } from '../../utils/jwtUtils';
import message from '../../utils/resMessage';
import SignUpFailedException from '../exceptions/SignUpFailedException';
import { SignDao } from '../models/daos/SignDao';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { TokensDto } from '../models/dtos/TokensDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import TokenUpdateFailedException from '../exceptions/TokenUpdateFailedException';
import SignInTryAgainException from '../exceptions/SignInTryAgainException';
import TokenHostMisMatchException from '../exceptions/TokenHostMisMatchException';
import { HeaderInfoReqDto } from '../models/dtos/HeaderInfoReqDto';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqBodyDto: SignUpReqDto) {
    try {
      const rows: any = await signDao.signUp(reqBodyDto);
      const userId = rows.insertId;
      return userId;
    } catch (err) {
      throw new SignUpFailedException(message.SIGN_UP_FAILED);
    }
  }

  public async signIn(
    reqHeaderDto: HeaderInfoReqDto,
    reqBodyDto: SignInReqDto
  ) {
    // 회원가입 후 토큰 발급
    let userId: number;

    try {
      const rows: any = await signDao.signIn(reqBodyDto);
      userId = rows[0].id;

      if (!userId) throw new SignUpFailedException(message.SIGN_IN_FAILED);
    } catch (err) {
      throw new SignUpFailedException(message.SIGN_IN_FAILED);
    }

    return this.registerToken(userId, reqHeaderDto);
  }

  public async reissueToken(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    // 회원의 정보와 토큰의 정보가 일치하는지 확인 후 토큰 재발급
    await this.verifyTokenHost(userId, reqHeaderDto);
    return await this.registerToken(userId, reqHeaderDto);
  }

  public async registerToken(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    // 토큰 생성 및 업데이트 (토큰 재발급)
    const tokens = await this.createToken(userId);
    await this.updateToken(userId, reqHeaderDto, tokens);
    return tokens;
  }

  public async createToken(userId: number): Promise<TokensDto> {
    const accessToken = createToken(ACCESS_TOKEN_TYPE, userId);
    const refreshToken = createToken(REFRESH_TOKEN_TYPE, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async updateToken(
    userId: number,
    reqHeaderDto: HeaderInfoReqDto,
    tokens: TokensDto
  ) {
    try {
      await signDao.updateToken(
        userId,
        reqHeaderDto.ip,
        reqHeaderDto.device,
        tokens
      );
    } catch (err) {
      throw new TokenUpdateFailedException(message.TOKEN_UPDATE_FAILED);
    }
  }

  public async verifyToken(tokenType: string, token: any) {
    if (tokenType === ACCESS_TOKEN_TYPE) {
      return await decodeToken(tokenType, token);
    } else if (tokenType === REFRESH_TOKEN_TYPE) {
      // Refresh 토큰 만료시 재로그인 유도
      try {
        return await decodeToken(tokenType, token);
      } catch (err) {
        throw new SignInTryAgainException(message.SIGN_IN_AGAIN);
      }
    }
  }

  public async verifyTokenHost(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    try {
      let isValidHost = true;
      const rows: any = await signDao.verifyTokenHost(
        userId,
        reqHeaderDto.accessToken,
        reqHeaderDto.refreshToken
      );

      console.log(rows);
      isValidHost = rows[0].isValidHost;
      if (!isValidHost) {
        throw new TokenHostMisMatchException(message.TOKEN_HOST_MISMATCH_ERROR);
      }

      return isValidHost;
    } catch (err: any) {
      throw new TokenHostMisMatchException(message.TOKEN_HOST_MISMATCH_ERROR);
    }
  }
}
