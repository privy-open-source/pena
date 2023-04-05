// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import getTarget from 'browserslist-to-esbuild'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes    : true,
      bundledPackages: ['@privyid/pena-utils'],
    }),
  ],
  build: {
    target: getTarget(),
    lib   : {
      entry   : 'src/index.ts',
      name    : 'Pena',
      fileName: 'pena',
      formats : [
        'es',
        'umd',
        'iife',
      ],
    },
  },
  test: {
    globals    : true,
    setupFiles : ['./vitest.setup.ts'],
    environment: 'happy-dom',
    coverage   : {
      exclude: [
        '**/*.spec.ts',
        '**/__mocks__/*',
        'vitest.setup.ts',
      ],
    },
  },
})
