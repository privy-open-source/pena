import React, { useMemo } from 'react'
import { WebView } from 'react-native-webview'
import { createURL } from '@privyid/pena-utils'
import type { WebViewMessageEvent } from 'react-native-webview'
import type { FC } from 'react'
import type { Payload, PenaOption } from '@privyid/pena'

const PenaReact: FC<Omit<PenaOption, 'container' | 'layout'>> = (props) => {
  const url = useMemo(() => {
    return createURL(props)
  }, [props])

  function onMessage (event: WebViewMessageEvent) {
    try {
      const payload: Payload = JSON.parse(event.nativeEvent.data)

      if (typeof props.onAfterAction === 'function')
        props.onAfterAction(payload)
    } catch (error) {
      console.warn(error)
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
