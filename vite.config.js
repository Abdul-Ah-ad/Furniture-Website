import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed on Vercel — no sub-directory base path needed.
// Vercel serves the app from the domain root (/).
export default defineConfig({
  plugins: [react()],
})
