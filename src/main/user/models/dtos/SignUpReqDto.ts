export interface SignUpReqDto {
  nickname: string;
  password: string;
  zip_code?: number;
  address_main?: string;
  address_sub?: string;
  phone: string;
  email?: string;
  birth: Date;
}
