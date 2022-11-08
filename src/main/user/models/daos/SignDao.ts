import dataSource from '../../../../../configs/db.config';
import { SignUpReqDto } from '../dtos/SignUpReqDto';

export class SignDao {
  public async signUp(reqDto: SignUpReqDto) {
    const [rows, _] = await dataSource.query(
      `INSERT INTO USER(nickname, password, zip_code, address_main, address_sub, phone, email, birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reqDto.nickname,
        reqDto.password,
        reqDto.zip_code,
        reqDto.address_main,
        reqDto.address_sub,
        reqDto.phone,
        reqDto.email,
        reqDto.birth,
      ]
    );
    return rows;
  }
}
