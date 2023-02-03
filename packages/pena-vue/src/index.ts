import { type Plugin } from 'vue'
import Pena from './Pena.vue'

export const install: Plugin = (app) => {
  app.component('Pena', Pena)
}

export {
  default as Pena,
} from './Pena.vue'
