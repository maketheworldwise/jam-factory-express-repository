<h1 align="center">Welcome to jam factory 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="documentation url" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="mit url" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-mit-yellow.svg" />
  </a>
  <a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>
</p>

> 프론트 개발자인 [@hrimwk](https://github.com/hrimwk)와 함께 토이 프로젝트로 진행한 잼 판매 사이트입니다. 최대한 라이브러리의 힘을 빌리지 않고 순수 Express가 가진 기능만으로 API를 구현할 수 있도록 했습니다.
>
> - [Project Demo](/docs/project_demo.md)
> - [Project Conventions](/docs/project_conventions.md)
> - [Project Technical Specification](/docs/project_tech_spec.md)
> - [Project API Documentation](/docs/project_api_doc.md)

## Install

Docker와 dbmate은 기본적으로 설치되어있다는 가정하에 작성했습니다.

**Dependencies 설치** :

```sh
nvm use 16.16.0
npm install
```

**Docker 이미지 빌드 및 실행** :

```sh
docker build -t jam_factory:latest .
docker run -d -p 3306:3306 --name jam_factory jam_factory:latest
```

**DB 설계 (dbmate)** :

```sh
# 개발(QA) DB
dbmate create JAM_FACTORY
dbmate up

# 테스트용 DB
# JAM_FACTORY_TEST 데이터베이스가 만들어져있다 가정
dbmate --url "mysql://root:password@127.0.0.1:3306/JAM_FACTORY_TEST" up
```

## Usage

```sh
# 로컬
nodemon server.ts --dev

# 배포의 경우 package.json과 tsconfig.json 파일 수정이 필요합니다.
# npm run build
# npm start
```

## Run tests

```sh
# JAM_FACTORY_TEST 데이터베이스가 온전히 만들어져있다 가정
npm run test
```

## Author

👤 **Kevin Ahn**

- Blog: https://velog.io/@maketheworldwise
- Github: [@maketheworldwise](https://github.com/maketheworldwise)

## Contributing

이슈와 새로운 기능에 대한 요청은 언제든지 환영합니다!

- 이슈에 대한 내용은 이슈 가이드를 참고해주세요.
- 기여 방법에 대한 내용은 기여 가이드를 참고해주세요.

## Show your support

도움이 되었다면 ⭐️ 을 부탁드립니다! :)

## License

Copyright © 2022 [Kevin Ahn](https://github.com/maketheworldwise).
This project is [MIT](LICENSE) licensed.
