# Pena 💙 React

> Pena plugin for React

## Installation

**NPM**

```bash
npm install @privyid/pena-react
```

**Yarn**
```bash
yarn add @privyid/pena-react
```

## Usage

```tsx
import Pena from '@privyid/pena-react'

export default function App () {
  return (
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
      onAfterAction={(event) => {
        // Do something after action (sign, review, etc) done
        // example: redirect to specific location after sign
        if (event.action === 'sign') {
          location.href = '/somepath'
        }
      }}
    />
  )
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
