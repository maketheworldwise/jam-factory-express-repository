import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from '../../utils/constants';
import { createToken } from '../../utils/jwtUtils';
import message from '../../utils/resMessage';
import UserNotExistException from '../exceptions/UserNotExistException';
import { SignDao } from '../models/daos/SignDao';
import { SignInReqDto } from '../models/dtos/SignInReqDto';
import { SignInResDto } from '../models/dtos/SignInResDto';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';
import { TokenReqDto } from '../models/dtos/TokenReqDto';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqDto: SignUpReqDto) {
    return await signDao.signUp(reqDto);
  }

  public async signIn(ip: any, device: any, reqDto: SignInReqDto) {
    let user_id: number;

    try {
      const rows: any = await signDao.signIn(reqDto);
      user_id = rows[0].id;
    } catch (err) {
      throw new UserNotExistException(message.USER_NOT_EXIST);
    }

    // 토큰 생성
    const { access_token, refresh_token } = await this.createToken(user_id);
    const resDto: SignInResDto = {
      access_token,
      refresh_token,
    };

    // 토큰 업데이트
    const tokenDto: TokenReqDto = {
      ...resDto,
      user_id,
      ip,
      device,
    };
    await signDao.updateToken(tokenDto);

    return resDto;
  }

  public async createToken(userId: number) {
    const access_token = createToken(ACCESS_TOKEN_TYPE, userId);
    const refresh_token = createToken(REFRESH_TOKEN_TYPE, userId);

    return {
      access_token,
      refresh_token,
    };
  }
}
