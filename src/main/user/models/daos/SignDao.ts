import dataSource from '../../../../../configs/db.config';
import { SignInReqDto } from '../dtos/SignInReqDto';
import { TokensDto } from '../dtos/TokensDto';
import { SignUpReqDto } from '../dtos/SignUpReqDto';

export class SignDao {
  public async signUp(reqDto: SignUpReqDto) {
    const [rows, _] = await dataSource.query(
      `INSERT INTO USER(nickname, password, zip_code, address_main, address_sub, phone, email, birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reqDto.nickname,
        reqDto.password,
        reqDto.zipCode,
        reqDto.addressMain,
        reqDto.addressSub,
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

  public async updateToken(
    userId: number,
    ip: string,
    device: string,
    tokens: TokensDto
  ) {
    await dataSource.query(
      `INSERT INTO TOKEN(user_id, ip, device, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE user_id = ?, ip = ?, device = ?, access_token = ?, refresh_token = ?`,
      [
        userId,
        ip,
        device,
        tokens.accessToken,
        tokens.refreshToken,
        userId,
        ip,
        device,
        tokens.accessToken,
        tokens.refreshToken,
      ]
    );
  }
}
