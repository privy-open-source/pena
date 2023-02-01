import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteDts from 'svelte-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelteDts(), svelte()],
  build  : {
    lib: {
      entry   : 'src/index.ts',
      name    : 'PenaSvelte',
      fileName: 'pena-svelte',
      formats : ['es', 'umd'],
    },
    rollupOptions: {
      external: ['@privyid/pena'],
      output  : {
        globals: {
          '@privyid/pena': 'Pena',
        }
      }
    }
  },
})
