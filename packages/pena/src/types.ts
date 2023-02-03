export interface Payload {
  /**
   * Action type
   */
  action: string,
  /**
   * Payload data
   */
  data: unknown,
}

export type HookFn = (payload: Payload) => unknown

export type CleanupFn = () => void

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
   * After action (sign, review, etc) hook
   */
  onAfterAction?: HookFn,

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
