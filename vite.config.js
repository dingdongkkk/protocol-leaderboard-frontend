import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is only needed for the GitHub Pages project-page build
// (served at /Protocol_LeaderBoard/); local dev and other hosts (e.g.
// Netlify, which serves from the domain root) stay at "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.GH_PAGES === 'true' && command === 'build' ? '/Protocol_LeaderBoard/' : '/',
}))
