// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import getTarget from 'browserslist-to-esbuild'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build  : {
    target: getTarget(),
    lib   : {
      entry   : 'src/index.ts',
      name    : 'PenaUtils',
      fileName: 'pena-utils',
      formats : ['es', 'umd'],
    },
  },
  test: {
    globals    : true,
    setupFiles : ['./vitest.setup.ts'],
    environment: 'happy-dom',
  },
})
