import React, { type FC, useMemo } from 'react'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import type Pena from '@privyid/pena'

function isHaveSignature (signature?: Pena.Placement): signature is Required<Pena.Placement> {
  return Boolean(signature
    && Number.isFinite(signature.x)
    && Number.isFinite(signature.x)
    && Number.isFinite(signature.page))
}

const PenaReact: FC<Omit<Pena.PenaOption, 'container' | 'layout'>> = (props) => {
  const url = useMemo(() => {
    const result = new URL(props.url)

    if (props.lang)
      result.searchParams.set('lang', props.lang)

    if (props.privyId)
      result.searchParams.set('privyId', props.privyId)

    if (isHaveSignature(props.signature)) {
      result.searchParams.set('x', props.signature.x.toString())
      result.searchParams.set('y', props.signature.y.toString())
      result.searchParams.set('page', props.signature.page.toString())
      result.searchParams.set('fixed', props.signature.fixed ? 'true' : 'false')
    }

    return result
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
