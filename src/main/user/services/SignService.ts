import { SignDao } from '../models/daos/SignDao';
import { SignUpReqDto } from '../models/dtos/SignUpReqDto';

const signDao = new SignDao();

export class SignService {
  public async signUp(reqDto: SignUpReqDto) {
    return await signDao.signUp(reqDto);
  }
}
