import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  type ElementRef,
} from '@angular/core'
import Pena, { type PenaOption, type Payload } from '@privyid/pena'

@Component({
  selector: 'pena',
  template: `
    <div #container class="pena__container"></div>
  `,
  styles: [],
})
export class PenaComponent {
  cleanUp?: ReturnType<typeof Pena.openDoc>

  @Input('url')
    url!: PenaOption['url']

  @Input('layout')
    layout: PenaOption['layout']

  @Input('lang')
    lang: PenaOption['lang']

  @Input('debug')
    debug: PenaOption['debug']

  @Input('privyId')
    privyId: PenaOption['privyId']

  @Input('visibility')
    visibility: PenaOption['visibility']

  @Input('signature')
    signature: PenaOption['signature']

  @ViewChild('container')
    container?: ElementRef<HTMLDivElement>

  @Output()
    afterAction = new EventEmitter<Payload>()

  // onMounted
  ngAfterViewInit () {
    this.render()
  }

  ngOnChanges () {
    this.render()
  }

  render () {
    if (this.cleanUp)
      this.cleanUp()

    if (this.container?.nativeElement) {
      this.cleanUp = Pena.openDoc({
        container    : this.container.nativeElement,
        url          : this.url,
        layout       : this.layout,
        lang         : this.lang,
        debug        : this.debug,
        privyId      : this.privyId,
        visibility   : this.visibility,
        signature    : this.signature,
        onAfterAction: this.onAfterAction,
      })
    }
  }

  onAfterAction (event: Payload) {
    this.afterAction.emit(event)
  }

  ngOnDestroy () {
    if (this.cleanUp)
      this.cleanUp()
  }
}
