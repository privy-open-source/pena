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

Pena.openDoc({
  target   : '#app',                                // Target container
  url      : 'https://sign.privy.id/doc/xxxxxxx',   // Document URL
  lang     : 'en',                                  // Set language, 'en' or 'id'
  layout   : 'fixed',                               // Set layout mode, 'fixed' or 'fit'
  signature: {                                      // Set placement
    x    : 100,
    y    : 200,
    page : 1,
    fixed: false,
  },
  onAfterAction: (data) => {
    // Do something after action (sign, review, etc) done
    // example: redirect to specific location after sign
    if (data.action === 'sign') {
      location.href = '/somepath'
    }
  },
})
```

## Options

| Options         | Type     | Default | Description                                                                                                  |
|-----------------|----------|:-------:|--------------------------------------------------------------------------------------------------------------|
| `url`           | string   |    -    | **(Required)** Document's url                                                                                |
| `target`        | string   | `.pena` | Container query selector                                                                                     |
| `lang`          | string   |  `en`   | Set language, valid value is `en` or `id`                                                                    |
| `layout`        | string   | `fixed` | Set layout mode, valid value is `fixed` or `fit`                                                             |
| `visibility`    | boolean  | `true`  | Set signature visibility                                                                                     |
| `privyId`       | string   |    -    | Set recipient's privyId                                                                                      |
| `signature`     | object   |    -    | Set signature placement<br/> <strong>(Deprecated)</strong> use API to set placement when upload the document |
| ├ `x`           | number   |    -    | X Coordinate                                                                                                 |
| ├ `y`           | number   |    -    | Y Coordinate                                                                                                 |
| ├ `page`        | number   |    -    | Target page                                                                                                  |
| └ `fixed`       | boolean  | `false` | Disabled signature for moving                                                                                |
| `debug`         | boolean  | `false` | Enable debug mode                                                                                            |
| `onAfterAction` | function |    -    | After action hook                                                                                            |

## Migration from [privy-sdk](https://www.npmjs.com/package/privy-sdk)

1. Change package from `privy-sdk` to `@privyid/pena`
```js
import Privy from 'privy-sdk'

// Change to

import Pena from '@privyid/pena'
```
2. Parameter `doctoken` is changed to fullpath `url`.
```js
Privy.openDoc('doctokenXXXX')

// Change to

Pena.openDoc({
  url: 'https://sign.privy.id/doc/doctokenXXXX',
})
```
3. Option `dev` is removed, environment between dev or production is follow the base url.
    - **production**: `https://sign.privy.id/`
    - **development**: `https://stg-sign.privy.id/`
4. Hook `.on('after-action')`, `.on('after-sign')` and `.on('after-review')` is unified into option `onAfterAction`
```js
Privy.openDoc(/* .... */)
  .on('after-sign', () => { })
  .on('after-review', () => { })
  .on('after-action', () => { })

// Change to

Pena.openDoc({
  // ...
  onAfterAction (data) {
    if (data.action === 'sign') {
      // Do something after sign
    }

    if (data.action === 'review') {
      // Do something after sign
    }
  },
  // ...
})
```
## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
