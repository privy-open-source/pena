# Pena 💚 Vue

> Pena plugin for Vue

## Compabilities

- Vue 3
- Vue >= 2.7
- Vue <= 2.6 (require [`@vue/composition-api`](https://github.com/vuejs/composition-api) plugin)

## Installation

**NPM**

```bash
npm install --save @privyid/pena-vue @privyid/pena
```

**Yarn**
```bash
yarn add @privyid/pena-vue @privyid/pena
```

### Nuxt 2

You need to transpile this package, add this in your `nuxt.config.js`.

```js
export default {
  // ...
  build: {
    transpile: [
      '@privyid/pena',
      '@privyid/pena-vue',
    ]
  },
  // ...
}
```

## Usage

```vue
<template>
  <pena
    url="http://sign.document.com/doc/xxx"
    lang="en"
    layout="fixed"
    :signature="{
      x    : 100,
      y    : 200,
      page : 1,
      fixed: false,
    }"
    @after-action="onAfterAction"
  />
</template>

<script>
import { Pena } from '@privyid/pena-vue'

export default {
  components: { Pena },
  methods: {
    onAfterAction (event) {
      // Do something after action (sign, review, etc) done
      if (event.action === 'sign') {
        window.alert('Signed')
      }
    }
  }
}
</script>
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

### Events

| Name           | Arguments | Description       |
|----------------|-----------|-------------------|
| `after-action` | Payload   | After action hook |

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[different]: ../pena/README.md#layout-fixed-vs-fit
