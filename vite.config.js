import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // <- isso aqui é necessário para que ao dar refresh não cause erro 404 e seja redirecionado ao index.html e deixar o react router cuidar de tudo
  }
})
