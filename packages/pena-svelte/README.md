# Pena 🧡 Svelte

> PrivyID's Official Client Integration Library for Svelte.

## Installation

**NPM**

```bash
npm install --save @privyid/pena-svelte @privyid/pena
```

**Yarn**
```bash
yarn add @privyid/pena-svelte @privyid/pena
```

## Usage

```svelte
<script lang="ts">
  import Pena from '@privyid/pena-svelte'
</script>

<Pena
  url="http://sign.document.com/doc/xxx"
  lang="en"
  layout="fixed"
  signature={{
    x    : 100,
    y    : 200,
    page : 1,
    fixed: false,
  }}
  on:afterAction={(event) => {
    // Do something after action (sign, review, etc) done
    if (event.detail.action === 'sign') {
      window.alert('Signed')
    }
  }}
/>
```

## Options

### Props

| Name           | Type             |   Default   | Description                                                                                                                                  |
|----------------|------------------|:-----------:|----------------------------------------------------------------------------------------------------------------------------------------------|
| `url`          | string           |      -      | **(Required)** Document's url                                                                                                                |
| `lang`         | string           |    `en`     | Set language, valid value is `en` or `id`                                                                                                    |
| `layout`       | string           |   `fixed`   | Set layout mode, valid value is `fixed` or `fit`, see the [different][different]                                                             |
| `visibility`   | boolean          |   `true`    | Set signature visibility                                                                                                                     |
| `privyId`      | string           |      -      | Set recipient's privyId                                                                                                                      |
| `signature`    | object           |      -      | Set signature placement<br/> <strong>(Deprecated)</strong> use API to set placement when upload the document                                 |
| ├ `x`          | number           |      -      | X Coordinate                                                                                                                                 |
| ├ `y`          | number           |      -      | Y Coordinate                                                                                                                                 |
| ├ `page`       | number           |      -      | Target page                                                                                                                                  |
| └ `fixed`      | boolean          |   `false`   | Disabled signature for moving                                                                                                                |
| `debug`        | boolean          |   `false`   | Enable debug mode                                                                                                                            |
| `ratio`        | number           | `210 / 297` | Ratio size **(Layout `fixed` only)**                                                                                                         |
| `needScrollTo` | number \| string |      -      | Force user to scroll to target page before doing an action (sign,review,etc). Valid value is a number, or set `last` to target the last page |

### Events

| Name          | Arguments | Description       |
|---------------|-----------|-------------------|
| `afterAction` | Payload   | After action hook |

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[different]: ../pena/README.md#layout-fixed-vs-fit
