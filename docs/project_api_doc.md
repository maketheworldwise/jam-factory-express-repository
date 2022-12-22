## Project API Documentation

> 예외 처리는 `try-catch`문을 이용했기 때문에 가장 외부의 `catch`문에 작성된 예외 클래스로 동작할 수 있습니다. 즉, 문서에 작성된 예외는 모든 경우의 수를 작성했을 뿐, 작성한 예외들이 모두 발생하지 않을 수 있습니다.

### Sign

<details>
<summary>회원가입 API</summary>
<div markdown="1">
<br>

| Method   | URL      |
| -------- | -------- |
| **POST** | /sign-up |

| 구분               | Name        | Type   | Mandatory | Example           | Default | Description |
| ------------------ | ----------- | ------ | --------- | ----------------- | ------- | ----------- |
| **Headers**        |             |        |           |                   |         |             |
| **Path variables** |             |        |           |                   |         |             |
| **Query strings**  |             |        |           |                   |         |             |
| **Body**           | nickname    | String | Y         | kevin             |         | 아이디      |
|                    | password    | String | Y         | 12345             |         | 비밀번호    |
|                    | phone       | String | Y         | 010-0000-0000     |         | 휴대전화    |
|                    | birth       | String | Y         | 2021-01-01        |         | 생년월일    |
|                    | email       | String | Y         | kevin@example.com |         | 이메일      |
|                    | zipCode     | String | N         | 10000             |         | 우편번호    |
|                    | addressMain | String | N         | 서울 강남구       |         | 메인주소    |
|                    | addressSub  | String | N         | A건물 9층 901호   |         | 서브주소    |

| Status | Type                    | Message                                            |
| ------ | ----------------------- | -------------------------------------------------- |
| 400    | USER_INFO_REQUEST_ERROR | 필수적으로 필요한 회원의 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR   |                                                    |
| 600    | SIGN_UP_FAILED          | 로그인을 실패했습니다.                             |

**Request**

```
[POST] http://localhost:8080/sign-up

{
    "nickname": "kevin",
    "password": "12345",
    "phone": "01012345678",
    "birth": "2021-01-01",
    "email": "kevin@example.com"
}
```

**Response**

```
201

{
    "success": true,
    "message": "회원가입을 성공했습니다.",
    "data": {
        "userId": 1
    }
}
```

</div>
</details>

<details>
<summary>로그인 API</summary>
<div markdown="1">
<br>

| Method   | URL      |
| -------- | -------- |
| **POST** | /sign-in |

| 구분               | Name            | Type   | Mandatory | Example               | Default | Description |
| ------------------ | --------------- | ------ | --------- | --------------------- | ------- | ----------- |
| **Headers**        | x-forwarded-for | String | N         | 127.0.0.0             |         | IP          |
|                    | user-agent      | String | N         | web / mobile / tablet | web     | 디바이스    |
| **Path variables** |                 |        |           |                       |         |             |
| **Query strings**  |                 |        |           |                       |         |             |
| **Body**           | nickname        | String | Y         | kevin                 |         | 아이디      |
|                    | password        | String | Y         | 12345                 |         | 비밀번호    |

| Status | Type                  | Message                          |
| ------ | --------------------- | -------------------------------- |
| 404    | USER_NOT_FOUND_ERROR  | 회원의 정보가 존재하지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR |                                  |
| 600    | SIGN_IN_FAILED        | 로그인을 실패했습니다.           |

**Request**

```
[POST] http://localhost:8080/sign-in

{
    "nickname": "kevin",
    "password": "12345",
}
```

**Response**

```
200

Set-Cookie: refereshToken={Refresh Token}; Expires={7 days}; HttpOnly

{
    "success": true,
    "message": "로그인을 성공했습니다.",
    "data": {
        "accessToken": "{Json Web Token}"
    }
}
```

</div>
</details>

<details>
<summary>로그아웃 API</summary>
<div markdown="1">
<br>

| Method   | URL       |
| -------- | --------- |
| **POST** | /sign-out |

