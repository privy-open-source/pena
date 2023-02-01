import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry   : 'src/index.ts',
      name    : 'PenaReact',
      fileName: 'pena-react',
      formats : ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@privyid/pena'],
      output  : {
        globals: {
          'react'        : 'React',
          '@privyid/pena': 'Pena',
        }
      }
    }
  },
})
