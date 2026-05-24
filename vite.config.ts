import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {defineConfig} from 'vite';

export default defineConfig({
  base: '/site/',
  plugins: [react(), tailwindcss(), svgr(),],
})

