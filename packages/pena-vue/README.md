# Pena 💚 Vue

> Pena plugin for Vue

## Installation

**NPM**

```bash
npm install @privyid/pena-vue
```

**Yarn**
```bash
yarn add @privyid/pena-vue
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
<template>

<script>
import Pena from '@privyid/pena-vue'

export default {
   components: { Pena },
   methods: {
      onAfterAction (event) {
         // Do something after action (sign, review, etc) done
         // example: redirect to specific location after sign
         if (event.action === 'sign') {
            location.href = '/somepath'
         }
      }
   }
}
</script>
```

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
