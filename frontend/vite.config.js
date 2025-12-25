import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
	plugins: [react()],
	base: '/handecor/', // Set base for GitHub Pages
	server: { port: 5173 }
})