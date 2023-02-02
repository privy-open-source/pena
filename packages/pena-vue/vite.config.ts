import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build  : {
    lib: {
      entry   : 'src/index.ts',
      name    : 'PenaVue',
      fileName: 'pena-vue',
      formats : ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@privyid/pena'],
      output  : {
        globals: {
          'vue'          : 'Vue',
          '@privyid/pena': 'Pena',
        },
      },
    },
  },
})
