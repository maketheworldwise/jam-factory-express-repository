import { SignInResDto } from './SignInResDto';

export interface TokenReqDto extends SignInResDto {
  user_id: number;
  ip: any;
  device: any;
}
