import bcrypt from 'bcryptjs';
import {
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_TYPE,
} from '../../../utils/constants';
import { createToken, decodeToken } from '../../../utils/jwtUtils';
import message from '../../../utils/resMessage';
import { SignDao } from '../models/daos/SignDao';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { TokensDto } from '../models/dtos/TokensDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import { HeaderInfoReqDto } from '../models/dtos/HeaderInfoReqDto';
import SignUpFailedException from '../../../exceptions/user/SignUpFailedException';
import SignInFailedException from '../../../exceptions/user/SignInFailedException';
import TokenUpdateFailedException from '../../../exceptions/user/TokenUpdateFailedException';
import SignInTryAgainException from '../../../exceptions/user/SignInTryAgainException';
import UserNotFoundException from '../../../exceptions/user/UserNotFoundException';
import UserFetchFailedException from '../../../exceptions/user/UserFetchFailedException';
import TokenHostMisMatchException from '../../../exceptions/user/TokenHostMisMatchException';
import SignOutFailedException from '../../../exceptions/user/SignOutFailedException';
import NicknameDuplicateException from '../../../exceptions/user/NicknameDuplicateException';
import TokenHostFetchFailedException from '../../../exceptions/user/TokenHostFetchFailedException';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqBodyDto: SignUpReqDto) {
    try {
      await this.verifyNickname(reqBodyDto.nickname);

      const rows: any = await signDao.signUp(reqBodyDto);
      const userId: number = rows.insertId;

      if (!userId || userId === 0) {
        throw new SignUpFailedException(message.SIGN_UP_FAILED);
      }

      return userId;
    } catch (err: any) {
      throw new SignUpFailedException(message.SIGN_UP_FAILED);
    }
  }

  public async signIn(
    reqHeaderDto: HeaderInfoReqDto,
    reqBodyDto: SignInReqDto
  ) {
    // 로그인 후 토큰 발급
    let userId: number;
    let password: string;

    try {
      const rows: any = await signDao.signIn(reqBodyDto.nickname);

      userId = rows[0].id;
      password = rows[0].password;
    } catch (err: any) {
      throw new SignInFailedException(message.SIGN_IN_FAILED);
    }

    if (!userId || !bcrypt.compareSync(reqBodyDto.password, password)) {
      throw new UserNotFoundException(message.USER_NOT_FOUND_ERROR);
    }

    return this.registerToken(userId, reqHeaderDto);
  }

  public async signOut(reqHeaderDto: HeaderInfoReqDto) {
    try {
      const jwtPayload: any = await decodeToken(
        REFRESH_TOKEN_TYPE,
        reqHeaderDto.refreshToken
      );
      const userId: number = jwtPayload.userId;

      await signDao.signOut(userId);
    } catch (err: any) {
      throw new SignOutFailedException(message.SIGN_OUT_FAILED);
    }
  }

  public async reissueToken(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    // 회원의 정보와 토큰의 정보가 일치하는지 확인 후 토큰 재발급
    await this.verifyTokenHost(userId, reqHeaderDto);
    return await this.registerToken(userId, reqHeaderDto);
  }

  public async registerToken(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    // 토큰 생성 및 업데이트 (토큰 재발급)
    const tokens: TokensDto = await this.createToken(userId);
    await this.updateToken(userId, reqHeaderDto, tokens);
    return tokens;
  }

  public async createToken(userId: number): Promise<TokensDto> {
    const accessToken: string = createToken(ACCESS_TOKEN_TYPE, userId);
    const refreshToken: string = createToken(REFRESH_TOKEN_TYPE, userId);

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
    } catch (err: any) {
      throw new TokenUpdateFailedException(message.TOKEN_UPDATE_FAILED);
    }
  }

  public async verifyRefreshToken(refreshToken: any) {
    // Refresh 토큰 만료시 재로그인
    try {
      return await decodeToken(REFRESH_TOKEN_TYPE, refreshToken);
    } catch (err: any) {
      throw new SignInTryAgainException(message.SIGN_IN_AGAIN);
    }
  }

  public async verifyNickname(nickname: string) {
    let isNotValidNickname = false;

    try {
      const rows: any = await signDao.verifyNickname(nickname);
      isNotValidNickname = rows[0].isNotValidNickname;
    } catch (err: any) {
      throw new UserFetchFailedException(message.USER_FETCH_FAILED);
    }

    if (isNotValidNickname) {
      throw new NicknameDuplicateException(message.VERIFY_NICKNAME_FAILED);
    }
  }

  public async verifyTokenUser(userId: number) {
    let isValidUser = true;

    try {
      const rows: any = await signDao.verifyTokenUser(userId);
      isValidUser = rows[0].isValidUser;
    } catch {
      throw new UserFetchFailedException(message.USER_FETCH_FAILED);
    }

    if (!isValidUser) {
      throw new UserNotFoundException(message.USER_NOT_FOUND_ERROR);
    }
  }

  public async verifyTokenHost(userId: number, reqHeaderDto: HeaderInfoReqDto) {
    let isValidHost: boolean = false;

    try {
      await this.verifyTokenUser(userId);

      const rows: any = await signDao.verifyTokenHost(
        userId,
        reqHeaderDto.accessToken,
        reqHeaderDto.refreshToken
      );
      isValidHost = rows[0].isValidHost;
    } catch (err: any) {
      throw new TokenHostFetchFailedException(message.TOKEN_HOST_FETCH_FAILED);
    }

    if (!isValidHost) {
      throw new TokenHostMisMatchException(message.TOKEN_HOST_MISMATCH_ERROR);
    }
  }
}
