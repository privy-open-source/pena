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
import Pena from '@privyid/pena' // Require If installed via Package Manager

Pena.docSign({
  target       : '#app',                                // Target container
  url          : 'https://sign.privy.id/doc/xxxxxxx',   // Document URL
  lang         : 'en',                                  // Set language, 'en' or 'id'
  layout       : 'fixed',                               // Set layout mode, 'fixed' or 'fit'
  onAfterAction: (data) => {
    // Do something after action (sign, review, etc) done
    // example: redirect to specific location after sign
    if (data.action === 'sign') {
      location.href = '/somepath'
    }
  },
})
```

## Option

| Options       | Type     | Default | Description                                      |
|---------------|----------|---------|--------------------------------------------------|
| url           | string   | -       | **(Required)** Document's url                    |
| target        | string   | `.pena` | Container query selector                         |
| lang          | string   | `en`    | Set language, valid value is `en` or `id`        |
| layout        | string   | `fixed` | Set layout mode, valid value is `fixed` or `fit` |
| debug         | boolean  | `false` | Enable debug mode                                |
| visibility    | boolean  | `true`  | Set signature visibility                         |
| onAfterAction | function | -       | After action hook                                |





## Migration from [privy-sdk](https://www.npmjs.com/package/privy-sdk)

1. Change package from `privy-sdk` to `@privyid/pena`
```js
import Privy from 'privy-sdk'

// Change to

import Pena from '@privyid/pena'
```
2. Parameter `doctoken` now is changed to fullpath `url`.
```js
Privy.signDoc('doctokenXXXX')

// Change to

Pena.docSign({
  url: 'https://sign.privy.id/doc/doctokenXXXX',
})
```
3. Option `dev` is removed, environment between dev or production is follow the base url.
    - **production**: `https://sign.privy.id/`
    - **development**: `https://stg-sign.privy.id/`
4. Hook `.on('after-action')`, `.on('after-sign')` and `.on('after-review')` is unified into option `onAfterAction`
```js
Privy.signDoc(/* .... */)
  .on('after-sign', () => { })
  .on('after-review', () => { })
  .on('after-action', () => { })

// Change to

Pena.docSign({
  url: 'https://sign.privy.id/doc/doctokenXXXX',
  onAfterAction (data) {
    if (data.action === 'sign') {
      // Do something after sign
    }
    
    if (data.action === 'review') {
      // Do something after sign
    }
  }
})
```
## License

MIT License
