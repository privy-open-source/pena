import postMessage from '..'

function sendMessage () {
  postMessage(JSON.stringify({
    action: 'sign',
    data  : { message: 'OK' },
  }))
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector<HTMLButtonElement>('#sign')
    ?.addEventListener('click', sendMessage)

  const pre = document.querySelector<HTMLPreElement>('#query')
  const dom = document.querySelector<HTMLPreElement>('#dom-storage')

  if (pre)
    pre.textContent = location.href

  if (dom)
    dom.textContent = `Dom Storage: ${window.sessionStorage === undefined ? 'false' : 'true'}`
})
