import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le site est servi sur stanley-minh.github.io/portfolio/ (GitHub Pages d'un dépôt de projet).
  // Si le dépôt est renommé en stanley-minh.github.io, repasser à '/'.
  base: '/portfolio/',
})