| 구분               | Name          | Type   | Mandatory | Example                      | Default | Description   |
| ------------------ | ------------- | ------ | --------- | ---------------------------- | ------- | ------------- |
| **Headers**        | Authorization | String | Y         | Bearer {Json Web Token}      |         | JWT           |
|                    | Cookie        | String | Y         | refreshToken={Refresh Token} |         | Refresh Token |
| **Path variables** |               |        |           |                              |         |               |
| **Query strings**  |               |        |           |                              |         |               |
| **Body**           |               |        |           |                              |         |               |

| Status | Type                  | Message                        |
| ------ | --------------------- | ------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR | 토큰 정보가 존재하지 않습니다. |
| 400    | TOKEN_EXPIRED_ERROR   | 토큰이 만료되었습니다.         |
| 400    | TOKEN_TYPE_ERROR      | 올바르지 않은 토큰 형식입니다. |
| 500    | INTERNAL_SERVER_ERROR |                                |
| 600    | SIGN_OUT_FAILED       | 로그아웃을 실패했습니다.       |

**Request**

```
[POST] http://localhost:8080/sign-out

Authorization: Bearer {Json Web Token}
Cookie: refreshToken={Refresh Token}
```

**Response**

```
204

// {
//     "success": true,
//     "message": "로그아웃을 성공했습니다."
// }
```

</div>
</details>

<details>
<summary>아이디 중복 확인 API</summary>
<div markdown="1">
<br>

| Method  | URL                        |
| ------- | -------------------------- |
| **GET** | /verify-nickname/:nickname |

| 구분               | Name     | Type   | Mandatory | Example | Default | Description |
| ------------------ | -------- | ------ | --------- | ------- | ------- | ----------- |
| **Headers**        |          |        |           |         |         |             |
| **Path variables** | nickname | String | Y         | kevin   |         | 아이디      |
| **Query strings**  |          |        |           |         |         |             |
| **Body**           |          |        |           |         |         |             |

| Status | Type                    | Message                                            |
| ------ | ----------------------- | -------------------------------------------------- |
| 400    | USER_INFO_REQUEST_ERROR | 필수적으로 필요한 회원의 정보가 올바르지 않습니다. |
| 400    | VERIFY_NICKNAME_FAILED  | 사용 불가능한 아이디입니다.                        |
| 500    | INTERNAL_SERVER_ERROR   |                                                    |
| 600    | USER_FETCH_FAILED       | 회원 정보를 가져오는데 실패했습니다.               |

**Request**

```
[GET] http://localhost:8080/verify-nickname/:nickname
```

**Response**

```
200

{
    "success": true,
    "message": "사용 가능한 아이디입니다."
}
```

</div>
</details>

<details>
<summary>Access Token 검증 API</summary>
<div markdown="1">
<br>

| Method   | URL                  |
| -------- | -------------------- |
| **POST** | /verify-access-token |

| 구분               | Name          | Type   | Mandatory | Example                 | Default | Description |
| ------------------ | ------------- | ------ | --------- | ----------------------- | ------- | ----------- |
| **Headers**        | Authorization | String | Y         | Bearer {Json Web Token} |         | JWT         |
| **Path variables** |               |        |           |                         |         |             |
| **Query strings**  |               |        |           |                         |         |             |
| **Body**           |               |        |           |                         |         |             |

| Status | Type                  | Message                              |
| ------ | --------------------- | ------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR | 토큰 정보가 존재하지 않습니다.       |
| 400    | TOKEN_EXPIRED_ERROR   | 토큰이 만료되었습니다.               |
| 400    | TOKEN_TYPE_ERROR      | 올바르지 않은 토큰 형식입니다.       |
| 404    | USER_NOT_FOUND_ERROR  | 회원의 정보가 존재하지 않습니다.     |
| 500    | INTERNAL_SERVER_ERROR |                                      |
| 600    | USER_FETCH_FAILED     | 회원 정보를 가져오는데 실패했습니다. |

**Request**

```
[POST] http://localhost:8080/verify-access-token

Authorization: Bearer {Json Web Token}
```

**Response**

```
200

{
    "success": true,
    "message": "토큰 검증을 성공했습니다.",
    "data": {
        "userId": 1
    }
}
```

</div>
</details>

<details>
<summary>Token 재발급 (자동 로그인) API</summary>
<div markdown="1">
<br>

| Method   | URL            |
| -------- | -------------- |
| **POST** | /reissue-token |

