import dataSource from '../../../../../../configs/db.config';
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

  public async signIn(nickname: string) {
    const [rows, _] = await dataSource.query(
      `SELECT id, password FROM USER WHERE nickname = ?`,
      [nickname]
    );
    return rows;
  }

  public async signOut(userId: number) {
    await dataSource.query(`DELETE FROM TOKEN WHERE user_id = ?`, [userId]);
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

  public async verifyNickname(nickname: string) {
    const [rows, _] = await dataSource.query(
      `SELECT EXISTS(SELECT id FROM USER WHERE nickname = ?) AS isNotValidNickname`,
      [nickname]
    );
    return rows;
  }

  public async verifyTokenUser(userId: number) {
    const [rows, _] = await dataSource.query(
      `SELECT EXISTS(SELECT nickname FROM USER WHERE id = ?) AS isValidUser`,
      [userId]
    );
    return rows;
  }

  public async verifyTokenHost(
    userId: number,
    accessToken: string,
    refreshToken: string
  ) {
    const [rows, _] = await dataSource.query(
      `SELECT EXISTS(SELECT user_id FROM TOKEN WHERE user_id = ? AND access_token = ? AND refresh_token = ?) AS isValidHost`,
      [userId, accessToken, refreshToken]
    );
    return rows;
  }
}
