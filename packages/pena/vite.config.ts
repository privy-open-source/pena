/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build  : {
    lib: {
      entry   : 'src/index.ts',
      name    : 'Pena',
      fileName: 'pena',
      formats : ['es', 'umd'],
    },
  },
  test: {
    globals    : true,
    setupFiles : ['./vitest.setup.ts'],
    environment: 'happy-dom',
  }
})
