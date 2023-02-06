import { createIframe } from './utils/iframe'
import { useSticky } from './utils/sticky'
import type {
  Payload,
  Placement,
  CleanupFn,
  PenaOption,
} from './types'

/**
 * Check is signature valid
 * @param signature
 */
export function isHavePlacement (signature?: unknown): signature is Required<Placement> {
  return signature !== undefined
    && Number.isFinite((signature as Placement).x)
    && Number.isFinite((signature as Placement).x)
    && Number.isFinite((signature as Placement).page)
}

/**
 * Generate url from config
 * @param config Options
 */
export function createURL (config: PenaOption): URL {
  try {
    const url = new URL(config.url)

    if (config.lang)
      url.searchParams.set('lang', config.lang)

    if (config.privyId)
      url.searchParams.set('privyId', config.privyId)

    if (isHavePlacement(config.signature)) {
      url.searchParams.set('x', config.signature.x.toString())
      url.searchParams.set('y', config.signature.y.toString())
      url.searchParams.set('page', config.signature.page.toString())
      url.searchParams.set('fixed', config.signature.fixed ? 'true' : 'false')
    }

    if (config.debug !== undefined)
      url.searchParams.set('debug', JSON.stringify(config.debug))

    if (config.visibility !== undefined)
      url.searchParams.set('visibility', JSON.stringify(config.visibility))

    return url
  } catch {
    throw new Error(`Invalid URL: ${config.url}`)
  }
}

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
        let payload: Payload | undefined

        // V1 Payload format
        if (event.data.event && event.data.data)
          payload = event.data.data

        // V2 Payload format
        if (typeof event.data === 'string')
          payload = JSON.parse(event.data)

        if (payload)
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