| 구분               | Name            | Type   | Mandatory | Example                      | Default | Description   |
| ------------------ | --------------- | ------ | --------- | ---------------------------- | ------- | ------------- |
| **Headers**        | Authorization   | String | Y         | Bearer {Json Web Token}      |         | JWT           |
|                    | Cookie          | String | Y         | refreshToken={Refresh Token} |         | Refresh Token |
|                    | x-forwarded-for | String | N         | 127.0.0.0                    |         | IP            |
|                    | user-agent      | String | N         | web / mobile / tablet        | web     | 디바이스      |
| **Path variables** |                 |        |           |                              |         |               |
| **Query strings**  |                 |        |           |                              |         |               |
| **Body**           |                 |        |           |                              |         |               |

| Status | Type                      | Message                                       |
| ------ | ------------------------- | --------------------------------------------- |
| 400    | TOKEN_NOT_EXIST_ERROR     | 토큰 정보가 존재하지 않습니다.                |
| 400    | TOKEN_EXPIRED_ERROR       | 토큰이 만료되었습니다.                        |
| 400    | TOKEN_TYPE_ERROR          | 올바르지 않은 토큰 형식입니다.                |
| 400    | TOKEN_HOST_MISMATCH_ERROR | 회원과 토큰 정보가 매칭되지 않습니다.         |
| 400    | SIGN_IN_AGAIN             | 다시 로그인해주세요.                          |
| 404    | USER_NOT_FOUND_ERROR      | 회원의 정보가 존재하지 않습니다.              |
| 500    | INTERNAL_SERVER_ERROR     |                                               |
| 600    | TOKEN_HOST_FETCH_FAILED   | 회원과 토큰 정보를 가져오는데 실패하였습니다. |
| 600    | TOKEN_UPDATE_FAILED       | 토큰 업데이트를 실패했습니다.                 |
| 600    | USER_FETCH_FAILED         | 회원 정보를 가져오는데 실패했습니다.          |

**Request**

```
[POST] http://localhost:8080/reissue-token

Authorization: Bearer {Json Web Token}
Cookie: refreshToken={Refresh Token}
```

**Response**

```
201

{
    "success": true,
    "message": "로그인을 성공했습니다.",
    "data": {
        "accessToken": "{Json Web Token}"
    }
}
```

</div>
</details>

### Product

<details>
<summary>제품 목록 조회 API</summary>
<div markdown="1">
<br>

| Method  | URL      |
| ------- | -------- |
| **GET** | /product |

| 구분               | Name     | Type    | Mandatory | Example   | Default | Description |
| ------------------ | -------- | ------- | --------- | --------- | ------- | ----------- |
| **Headers**        |          |         |           |           |         |             |
| **Path variables** |          |         |           |           |         |             |
| **Query strings**  | category | String  | N         | snack     | %       | 카테고리    |
|                    | sort     | String  | N         | name.desc | id.asc  | 정렬기준    |
|                    | page     | Integer | N         | 0         | 0       | 페이지      |
|                    | size     | Integer | N         | 12        | 12      | 사이즈      |
| **Body**           |          |         |           |           |         |             |

| Status | Type                    | Message                        |
| ------ | ----------------------- | ------------------------------ |
| 500    | INTERNAL_SERVER_ERROR   |                                |
| 600    | GET_PRODUCT_LIST_FAILED | 제품 목록 조회에 실패했습니다. |

**Request**

```
[GET] http://localhost:8080/product?category=snack&sort=price.asc&page=0&size=12
```

**Response**

```
200

{
    "success": true,
    "message": "제품 목록 조회에 성공했습니다.",
    "data": [
        {
            "id": 50,
            "category": "snack",
            "name": "오도독 후라이드 500g(냉동)",
            "price": 11900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_4.jpeg"
        },
        {
            "id": 49,
            "category": "snack",
            "name": "오징어입 버터구이 500g(냉동)",
            "price": 13900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_3.jpeg"
        },
        {
            "id": 45,
            "category": "snack",
            "name": "[복음자리] 햄치즈샌드 560g(8입)",
            "price": 15900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_1.jpeg"
        },
        {
            "id": 46,
            "category": "snack",
            "name": "[복음자리] 딸기샌드 520g(8입)",
            "price": 15900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_2.jpeg"
        },
        {
            "id": 47,
            "category": "snack",
            "name": "[복음자리] 햄치즈샌드 560g(8입)",
            "price": 15900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_1.jpeg"
        },
        {
            "id": 48,
            "category": "snack",
            "name": "[복음자리] 딸기샌드 520g(8입)",
            "price": 15900,
            "deliveryFee": 3000,
            "imageUrl": " http://localhost:8080/data/images/snack_2.jpeg"
        }
    ]
}
```

