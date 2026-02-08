// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← this is the key line
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // ← add this
  ],
}
)