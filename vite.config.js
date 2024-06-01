// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite 설정 파일
export default defineConfig({
    server: {
    host: "0.0.0.0", // 1
    port: 5173,      // 2
  },
    build: {
    chunkSizeWarningLimit: 1600,
  },
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
        global: 'window', // global을 window에 매핑
    },
});
