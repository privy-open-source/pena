import React, { FC, useMemo } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import type Pena from '@privyid/pena'

const PenaReact: FC<Omit<Pena.PenaOption, 'container' | 'layout'>> = (props) => {
  const url = useMemo(() => {
    const url          = new URL(props.url)
    const hasSignature = props.signature
      && Number.isFinite(props.signature.x)
      && Number.isFinite(props.signature.x)
      && Number.isFinite(props.signature.page)

    if (props.lang)
      url.searchParams.set('lang', props.lang)

    if (props.privyId)
      url.searchParams.set('privyId', props.privyId)

    if (hasSignature) {
      url.searchParams.set('x', props.signature!.x.toString())
      url.searchParams.set('y', props.signature!.y.toString())
      url.searchParams.set('page', props.signature!.page.toString())
      url.searchParams.set('fixed', props.signature!.fixed ? 'true' : 'false')
    }

    return url
  }, [props])

  function onMessage (event: WebViewMessageEvent) {
    if (event.nativeEvent.url === url.hostname) {
      try {
        const payload: Pena.Payload = JSON.parse(event.nativeEvent.data)

        if (typeof props.onAfterAction === 'function')
          props.onAfterAction(payload)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  return (
    <WebView
      source={{ uri: url.href }}
      domStorageEnabled={true}
      onMessage={onMessage}
    />
  )
}

export default PenaReact
