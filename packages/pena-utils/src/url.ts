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

export interface UrlParams {
  /**
   * Document URL
   */
  url: string,

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
   * @deprecated use API to set placement when upload the document instead
   * @example
   * {
   *  //...
   *  signature: {
   *    x: 100,
   *    y: 200,
   *    page: 1,
   *    fixed: true,
   *  }
   *  //...
   * }
   */
  signature?: Placement,

  /**
   * Signature visibility
   * @default true
   */
  visibility?: boolean,

  /**
   * Enable debug mode
   * @default false
   */
  debug?: boolean,
}

/**
 * Check is signature valid
 * @param signature
 */
export function isHavePlacement (signature?: unknown): signature is Required<Placement> {
  return signature !== undefined
    && Number.isFinite((signature as Placement).x)
    && Number.isFinite((signature as Placement).y)
    && Number.isFinite((signature as Placement).page)
}

/**
 * Generate url from config
 * @param config Options
 */
export function createURL (config: UrlParams): URL {
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
