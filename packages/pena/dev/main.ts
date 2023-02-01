import Pena from '../src'

Pena.docSign({
  url          : new URL('/dev/testpage.html', location.origin).href,
  container    : '#app',
  layout       : 'fit',
  onAfterAction: console.log,
})
