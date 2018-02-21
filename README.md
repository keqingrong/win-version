# win-version

[![npm version](https://img.shields.io/npm/v/win-version.svg)](https://www.npmjs.com/package/win-version)

> Get the version information of a Windows OS

## Installation

```sh
npm install win-version
```

## Usage

```js
const winVersion = require('win-version');

winVersion();
// => { major: 10,
//   minor: 0,
//   build: 16299,
//   revision: 214,
//   osBuild: 16299.214,
//   version: 1709 }

winVersion('6.1.7601');
// => { major: 6,
//   minor: 1,
//   build: 7601,
//   revision: 0,
//   osBuild: 7601,
//   version: 'N/A' }
```

## License

MIT
