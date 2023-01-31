import Pena from '../src'

Pena.docSign({
  url          : new URL('/dev/testpage.html', location.origin).href,
  target       : '#app',
  layout       : 'fit',
  onAfterAction: console.log,
})
