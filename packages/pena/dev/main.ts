import Pena from '..'

Pena.openDoc({
  url          : new URL('/dev/testpage.html', location.origin).href,
  container    : '#app',
  layout       : 'fixed',
  ratio        : 16 / 9,
  // eslint-disable-next-line no-console
  onAfterAction: console.log,
})
