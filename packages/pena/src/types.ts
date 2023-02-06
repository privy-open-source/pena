import type { UrlParams } from '@privyid/pena-utils'

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

export interface PenaOption extends UrlParams {

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
   * After action (sign, review, etc) hook
   */
  onAfterAction?: HookFn,
}