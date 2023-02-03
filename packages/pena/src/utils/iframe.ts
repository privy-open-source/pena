/**
 * Generate random id
 * @param prefix
 */
function randomID (prefix: string) {
  return Math.random().toString(36).replace('0.', prefix)
}

/**
 * Create iframe element
 */
export function createIframe () {
  const iframe = document.createElement('iframe')

  iframe.id             = randomID('pena_')
  iframe.dataset.testid = 'pena-iframe'
  iframe.className      = 'pena__iframe'

  iframe.style.setProperty('display', 'block')
  iframe.style.setProperty('border', '0')
  iframe.style.setProperty('width', '100%')

  return iframe
}
