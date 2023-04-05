import { createIframe } from './utils/iframe'
import { useSticky } from './utils/sticky'
import { createURL } from '@privyid/pena-utils'
import type {
  Payload,
  CleanupFn,
  PenaOption,
} from './types'
import { useRatio } from './utils/ratio'

/**
 * Create signing page
 * @param options Options
 */
export function openDoc (config: PenaOption): CleanupFn {
  const container = config.container instanceof HTMLDivElement
    ? config.container
    : document.querySelector(config.container ?? '.pena') as HTMLDivElement

  if (!container)
    throw new Error('Cannot find target container')

  let url: URL
  let iframe: HTMLIFrameElement
  let cleanUp: CleanupFn

  function onMessage (event: MessageEvent) {
    if (event.origin === url.origin && typeof config.onAfterAction === 'function' && typeof event.data === 'string') {
      try {
        const payload: Payload = JSON.parse(event.data)

        if (payload?.action && payload?.data)
          config.onAfterAction(payload)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  function init () {
    url                   = createURL(config)
    iframe                = createIframe()
    iframe.src            = url.href
    iframe.dataset.layout = config.layout ?? 'fixed'

    container.append(iframe)
    window.addEventListener('message', onMessage, { passive: true })

    cleanUp = config.layout === 'fit'
      ? useSticky(iframe)
      : useRatio(iframe, config.ratio)
  }

  function destroy () {
    iframe.remove()
    window.removeEventListener('message', onMessage)

    cleanUp()
  }

  // onMounted
  init()

  return destroy
}
