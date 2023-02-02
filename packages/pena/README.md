# Pena

> Official PrivyID Sign SDK

## Getting Started

### Install using Package Manager

**NPM**

```bash
npm install @privyid/pena
```

**Yarn**
```bash
yarn add @privyid/pena
```

### Install using CDN

Not very recommended, but you can use Pena with CDN, just add this in your HTML:

```html
<script src="https://unpkg.com/@privyid/pena"></script>
```

## Usage

```js
import Pena from '@privyid/pena' // Require If install via Package Manager

Pena.docSign({
  target       : '#app',                                // Target container
  url          : 'https://sign.privy.id/doc/xxxxxxx',   // Document URL
  lang         : 'en',                                  // Set language, 'en' or 'id'
  layout       : 'fixed',                               // Set layout mode, 'fixed' or 'fit'
  onAfterAction: (data) => {
    // Do something after action (sign, review, etc) done
    // example: redirect to specific location after sign
    if (data.event === 'sign') {
      location.href = '/somepath'
    }
  },
})
```

## Option

Coming Soon...

## Migration from [privy-sdk](https://www.npmjs.com/package/privy-sdk)

## License

MIT License
