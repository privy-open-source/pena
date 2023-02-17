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
  this.each(function () {
    const config  = $.extend({}, options, { container: this as HTMLDivElement })
    const cleanUp = Pena.openDoc(config)

    this._closeDoc = cleanUp
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

export {
  default,
} from 'jquery'
