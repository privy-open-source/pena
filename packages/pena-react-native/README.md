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

## Options

### Props

| Name            | Type     | Default | Description                                                                                                  |
|-----------------|----------|:-------:|--------------------------------------------------------------------------------------------------------------|
| `url`           | string   |    -    | **(Required)** Document's url                                                                                |
| `lang`          | string   |  `en`   | Set language, valid value is `en` or `id`                                                                    |
| `visibility`    | boolean  | `true`  | Set signature visibility                                                                                     |
| `privyId`       | string   |    -    | Set recipient's privyId                                                                                      |
| `signature`     | object   |    -    | Set signature placement<br/> <strong>(Deprecated)</strong> use API to set placement when upload the document |
| ├ `x`           | number   |    -    | X Coordinate                                                                                                 |
| ├ `y`           | number   |    -    | Y Coordinate                                                                                                 |
| ├ `page`        | number   |    -    | Target page                                                                                                  |
| └ `fixed`       | boolean  | `false` | Disabled signature for moving                                                                                |
| `debug`         | boolean  | `false` | Enable debug mode                                                                                            |
| `onAfterAction` | function |    -    | After action hook                                                                                            |


## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
