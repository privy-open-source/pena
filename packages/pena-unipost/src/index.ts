type PostMessage = (message: string) => void

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: PostMessage },
    PenaAndroid?: { postMessage: PostMessage },
  }
}

export default function postMessage (message: string) {
  // React Native
  // eslint-disable-next-line unicorn/prefer-switch
  if (typeof window.ReactNativeWebView?.postMessage === 'function')
    window.ReactNativeWebView.postMessage(message)
  // Pena Android (Kotlin)
  else if (typeof window.PenaAndroid?.postMessage === 'function')
    window.PenaAndroid.postMessage(message)
  // Standard Iframe
  else if (typeof window.parent.postMessage === 'function')
    window.parent.postMessage(message, '*')
  // Non Iframe
  else
    window.postMessage(message, '*')
}
