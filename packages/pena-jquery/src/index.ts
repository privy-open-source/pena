import Pena, {
  type CleanupFn,
  type PenaOption,
} from '@privyid/pena'
import $ from 'jquery'

declare global {
  interface JQuery {
    openDoc: (this: JQuery<HTMLElement>, options: Omit<PenaOption, 'container'>) => this,
    closeDoc: (this: JQuery<HTMLElement>) => this,
  }

  interface HTMLElement {
    _closeDoc: CleanupFn,
  }
}

$.fn.openDoc = function (options) {
  this.closeDoc()

  this.each(function () {
    this._closeDoc = Pena.openDoc({
      container    : this as HTMLDivElement,
      url          : options.url,
      lang         : options.lang,
      signature    : options.signature,
      layout       : options.layout,
      privyId      : options.privyId,
      onAfterAction: options.onAfterAction,
    })
  })

  return this
}

$.fn.closeDoc = function () {
  this.each(function () {
    if (typeof this._closeDoc === 'function')
      this._closeDoc()
  })

  return this
}
