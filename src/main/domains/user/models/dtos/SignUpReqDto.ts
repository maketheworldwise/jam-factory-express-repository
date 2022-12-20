export interface SignUpReqDto {
  nickname: string;
  password: string;
  zipCode?: number;
  addressMain?: string;
  addressSub?: string;
  phone: string;
  email: string;
  birth: Date;
}
