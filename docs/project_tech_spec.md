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

- 개발시 로컬 환경만을 고려했습니다.

**💡 Requirements** :

- 회원가입 (아이디, 비밀번호, 주소, 휴대폰, 이메일, 생년월일)
- 아이디 중복확인
- 로그인
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

</div>
</details>
