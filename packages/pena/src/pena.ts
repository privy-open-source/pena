import { createIframe } from './utils/iframe'
import { useSticky } from './utils/sticky'
import { createURL } from '@privyid/pena-utils'
import type {
  Payload,
  CleanupFn,
  PenaOption,
} from './types'

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
  let unsticky: ReturnType<typeof useSticky>

  function onMessage (event: MessageEvent) {
    if (event.origin === url.origin && typeof config.onAfterAction === 'function') {
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

    if (config.layout === 'fit')
      unsticky = useSticky(iframe)
    else
      iframe.style.setProperty('min-height', `${297 / 210 * container.clientWidth}px`)
  }

  function destroy () {
    iframe.remove()
    window.removeEventListener('message', onMessage)

    if (typeof unsticky === 'function')
      unsticky()
  }

  // onMounted
  init()

  return destroy
}