</div>
</details>

<details>
<summary>제품 상세 조회 API</summary>
<div markdown="1">
<br>

| Method  | URL                 |
| ------- | ------------------- |
| **GET** | /product/:productId |

| 구분               | Name      | Type    | Mandatory | Example | Default | Description |
| ------------------ | --------- | ------- | --------- | ------- | ------- | ----------- |
| **Headers**        |           |         |           |         |         |             |
| **Path variables** | productId | Integer | Y         | 1       |         | 제품 PK     |
| **Query strings**  |           |         |           |         |         |             |
| **Body**           |           |         |           |         |         |             |

| Status | Type                       | Message                                      |
| ------ | -------------------------- | -------------------------------------------- |
| 400    | PRODUCT_INFO_REQUEST_ERROR | 제품 요청에 필요한 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR      |                                              |
| 600    | GET_PRODUCT_FAILED         | 제품 상세 조회에 실패했습니다.               |

**Request**

```
[GET] http://localhost:8080/product/:productId
```

**Response**

```
200

{
    "success": true,
    "message": "제품 상세 조회에 성공했습니다.",
    "data": {
        "id": 50,
        "category": "snack",
        "name": "오도독 후라이드 500g(냉동)",
        "price": 11900,
        "deliveryFee": 3000,
        "imageUrl": " http://localhost:8080/data/images/snack_4.jpeg"
    }
}
```

</div>
</details>

### Product Cart

<details>
<summary>제품 장바구니 등록 API</summary>
<div markdown="1">
<br>

| Method   | URL                      |
| -------- | ------------------------ |
| **POST** | /cart/product/:productId |

| 구분               | Name          | Type    | Mandatory | Example                 | Default | Description |
| ------------------ | ------------- | ------- | --------- | ----------------------- | ------- | ----------- |
| **Headers**        | Authorization | String  | Y         | Bearer {Json Web Token} |         | JWT         |
| **Path variables** | productId     | Integer | Y         | 1                       |         | 제품 PK     |
| **Query strings**  |               |         |           |                         |         |             |
| **Body**           | quantity      | Integer | N         | 10                      | 1       | 제품 수량   |

| Status | Type                            | Message                                          |
| ------ | ------------------------------- | ------------------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR           | 토큰 정보가 존재하지 않습니다.                   |
| 400    | TOKEN_EXPIRED_ERROR             | 토큰이 만료되었습니다.                           |
| 400    | TOKEN_TYPE_ERROR                | 올바르지 않은 토큰 형식입니다.                   |
| 400    | PRODUCT_CART_INFO_REQUEST_ERROR | 장바구니 요청에 필요한 정보가 올바르지 않습니다. |
| 404    | USER_NOT_FOUND_ERROR            | 회원의 정보가 존재하지 않습니다.                 |
| 500    | INTERNAL_SERVER_ERROR           |                                                  |
| 600    | USER_FETCH_FAILED               | 회원 정보를 가져오는데 실패했습니다.             |
| 600    | POST_PRODUCT_CART_FAILED        | 장바구니에 등록을 실패했습니다.                  |

**Request**

```
[POST] http://localhost:8080/cart/product/:productId

Authorization: Bearer {Json Web Token}

{
    "quantity": 10
}
```

**Response**

```
201

{
    "success": true,
    "message": "장바구니에 등록을 성공했습니다.",
    "data": {
        "productCartId": 1
    }
}
```

</div>
</details>

<details>
<summary>제품 장바구니 목록 조회 API</summary>
<div markdown="1">
<br>

| Method  | URL           |
| ------- | ------------- |
| **GET** | /cart/product |

| 구분               | Name          | Type   | Mandatory | Example                 | Default | Description |
| ------------------ | ------------- | ------ | --------- | ----------------------- | ------- | ----------- |
| **Headers**        | Authorization | String | Y         | Bearer {Json Web Token} |         | JWT         |
| **Path variables** |               |        |           |                         |         |             |
| **Query strings**  |               |        |           |                         |         |             |
| **Body**           |               |        |           |                         |         |             |

