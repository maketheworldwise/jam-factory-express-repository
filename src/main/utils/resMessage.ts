const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NOT_FOUND: '존재하지 않는 자원입니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  INTERNAL_SERVER_ERROR: '서버 내부 오류입니다.',

  // 토큰 메시지
  VALIDATE_TOKEN_SUCCESS: '토큰 검증을 성공했습니다.',
  TOKEN_UPDATE_FAILED: '토큰 업데이트를 실패했습니다.',

  TOKEN_NOT_EXIST_ERROR: '토큰 정보가 존재하지 않습니다.',
  TOKEN_EXPIRED_ERROR: '토큰이 만료되었습니다.',
  TOKEN_TYPE_ERROR: '올바르지 않은 토큰 형식입니다.',

  TOKEN_HOST_FETCH_FAILED: '회원과 토큰 정보를 가져오는데 실패하였습니다.',
  TOKEN_HOST_MISMATCH_ERROR: '회원과 토큰 정보가 매칭되지 않습니다.',

  // 회원 메시지
  USER_INFO_REQUEST_ERROR: '필수적으로 필요한 회원의 정보가 올바르지 않습니다.',
  USER_FETCH_FAILED: '회원 정보를 가져오는데 실패했습니다.',
  USER_NOT_FOUND_ERROR: '회원의 정보가 존재하지 않습니다.',

  VERIFY_NICKNAME_SUCCESS: '사용 가능한 아이디입니다.',
  VERIFY_NICKNAME_FAILED: '사용 불가능한 아이디입니다.',

  SIGN_UP_SUCCESS: '회원가입을 성공했습니다.',
  SIGN_UP_FAILED: '회원가입을 실패했습니다.',
  SIGN_IN_SUCCESS: '로그인을 성공했습니다.',
  SIGN_IN_FAILED: '로그인을 실패했습니다.',
  SIGN_IN_AGAIN: '다시 로그인해주세요.',
  SIGN_OUT_SUCCESS: '로그아웃을 성공했습니다.',
  SIGN_OUT_FAILED: '로그아웃을 실패했습니다.',

  // 제품 메시지
  GET_PRODUCT_LIST_SUCCESS: '제품 목록 조회에 성공했습니다.',
  GET_PRODUCT_LIST_FAILED: '제품 목록 조회에 실패했습니다.',

  GET_PRODUCT_SUCCESS: '제품 상세 조회에 성공했습니다.',
  GET_PRODUCT_FAILED: '제품 상세 조회에 실패했습니다.',

  PRODUCT_CART_INFO_REQUEST_ERROR:
    '장바구니 등록에 필요한 정보가 올바르지 않습니다.',
  POST_PRODUCT_CART_SUCCESS: '장바구니 등록을 성공했습니다.',
  POST_PRODUCT_CART_FAILED: '장바구니 등록을 실패했습니다.',
};

export default message;
