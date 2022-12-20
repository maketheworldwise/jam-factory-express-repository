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

- 간단하게 구현하는 프로젝트인 만큼 정규화를 약소하게 구성
- 제품을 각 카테고리별로 불러올 때의 속도 저하 문제는 감안
- 최소 테이블로 구성

<details>
<summary>2022.11.06</summary>
<div markdown="1">
<br>

![](/docs/images/db_20221105.png)

</div>
</details>

<details>
<summary>2022.11.06</summary>
<div markdown="1">
<br>

![](/docs/images/db_20221220.png)

</div>
</details>

### Technical Notes

**💡 Environments** :

- 개발(QA) DB
- 테스트용 DB

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
- 제품 후기 등록 (제목, 별점, 내용, 구매자 외에 작성 불가)
- 제품 후기 목록 조회 (페이징)
- 제품 장바구니 등록
- 제품 장바구니 조회
- 제품 장바구니 수정 (수량)
- 제품 장바구니 삭제
- 제품 구매

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
<br>

**📄 2022.12.18** :

<details>
<summary>Discussion</summary>
<div markdown="1">
<br>

- 회원가입 유효성 검사
  - 아이디: 숫자, 소문자, 대문자, 피리어드, 언더라인, 하이픈, 최소 길이 4, 최대 길이 20
  - 비밀번호: 숫자, 소문자, 대문자, 피리어드, 언더라인, 하이픈, 최소 길이 4, 최대 길이 20
  - 핸드폰: 010-000-0000, 010-0000-0000 형태
  - 생년월일: 2022-01-01 형태
  - 이메일: kevin@example.com 형태

</div>
</details>

<details>
<summary>Decision</summary>
<div markdown="1">
<br>

- 회원가입 유효성 검사

</div>
</details>
<br>

**📄 2022.12.20** :

<details>
<summary>Discussion</summary>
<div markdown="1">
<br>

- 제품 후기 작성 최대 별점

</div>
</details>

<details>
<summary>Decision</summary>
<div markdown="1">
<br>

- 별점 최대 5.0 (기본)

</div>
</details>
<br>

### References

- [프로젝트 구조 참고 자료](https://woojin.tistory.com/32#2.%20%EA%B8%B0%ED%83%80%20%ED%8C%8C%EC%9D%BC%20%EC%83%9D%EC%84%B1%20%EB%B0%8F%20%EC%88%98%EC%A0%95)
- [JWT 인증 로직 참고 자료](https://ms3864.tistory.com/397)