| Status | Type                         | Message                              |
| ------ | ---------------------------- | ------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR        | 토큰 정보가 존재하지 않습니다.       |
| 400    | TOKEN_EXPIRED_ERROR          | 토큰이 만료되었습니다.               |
| 400    | TOKEN_TYPE_ERROR             | 올바르지 않은 토큰 형식입니다.       |
| 404    | USER_NOT_FOUND_ERROR         | 회원의 정보가 존재하지 않습니다.     |
| 500    | INTERNAL_SERVER_ERROR        |                                      |
| 600    | USER_FETCH_FAILED            | 회원 정보를 가져오는데 실패했습니다. |
| 600    | GET_PRODUCT_CART_LIST_FAILED | 장바구니 목록 조회에 실패했습니다.   |

**Request**

```
[GET] http://localhost:8080/cart/product

Authorization: Bearer { Json Web Token }
```

**Response**

```
200

{
    "success": true,
    "message": "장바구니 목록 조회에 성공했습니다.",
    "data": [
        {
            "id": 2,
            "userId": 1,
            "productId": 12,
            "quantity": 20,
            "createdAt": "2022-12-22T02:52:47.000Z",
            "updatedAt": "2022-12-22T02:52:47.000Z"
        },
        {
            "id": 1,
            "userId": 1,
            "productId": 1,
            "quantity": 20,
            "createdAt": "2022-12-22T02:22:53.000Z",
            "updatedAt": "2022-12-22T02:23:11.000Z"
        }
    ]
}
```

</div>
</details>

<details>
<summary>제품 장바구니 수정 API</summary>
<div markdown="1">
<br>

| Method    | URL                      |
| --------- | ------------------------ |
| **PATCH** | /cart/product/:productId |

| 구분               | Name          | Type    | Mandatory | Example                 | Default | Description |
| ------------------ | ------------- | ------- | --------- | ----------------------- | ------- | ----------- |
| **Headers**        | Authorization | String  | Y         | Bearer {Json Web Token} |         | JWT         |
| **Path variables** | productId     | Integer | Y         | 1                       |         | 제품 PK     |
| **Query strings**  |               |         |           |                         |         |             |
| **Body**           | quantity      | Integer | Y         | 10                      |         | 제품 수량   |

| Status | Type                            | Message                                          |
| ------ | ------------------------------- | ------------------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR           | 토큰 정보가 존재하지 않습니다.                   |
| 400    | TOKEN_EXPIRED_ERROR             | 토큰이 만료되었습니다.                           |
| 400    | TOKEN_TYPE_ERROR                | 올바르지 않은 토큰 형식입니다.                   |
| 404    | USER_NOT_FOUND_ERROR            | 회원의 정보가 존재하지 않습니다.                 |
| 400    | PRODUCT_CART_INFO_REQUEST_ERROR | 장바구니 요청에 필요한 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR           |                                                  |
| 600    | USER_FETCH_FAILED               | 회원 정보를 가져오는데 실패했습니다.             |
| 600    | PATCH_PRODUCT_CART_FAILED       | 장바구니 수정을 실패했습니다.                    |

**Request**

```
[PATCH] http://localhost:8080/cart/product/:productId

Authorization: Bearer { Json Web Token }

{
    "quantity": 20
}
```

**Response**

```
200

{
    "success": true,
    "message": "장바구니 수정을 성공했습니다.",
    "data": {
        "userId": 1,
        "productId": 18,
        "quantity": 20
    }
}
```

</div>
</details>

<details>
<summary>제품 장바구니 삭제 API</summary>
<div markdown="1">
<br>

| Method     | URL                  |
| ---------- | -------------------- |
| **DELETE** | /cart/:productCartId |

| 구분               | Name          | Type    | Mandatory | Example                 | Default | Description      |
| ------------------ | ------------- | ------- | --------- | ----------------------- | ------- | ---------------- |
| **Headers**        | Authorization | String  | Y         | Bearer {Json Web Token} |         | JWT              |
| **Path variables** | productCartId | Integer | Y         | 1                       |         | 제품 장바구니 PK |
| **Query strings**  |               |         |           |                         |         |                  |
| **Body**           |               |         |           |                         |         |                  |

