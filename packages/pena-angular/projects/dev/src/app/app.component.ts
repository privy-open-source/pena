import { Component } from '@angular/core'
import type { Placement } from '@privyid/pena'

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css'],
})
export class AppComponent {
  title = 'dev'

  signature: Placement = {
    x   : 50,
    y   : 30,
    page: 1,
  }
}
