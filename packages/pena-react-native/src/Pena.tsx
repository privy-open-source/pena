import React, { type FC, useMemo } from 'react'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import type { Payload, PenaOption } from '@privyid/pena'
import { createURL } from '@privyid/pena-utils'

const PenaReact: FC<Omit<PenaOption, 'container' | 'layout'>> = (props) => {
  const url = useMemo(() => {
    return createURL(props)
  }, [props])

  function onMessage (event: WebViewMessageEvent) {
    if (event.nativeEvent.url === url.hostname) {
      try {
        const payload: Payload = JSON.parse(event.nativeEvent.data)

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
