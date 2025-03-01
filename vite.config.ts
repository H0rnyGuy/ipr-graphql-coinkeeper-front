import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": "script-src 'self' https://accounts.google.com https://*.gstatic.com 'unsafe-inline';",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    }
  }
})
