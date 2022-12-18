import { NextFunction, Request, Response } from 'express';
import message from '../src/main/utils/resMessage';
import result from '../src/main/utils/resObject';
import statusCode from '../src/main/utils/resStatusCode';

const validateSignUpInfoReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // (*nickname, *password, *phone, *birth, *email) 유효성 검사
    let isValid = {
      nickname: false,
      password: false,
      phone: false,
      birth: false,
      email: false,
    };

    const { nickname, password, phone, birth, email } = req.body;
    if (nickname) {
      const regNickname = /^[0-9a-zA-Z_\.-]{4,20}$/;
      isValid.nickname = regNickname.test(nickname);
    }
    if (password) {
      const regPassword = /^[0-9a-zA-Z_\.-]{4,20}$/;
      isValid.password = regPassword.test(password);
    }
    if (phone) {
      const regPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      isValid.phone = regPhone.test(phone);
    }
    if (birth) {
      const regBirth = /^[0-9]{4}-?([0-9]{2})-?([0-9]{2})$/;
      isValid.birth = regBirth.test(birth);
    }
    if (email) {
      const regEmail =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      isValid.email = regEmail.test(email);
    }

    if (
      !isValid.nickname ||
      !isValid.password ||
      !isValid.phone ||
      !isValid.birth ||
      !isValid.email
    ) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(result.fail(message.USER_INFO_REQUEST_ERROR));
    }

    next();
  } catch (err: any) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(result.fail(err.message));
  }
};

export default validateSignUpInfoReq;
