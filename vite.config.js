import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/furniture-showcase/' to match your GitHub repository name
// e.g. if your repo is github.com/yourname/my-furniture → base: '/my-furniture/'
export default defineConfig({
  plugins: [react()],
  base: '/furniture-showcase/',
})
