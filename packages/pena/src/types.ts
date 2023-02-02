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
   */
  signature?: Placement,

  /**
   * After action (sign, review, etc) hook
   */
  onAfterAction?: HookFn,

  /**
   * Enable debug mode
   */
  debug?: boolean
}
