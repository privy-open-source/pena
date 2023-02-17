import $ from 'jquery'
import '..'

$(function () {
  $('#app').openDoc({
    url          : new URL('/dev/testpage.html', location.origin).href,
    layout       : 'fit',
    // eslint-disable-next-line no-console
    onAfterAction: console.log,
  })
})
