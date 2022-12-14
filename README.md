<h1 align="center">Welcome to jam factory ๐</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="documentation url" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="mit url" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-mit-yellow.svg" />
  </a>
  <a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20๐%20๐-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>
</p>

> ํ๋ก ํธ ๊ฐ๋ฐ์์ธ [@hrimwk](https://github.com/hrimwk)์ ํจ๊ป ํ ์ด ํ๋ก์ ํธ๋ก ์งํํ ์ผ ํ๋งค ์ฌ์ดํธ์๋๋ค. ์ต๋ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ ํ์ ๋น๋ฆฌ์ง ์๊ณ  ์์ Express๊ฐ ๊ฐ์ง ๊ธฐ๋ฅ๋ง์ผ๋ก API๋ฅผ ๊ตฌํํ  ์ ์๋๋ก ํ์ต๋๋ค.
>
> - [Project Demo](/docs/project_demo.md)
> - [Project Conventions](/docs/project_conventions.md)
> - [Project Technical Specification](/docs/project_tech_spec.md)
> - [Project API Documentation](/docs/project_api_doc.md)

## Install

Docker์ dbmate์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ค์น๋์ด์๋ค๋ ๊ฐ์ ํ์ ์์ฑํ์ต๋๋ค.

**Dependencies ์ค์น** :

```sh
nvm use 16.16.0
npm install
```

**Docker ์ด๋ฏธ์ง ๋น๋ ๋ฐ ์คํ** :

```sh
docker build -t jam_factory:latest .
docker run -d -p 3306:3306 --name jam_factory jam_factory:latest
```

**DB ์ค๊ณ (dbmate)** :

```sh
# ๊ฐ๋ฐ(QA) DB
dbmate create JAM_FACTORY
dbmate up

# ํ์คํธ์ฉ DB
# JAM_FACTORY_TEST ๋ฐ์ดํฐ๋ฒ ์ด์ค๊ฐ ๋ง๋ค์ด์ ธ์๋ค ๊ฐ์ 
dbmate --url "mysql://root:password@127.0.0.1:3306/JAM_FACTORY_TEST" up
```

## Usage

```sh
# ๋ก์ปฌ
nodemon server.ts --dev

# ๋ฐฐํฌ์ ๊ฒฝ์ฐ package.json๊ณผ tsconfig.json ํ์ผ ์์ ์ด ํ์ํฉ๋๋ค.
# npm run build
# npm start
```

## Run tests

```sh
# JAM_FACTORY_TEST ๋ฐ์ดํฐ๋ฒ ์ด์ค๊ฐ ์จ์ ํ ๋ง๋ค์ด์ ธ์๋ค ๊ฐ์ 
npm run test
```

## Author

๐ค **Kevin Ahn**

- Blog: https://velog.io/@maketheworldwise
- Github: [@maketheworldwise](https://github.com/maketheworldwise)

## Contributing

์ด์์ ์๋ก์ด ๊ธฐ๋ฅ์ ๋ํ ์์ฒญ์ ์ธ์ ๋ ์ง ํ์ํฉ๋๋ค!

- ์ด์์ ๋ํ ๋ด์ฉ์ ์ด์ ๊ฐ์ด๋๋ฅผ ์ฐธ๊ณ ํด์ฃผ์ธ์.
- ๊ธฐ์ฌ ๋ฐฉ๋ฒ์ ๋ํ ๋ด์ฉ์ ๊ธฐ์ฌ ๊ฐ์ด๋๋ฅผ ์ฐธ๊ณ ํด์ฃผ์ธ์.

## Show your support

๋์์ด ๋์๋ค๋ฉด โญ๏ธ ์ ๋ถํ๋๋ฆฝ๋๋ค! :)

## License

Copyright ยฉ 2022 [Kevin Ahn](https://github.com/maketheworldwise).
This project is [MIT](LICENSE) licensed.