| Status | Type                            | Message                                          |
| ------ | ------------------------------- | ------------------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR           | 토큰 정보가 존재하지 않습니다.                   |
| 400    | TOKEN_EXPIRED_ERROR             | 토큰이 만료되었습니다.                           |
| 400    | TOKEN_TYPE_ERROR                | 올바르지 않은 토큰 형식입니다.                   |
| 404    | USER_NOT_FOUND_ERROR            | 회원의 정보가 존재하지 않습니다.                 |
| 400    | PRODUCT_CART_INFO_REQUEST_ERROR | 장바구니 요청에 필요한 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR           |                                                  |
| 600    | USER_FETCH_FAILED               | 회원 정보를 가져오는데 실패했습니다.             |
| 600    | DELETE_PRODUCT_CART_FAILED      | 장바구니 삭제를 실패했습니다.                    |

**Request**

```
[DELETE] http://localhost:8080/cart/:productCartId

Authorization: Bearer { Json Web Token }
```

**Response**

```
204

// {
//     "success": true,
//     "message": "장바구니 삭제를 성공했습니다."
// }
```

</div>
</details>

### Product Purchase

<details>
<summary>제품 구매 API</summary>
<div markdown="1">
<br>

| Method   | URL               |
| -------- | ----------------- |
| **POST** | /purchase/product |

| 구분               | Name          | Type     | Mandatory | Example                          | Default | Description |
| ------------------ | ------------- | -------- | --------- | -------------------------------- | ------- | ----------- |
| **Headers**        | Authorization | String   | Y         | Bearer {Json Web Token}          |         | JWT         |
| **Path variables** |               |          |           |                                  |         |             |
| **Query strings**  |               |          |           |                                  |         |             |
| **Body**           | productList   | Object[] | Y         | [{"productId": 2,"quantity": 3}] |         | 제품 목록   |
|                    | ㄴproductId   | Integer  | Y         | 1                                |         | 제품 PK     |
|                    | ㄴquantity    | Integer  | Y         | 1                                |         | 제품 수량   |

| Status | Type                                | Message                                      |
| ------ | ----------------------------------- | -------------------------------------------- |
| 400    | TOKEN_NOT_EXIST_ERROR               | 토큰 정보가 존재하지 않습니다.               |
| 400    | TOKEN_EXPIRED_ERROR                 | 토큰이 만료되었습니다.                       |
| 400    | TOKEN_TYPE_ERROR                    | 올바르지 않은 토큰 형식입니다.               |
| 404    | USER_NOT_FOUND_ERROR                | 회원의 정보가 존재하지 않습니다.             |
| 400    | PRODUCT_PURCHASE_INFO_REQUEST_ERROR | 제품 구매에 필요한 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR               |                                              |
| 600    | USER_FETCH_FAILED                   | 회원 정보를 가져오는데 실패했습니다.         |
| 600    | POST_PRODUCT_PURCHASE_FAILED        | 제품 구매를 실패했습니다.                    |

**Request**

```
[POST] http://localhost:8080/cart/:productCartId

Authorization: Bearer { Json Web Token }

{
    "productList": [
        {
            "productId": 2,
            "quantity": 3
        },
        {
            "productId": 4,
            "quantity": 6
        },
        {
            "productId": 6,
            "quantity": 9
        }
    ]
}
```

**Response**

```
200

{
    "success": true,
    "message": "제품 구매를 성공했습니다.",
    "data": {
        "productList": [
            {
                "productId": 2,
                "quantity": 3
            },
            {
                "productId": 4,
                "quantity": 6
            },
            {
                "productId": 6,
                "quantity": 9
            }
        ]
    }
}
```

</div>
</details>

### Product Review

<details>
<summary>제품 후기 등록 API</summary>
<div markdown="1">
<br>

| Method   | URL                        |
| -------- | -------------------------- |
| **POST** | /review/product/:productId |

