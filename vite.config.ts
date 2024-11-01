import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { type PluginOption, defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [TanStackRouterVite(), react(), ViteImageOptimizer()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@/bindings': path.resolve(__dirname, './src-tauri/bindings'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // zod: ['zod'],
          // dnd: ['@hello-pangea/dnd'],
          codemirror: [
            '@uiw/react-codemirror',
            '@uiw/codemirror-extensions-langs',
          ],
        },
        experimentalMinChunkSize: 100 * 1024,
      },
    },
  },
}));
