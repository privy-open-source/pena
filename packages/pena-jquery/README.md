# Pena 🤍 jQuery

> PrivyID's Official Client Integration Library for jQuery

## Installation

Add this in your HTML

```html
<!-- Import jQuery -->
<script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
<!-- Import Pena jQuery -->
<script src="https://cdn.jsdelivr.net/npm/pena-jquery"></script>
```

## Usage

```html
<div id="pena"></div><!-- 👈 Target container -->

<script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@privyid/pena-jquery"></script>

<script type="text/javascript">
  $(function () {
    $('#pena').openDoc({
      url      : 'https://sign.privy.id/doc/xxxxxxx',   // Document URL
      lang     : 'en',                                  // Set language, 'en' or 'id'
      layout   : 'fixed',                               // Set layout mode, 'fixed' or 'fit'
      signature: {
        x    : 100,
        y    : 200,
        page : 1,
        fixed: false,
      },
      onAfterAction: (data) => {
        // Do something after action (sign, review, etc) done
        if (data.action === 'sign') {
          window.alert('Signed')
        }
      },
    })
  })
</script>
```

## Options

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

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details

[different]: ../pena/README.md#layout-fixed-vs-fit
