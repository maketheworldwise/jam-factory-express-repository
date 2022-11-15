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
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserFetchFailedException from '../exceptions/UserFetchFailedException';
import SignInFailedException from '../exceptions/SignInFailedException';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqBodyDto: SignUpReqDto) {
    try {
      const rows: any = await signDao.signUp(reqBodyDto);
      const userId = rows.insertId;

      if (!userId) {
        throw new SignUpFailedException(message.SIGN_UP_FAILED);
      }
      return userId;
    } catch (err) {
      throw new SignUpFailedException(message.SIGN_UP_FAILED);
    }
  }

  public async signIn(
    reqHeaderDto: HeaderInfoReqDto,
    reqBodyDto: SignInReqDto
  ) {
    try {
      // 로그인 후 토큰 발급
      const rows: any = await signDao.signIn(reqBodyDto);
      const userId = rows[0].id;

      if (!userId) {
        throw new SignInFailedException(message.USER_NOT_FOUND_ERROR);
      }
      return this.registerToken(userId, reqHeaderDto);
    } catch (err) {
      throw new SignInFailedException(message.SIGN_IN_FAILED);
    }
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

  public async verifyRefreshToken(refreshToken: any) {
    try {
      return await decodeToken(REFRESH_TOKEN_TYPE, refreshToken);
    } catch (err) {
      // Refresh 토큰 만료시 재로그인
      throw new SignInTryAgainException(message.SIGN_IN_AGAIN);
    }
  }

  public async verifyTokenUser(userId: number) {
    try {
      const rows: any = await signDao.verifyTokenUser(userId);
      const isValidUser = rows[0].isValidUser;

      if (!isValidUser) {
        throw new UserNotFoundException(message.USER_NOT_FOUND_ERROR);
      }
    } catch {
      throw new UserFetchFailedException(message.USER_FETCH_FAILED);
    }
  }

  public async verifyTokenHost(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    try {
      await this.verifyTokenUser(userId);

      const rows: any = await signDao.verifyTokenHost(
        userId,
        reqHeaderDto.accessToken,
        reqHeaderDto.refreshToken
      );
      const isValidHost = rows[0].isValidHost;

      if (!isValidHost) {
        throw new TokenHostMisMatchException(message.TOKEN_HOST_MISMATCH_ERROR);
      }
    } catch (err: any) {
      throw new TokenHostMisMatchException(message.TOKEN_HOST_FETCH_FAILED);
    }
  }
}
