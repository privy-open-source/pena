import { createIframe } from './utils/iframe'
import { useSticky } from './utils/sticky'

export interface Payload {
  /**
   * Event type
   */
  event: string,
  /**
   * Payload data
   */
  payload: unknown,
}

type HookFn = (payload: Payload) => unknown

type CleanupFn = () => void

export interface Placement {
  /**
   * X Position
   */
  x: number,
  /**
   * Y Position
   */
  y: number,
  /**
   * Page number
   */
  page: number,
  /**
   * Disabled signature to move
   * @default false
   */
  fixed?: boolean,
}

export interface PenaOption {
  /**
   * Document URL
   */
  url: string,

  /**
   * Target container
   * @default '.pena''
   */
  container?: string | HTMLDivElement,

  /**
   * Layout mode
   * @default 'fixed'
   */
  layout?: 'fixed' | 'fit',

  /**
   * Recipient PrivyID
   */
  privyId?: string,

  /**
   * Language set
   * @default 'en'
   */
  lang?: 'en' | 'id',

  /**
   * Signature placement position
   */
  signature?: Placement,

  /**
   * After action (sign, review, etc) hook
   */
  onAfterAction?: HookFn,
}

/**
 * @private
 * @param signature
 */
export function isHavePlacement (signature?: Placement): signature is Required<Placement> {
  return Boolean(signature
    && Number.isFinite(signature.x)
    && Number.isFinite(signature.x)
    && Number.isFinite(signature.page))
}

/**
 * Create sign
 * @param options Options
 */
export function docSign (config: PenaOption): CleanupFn {
  const container = config.container instanceof HTMLDivElement
    ? config.container
    : document.querySelector(config.container ?? '.pena') as HTMLDivElement

  if (!container)
    throw new Error('Cannot find target container')

  let iframe: HTMLIFrameElement
  let url: URL
  let unsticky: ReturnType<typeof useSticky>

  function parseURL () {
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

      return url
    } catch {
      throw new Error(`Invalid URL: ${config.url}`)
    }
  }

  function onMessage (event: MessageEvent) {
    if (event.origin === url.origin && typeof event.data === 'string' && typeof config.onAfterAction === 'function') {
      try {
        const payload: Payload = JSON.parse(event.data)

        config.onAfterAction(payload)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  function init () {
    url                   = parseURL()
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
