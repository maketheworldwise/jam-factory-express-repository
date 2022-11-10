import dataSource from '../../../../../configs/db.config';
import { SignInReqDto } from '../dtos/SignInReqDto';
import { SignUpReqDto } from '../dtos/SignUpReqDto';
import { TokenReqDto } from '../dtos/TokenReqDto';

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

  public async signIn(reqDto: SignInReqDto) {
    const [rows, _] = await dataSource.query(
      `SELECT id FROM USER WHERE nickname = ? AND password = ?`,
      [reqDto.nickname, reqDto.password]
    );
    return rows;
  }

  public async updateToken(reqDto: TokenReqDto) {
    await dataSource.query(
      `INSERT INTO TOKEN(user_id, access_token, refresh_token, ip, device) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE user_id = ?, access_token = ?, refresh_token = ?, ip = ?, device = ?`,
      [
        reqDto.user_id,
        reqDto.access_token,
        reqDto.refresh_token,
        reqDto.ip,
        reqDto.device,
        reqDto.user_id,
        reqDto.access_token,
        reqDto.refresh_token,
        reqDto.ip,
        reqDto.device,
      ]
    );
  }
}