| 구분               | Name          | Type    | Mandatory | Example                 | Default | Description |
| ------------------ | ------------- | ------- | --------- | ----------------------- | ------- | ----------- |
| **Headers**        | Authorization | String  | Y         | Bearer {Json Web Token} |         | JWT         |
| **Path variables** | productId     | Integer | Y         |                         |         | 제품 PK     |
| **Query strings**  |               |         |           |                         |         |             |
| **Body**           | rating        | String  | Y         | 5.0                     |         | 후기 별점   |
|                    | content       | String  | Y         | 너무 좋아요             |         | 후기 내용   |

| Status | Type                              | Message                                      |
| ------ | --------------------------------- | -------------------------------------------- |
| 400    | TOKEN_NOT_EXIST_ERROR             | 토큰 정보가 존재하지 않습니다.               |
| 400    | TOKEN_EXPIRED_ERROR               | 토큰이 만료되었습니다.                       |
| 400    | TOKEN_TYPE_ERROR                  | 올바르지 않은 토큰 형식입니다.               |
| 404    | USER_NOT_FOUND_ERROR              | 회원의 정보가 존재하지 않습니다.             |
| 400    | PRODUCT_REVIEW_INFO_REQUEST_ERROR | 제품 후기에 필요한 정보가 올바르지 않습니다. |
| 500    | INTERNAL_SERVER_ERROR             |                                              |
| 600    | USER_FETCH_FAILED                 | 회원 정보를 가져오는데 실패했습니다.         |
| 600    | PRODUCT_NOT_PURCHASED_ERROR       | 제품 구매자만 후기를 작성할 수 있습니다.     |
| 600    | POST_PRODUCT_REVIEW_FAILED        | 제품 후기 등록을 실패했습니다.               |

**Request**

```
[POST] http://localhost:8080/review/product/:productId

Authorization: Bearer { Json Web Token }

{
    "rating": "5.0",
    "content": "너무 좋아요"
}
```

**Response**

```
201

{
    "success": true,
    "message": "제품 후기 작성을 성공했습니다.",
    "data": {
        "productReviewId": 1
    }
}
```

</div>
</details>

<details>
<summary>제품 후기 목록 조회 API</summary>
<div markdown="1">
<br>

| Method  | URL                        |
| ------- | -------------------------- |
| **GET** | /review/product/:productId |

| 구분               | Name      | Type    | Mandatory | Example | Default | Description |
| ------------------ | --------- | ------- | --------- | ------- | ------- | ----------- |
| **Headers**        |           |         |           |         |         |             |
| **Path variables** | productId | Integer | Y         |         |         | 제품 PK     |
| **Query strings**  | page      | Integer | N         | 0       | 0       | 페이지      |
|                    | size      | Integer | N         | 12      | 12      | 사이즈      |
| **Body**           |           |         |           |         |         |             |

| Status | Type                         | Message                              |
| ------ | ---------------------------- | ------------------------------------ |
| 400    | TOKEN_NOT_EXIST_ERROR        | 토큰 정보가 존재하지 않습니다.       |
| 400    | TOKEN_EXPIRED_ERROR          | 토큰이 만료되었습니다.               |
| 400    | TOKEN_TYPE_ERROR             | 올바르지 않은 토큰 형식입니다.       |
| 404    | USER_NOT_FOUND_ERROR         | 회원의 정보가 존재하지 않습니다.     |
| 500    | INTERNAL_SERVER_ERROR        |                                      |
| 600    | USER_FETCH_FAILED            | 회원 정보를 가져오는데 실패했습니다. |
| 600    | GET_PRODUCT_CART_LIST_FAILED | 제품 후기 목록 조회에 실패했습니다   |

**Request**

```
[GET] http://localhost:8080/review/product/:productId?page=0&size=12
```

**Response**

```
200

{
    "success": true,
    "message": "제품 후기 목록 조회에 성공했습니다.",
    "data": [
        {
            "id": 2,
            "userId": 1,
            "nickname": "kevin",
            "productId": 4,
            "rating": "5.0",
            "content": "너무 좋아요",
            "createdAt": "2022-12-22T03:44:05.000Z",
            "updatedAt": "2022-12-22T03:44:05.000Z"
        },
        {
            "id": 1,
            "userId": 1,
            "nickname": "kevin",
            "productId": 4,
            "rating": "5.0",
            "content": "너무 좋아요",
            "createdAt": "2022-12-22T03:44:05.000Z",
            "updatedAt": "2022-12-22T03:44:05.000Z"
        }
    ]
}
```

</div>
</details>
