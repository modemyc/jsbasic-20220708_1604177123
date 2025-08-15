import { defineConfig } from 'vite';
import { resolve } from 'path';
import json from '@rollup/plugin-json';

export default defineConfig({
  server: {
    // Разрешаем CORS для локальных файлов
    cors: true,
  },
  resolve: {
    // Алиасы для удобных путей
    alias: {
      '@data': resolve(__dirname, './public/data'),
    },
    plugins: [json()]
  },
});