import { createIframe } from './iframe'

interface Payload {
  /**
   * Event type
   */
  event: string,
  /**
   * Payload data
   */
  payload: unknown
}

type HookFn = (payload: Payload) => unknown

type CleanupFn = () => void

interface PlacementV1 {
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
  lang?: 'en' | 'id'

  /**
   * Signature placement position
   */
  signature?: PlacementV1,

  /**
   * After action (sign, review, etc) hook
   */
  onAfterAction?: HookFn,
}

/**
 * Create sign
 * @param options Options
 */
export function docSign (config: PenaOption): CleanupFn {
  const container = config.container instanceof HTMLDivElement
    ? config.container
    : document.querySelector(config.container || '.pena') as HTMLDivElement

  if (!container)
    throw new Error('Cannot find target container')

  let iframe: HTMLIFrameElement
  let url: URL

  function parseURL() {
    try {
      const url          = new URL(config.url)
      const hasSignature = config.signature
        && Number.isFinite(config.signature.x)
        && Number.isFinite(config.signature.x)
        && Number.isFinite(config.signature.page)

      if (config.lang)
        url.searchParams.set('lang', config.lang)

      if (config.privyId)
        url.searchParams.set('privyId', config.privyId)

      if (hasSignature) {
        url.searchParams.set('x', config.signature!.x.toString())
        url.searchParams.set('y', config.signature!.y.toString())
        url.searchParams.set('page', config.signature!.page.toString())
        url.searchParams.set('fixed', config.signature!.fixed ? 'true' : 'false')
      }

      return url
    } catch {
      throw new Error(`Invalid URL: ${config.url}`)
    }
  }

  function onScroll () {
    if (config.layout === 'fit') {
      const {
        top,
        height,
      } = container.getBoundingClientRect()

      const {
        top: offsetTop,
        left,
        width,
      } = iframe.getBoundingClientRect()

      if (top >= 0) {
        iframe.style.setProperty('height', `${window.innerHeight - top}px`)
        iframe.style.setProperty('width', '100%')

        container.style.removeProperty('min-height')

        iframe.style.removeProperty('position')
        iframe.style.removeProperty('top')
        iframe.style.removeProperty('left')
      } else {
        container.style.setProperty('min-height', `${height}px`)

        iframe.style.setProperty('position', 'fixed')
        iframe.style.setProperty('top', `${offsetTop}px`)
        iframe.style.setProperty('left', `${left}px`)
        iframe.style.setProperty('width', `${width}px`)
        iframe.style.setProperty('height', `${window.innerHeight - offsetTop}px`)
      }
    }
  }

  function onMessage (event: MessageEvent) {
    if (event.origin === url.origin && typeof config.onAfterAction === 'function') {
      config.onAfterAction(JSON.parse(event.data))
    }
  }

  function init () {
    url        = parseURL()
    iframe     = createIframe()
    iframe.src = url.href

    if (config.layout !== 'fit')
      iframe.style.setProperty('min-height', `${297 / 210 * container.clientWidth}px`)

    container.append(iframe)

    window.addEventListener('message', onMessage, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    onScroll()
  }

  function destroy () {
    iframe.remove()

    window.removeEventListener('message', onMessage)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }

  init()

  return destroy
}
