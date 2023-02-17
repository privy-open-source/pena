# Pena 🧡 Svelte

> Pena plugin for Svelte

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
    // example: redirect to specific location after sign
    if (event.detail.action === 'sign') {
      location.href = '/somepath'
    }
  }}
/>
```

## Options

### Props

| Name            | Type     | Default | Description                                                                                                  |
|-----------------|----------|:-------:|--------------------------------------------------------------------------------------------------------------|
| `url`           | string   |    -    | **(Required)** Document's url                                                                                |
| `lang`          | string   |  `en`   | Set language, valid value is `en` or `id`                                                                    |
| `layout`        | string   | `fixed` | Set layout mode, valid value is `fixed` or `fit`, see the [different][different]                             |
| `visibility`    | boolean  | `true`  | Set signature visibility                                                                                     |
| `privyId`       | string   |    -    | Set recipient's privyId                                                                                      |
| `signature`     | object   |    -    | Set signature placement<br/> <strong>(Deprecated)</strong> use API to set placement when upload the document |
| ├ `x`           | number   |    -    | X Coordinate                                                                                                 |
| ├ `y`           | number   |    -    | Y Coordinate                                                                                                 |
| ├ `page`        | number   |    -    | Target page                                                                                                  |
| └ `fixed`       | boolean  | `false` | Disabled signature for moving                                                                                |
| `debug`         | boolean  | `false` | Enable debug mode                                                                                            |
| `onAfterAction` | function |    -    | After action hook                                                                                            |

### Events

| Name          | Arguments | Description       |
|---------------|-----------|-------------------|
| `afterAction` | Payload   | After action hook |

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[different]: ../pena/README.md#layout-fixed-vs-fit
