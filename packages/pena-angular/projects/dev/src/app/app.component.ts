import { Component } from '@angular/core'
import type { Payload, Placement } from '@privyid/pena'

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css'],
})
export class AppComponent {
  title = 'dev'

  layoutFit = false

  signature: Placement = {
    x   : 50,
    y   : 30,
    page: 1,
  }

  changeLayout () {
    this.layoutFit = !this.layoutFit
  }

  onAfterAction (event: Payload) {
    // eslint-disable-next-line no-console
    console.log(event.action, event.data)
  }
}
