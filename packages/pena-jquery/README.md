# Pena 🤍 jQuery

> Pena plugin for jQuery

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
<script src="https://cdn.jsdelivr.net/npm/pena-jquery"></script>

<script>
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
        // example: redirect to specific location after sign
        if (data.action === 'sign') {
          location.href = '/somepath'
        }
      },
    })
  })
<script>
```

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
