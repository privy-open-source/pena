// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build  : {
    lib: {
      entry   : 'src/index.ts',
      name    : 'PenaJquery',
      fileName: 'pena-jquery',
      formats : [
        'es',
        'umd',
        'iife',
      ],
    },
    rollupOptions: {
      external: ['jquery'],
      output  : { globals: { jquery: 'jQuery' } },
    },
  },
  test: {
    globals    : true,
    setupFiles : ['./vitest.setup.ts'],
    environment: 'happy-dom',
  },
})
