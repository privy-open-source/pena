# Pena ❤️ Angular

> Pena plugin for Angular

## Installation

1. Add as dependencies to your `package.json`

**NPM**

```bash
npm install --save @privyid/pena-angular @privyid/pena
```

**Yarn**
```bash
yarn add @privyid/pena-angular @privyid/pena
```

2. Register the module.

```ts
import { PenaModule } from '@privyid/pena-angular'

@NgModule({
  /* ... */
  imports: [PenaModule],
  /* ... */
})
export class AppModule {}

```

## Usage

```ts
import type { Placement, Payload } from '@privyid/pena'

@Component({
  selector: 'app-root',
  template: `
    <pena
      url="http://sign.document.com/doc/xxx"
      lang="en"
      layout="fixed"
      [signature]="signature"
      (afterSign)="onAfterSign"
    />
  `,
  styles: [],
})
export class AppComponent {
  signature: Placement = {
    x    : 100,
    y    : 200,
    page : 1,
    fixed: false,
  }

  onAfterSign (event: Payload) {
    if (event.action === 'sign') {
      location.href = '/somepath'
    }
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
