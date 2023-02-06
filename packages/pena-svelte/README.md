# Pena ❤️ Svelte

> Pena plugin for Svelte

## Installation

**NPM**

```bash
npm install @privyid/pena-svelte
```

**Yarn**
```bash
yarn add @privyid/pena-svelte
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

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
