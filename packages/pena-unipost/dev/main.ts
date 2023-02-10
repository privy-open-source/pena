import postMessage from '..'

function sendMessage () {
  postMessage(JSON.stringify({
    action: 'sign',
    data  : { message: 'OK' },
  }))
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector<HTMLButtonElement>('#send')
    ?.addEventListener('click', sendMessage)
})
