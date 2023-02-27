type PostMessage = (message: string) => void

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: PostMessage },
    PenaAndroid?: { postMessage: PostMessage },
    PenaFlutter?: { postMessage: PostMessage },
    PenaUnipost?: { postMessage: PostMessage },
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
  // Pena Flutter
  else if (typeof window.PenaFlutter?.postMessage === 'function')
    window.PenaFlutter.postMessage(message)
  // For future use if new webview platform exist. Just implement Javascript Interface with name `PenaUnipost`.
  // If you ask me, why flutter and android not use `PenaUnipost` name, because I want to use it as "Platform Detection" in the future.
  else if (typeof window.PenaUnipost?.postMessage === 'function')
    window.PenaUnipost.postMessage(message)
  // Standard Iframe
  else if (typeof window.parent.postMessage === 'function')
    window.parent.postMessage(message, '*')
}
