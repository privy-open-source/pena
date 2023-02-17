# Pena Unipost

> Universal postMessage for Web Iframe, ReactNative, and Android WebView

This is part of [Pena Project](https://github.com/privy-open-source/pena), it's not intended for independent use.

## Installation

```bash
yarn add @privyid/pena-unipost
```

## Usage

```ts
import postMessage from '@privyid/pena-unipost'

postMessage(JSON.stringify({
  action: 'sign',
  data  : {
    message: 'OK',
  },
}))
```

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
