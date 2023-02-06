# Pena 🖤 React Native

> Pena plugin for React Native

## Installation

**NPM**

```bash
npm install --save @privyid/pena-react-native
```

**Yarn**
```bash
yarn add @privyid/pena-react-native
```

## Usage

```tsx
import Pena from '@privyid/pena-react-native'

export default function App () {
  return (
    <Pena
      url="http://sign.document.com/doc/xxx"
      lang="en"
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


---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
