import defu from "defu"
import { createIframe } from "./iframe"

interface Payload {
  event: string,

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
  target?: string | HTMLElement,

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
 *
 * @param url Document URL
 * @param options Options
 */
export function docSign (url: string, options?: Omit<PenaOption, 'url'>): CleanupFn
/**
 *
 * @param options Options
 */
export function docSign (options: PenaOption): CleanupFn
export function docSign (optionOrURL: string | PenaOption, options: Omit<PenaOption, 'url'> = {}): CleanupFn {
  if (typeof optionOrURL === 'string')
    return docSign({ url: optionOrURL, ...options })

  const config = defu(optionOrURL, {
    target   : '.pena',
    layout   : 'fixed',
    lang     : 'en',
    signature: { fixed: false },
  } as Required<PenaOption>)

  const target = config.target instanceof HTMLElement
    ? config.target
    : document.querySelector(config.target) as HTMLElement

  if (!target)
    throw new Error('Cannot find target')

  const iframe = createIframe()

  function getURL() {
    try {
      const url          = new URL(config.url)
      const hasSignature = Number.isFinite(config.signature?.x)
        && Number.isFinite(config.signature?.x)
        && Number.isFinite(config.signature?.page)

      if (config.lang)
        url.searchParams.set('lang', config.lang)

      if (config.privyId)
        url.searchParams.set('privyId', config.privyId)

      if (hasSignature) {
        url.searchParams.set('x', config.signature.x.toString())
        url.searchParams.set('y', config.signature.y.toString())
        url.searchParams.set('page', config.signature.page.toString())
        url.searchParams.set('fixed', config.signature?.fixed ? 'true' : 'false')
      }

      return url.href
    } catch {
      throw new Error(`Invalid URL: ${config.url}`)
    }
  }

  function onScroll () {
    if (config.layout === 'fit') {
      const {
        top,
        height,
      } = target.getBoundingClientRect()

      const {
        top: offsetTop,
        left,
        width,
      } = iframe.getBoundingClientRect()

      if (top >= 0) {
        iframe.style.setProperty('height', `${window.innerHeight - top}px`)
        iframe.style.setProperty('width', '100%')

        target.style.removeProperty('min-height')

        iframe.style.removeProperty('position')
        iframe.style.removeProperty('top')
        iframe.style.removeProperty('left')
      } else {
        target.style.setProperty('min-height', `${height}px`)

        iframe.style.setProperty('position', 'fixed')
        iframe.style.setProperty('top', `${offsetTop}px`)
        iframe.style.setProperty('left', `${left}px`)
        iframe.style.setProperty('width', `${width}px`)
        iframe.style.setProperty('height', `${window.innerHeight - offsetTop}px`)
      }
    }
  }

  function onMessage (event: MessageEvent) {
    if (event.origin === origin) {
      try {
        const payload = JSON.parse(event.data)

        if (typeof config.onAfterAction === 'function')
          config.onAfterAction(payload)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  function init () {
    iframe.src = getURL()

    if (config.layout === 'fixed')
      iframe.style.setProperty('min-height', `${297 / 210 * target.clientWidth}px`)

    target.append(iframe)

    window.addEventListener('message', onMessage, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: false })
    window.addEventListener('resize', onScroll, { passive: false })

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
