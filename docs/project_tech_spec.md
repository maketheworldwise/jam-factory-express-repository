## Project Technical Specification

### Versions

**💡 Language** :

- NodeJs 16.16.0
- Express 4.18.2
- TypeScript 4.8.4
- MySQL 8.0.31

**💡 Libraries** :

- mysql2 (dbmate)
- cors
- morgan
- dotenv
- nodemon (dev)

### Database

<details>
<summary>2022.11.06</summary>
<div markdown="1">
<br>

![](/docs/images/db_20221105.png)

</div>
</details>

### Technical Notes

**💡 Environments** :

- 테스트용 DB
- 개발(QA) DB

**💡 Requirements** :

- 회원가입 (아이디, 비밀번호, 주소, 휴대폰, 이메일, 생년월일)
- 아이디 중복확인
- 로그인
  - 다중 로그인 불가
  - 토큰 정보 DB에 저장
  - 토큰 재발급 로직
    ```
    1. Authorization 헤더에서는 AccessToken, Cookie에서는 RefreshToken 정보를 가져옴
    2. RefreshToken 검증
       - 유효하지 않을 경우 새로 로그인
       - 유효할 경우 userId를 가져와 새로운 AccessToken, RefreshToken을 만들고 DB에 저장
    ```
- 제품 목록 조회 (페이징, 필터링)
- 제품 상세 조회
- 제품 이용 후기 등록 (제목, 별점, 내용, 구매자 외에 작성 불가)
- 제품 이용 후기 목록 조회 (페이징)
- 제품 장바구니 등록
- 제품 장바구니 조회
- 제품 장바구니 수정 (수량)
- 제품 장바구니 삭제

**📄 2022.11.06** :

<details>
<summary>Discussion</summary>
<div markdown="1">
<br>

- 소셜 로그인
- 회원가입 우편조회 외부 API 사용 여부
- 제품 카테고리 목록 조회
- 제품 필터링 기준
- 제품 후기 UI
- 제품 상세 조회시 한번에 데이터 모두 전달 여부 (후기)
- 페이징 단위

</div>
</details>

<details>
<summary>Decision</summary>
<div markdown="1">
<br>

- 소셜 로그인 구현 취소
- 회원가입 우편조회는 외부 API 사용 예정
- 제품 카테고리 목록 조회 구현 취소
- 제품 후기 UI 및 제품 필터링 기준은 추후에 전달 예정
- 제품 상세 조회시 후기까지 전달하는 것은 후기 페이징 처리와 알맞지 않은 방법
- 페이징 단위는 12개씩

</div>
</details>
