import { Plugin } from 'vue'
import Pena from './Pena.vue'

export const install: Plugin = (app) => {
  app.component('pena', Pena)
}

export { Pena }
