# account-authorizer-transaction

The account authorizer is an application is responsible for creating a new account and manager the transaction

## Choices

- Generic architecture, with ITransactionValiation and different implementations of Validations
- I choiced Node.js with TypeScript because this tecnologies I have been working at least projects.
- Creating the conception of Reposiotory with inversion of control (IoC) design pattern

## Development Requirements

- node >= v12 [![node](https://img.shields.io/badge/node-v12-blue.svg?cacheSeconds=2592000)](https://nodejs.org/en/download/)
- npm >= v6 [![npm](https://img.shields.io/badge/npm-v6.3.0-blue)](https://www.npmjs.com/get-npm)
- ts-node [[ts-node](https://github.com/TypeStrong/ts-node)]
- TypeScript [[TypeScript](https://github.com/TypeStrong/ts-node)]
- npx [[npx](https://www.npmjs.com/package/npx)]

## Pre-Installation


```bash
$ npm install -g typescript
$ npm install -g ts-node
$ npm install -g npx
```

## Installation & Run

Use the package manager [npm](https://www.npmjs.com/) to install request-multiple-urls.

```bash
$ unzip account-authorizer-transaction
$ cd account-authorizer-transaction
$ npm install
$ ts-node main.ts < operations
```

## Tests

  To run the test suite, first, install the dependencies, then run `npm run test`:

```bash
$ npm install
$ npx ts-mocha  test/**/*.spec.ts
```

## Contributing
The contribute are welcome. Feel free to open pull requests.

Please make certain to update the tests as necessary.

## License
[ISC](https://opensource.org/licenses/ISC)
