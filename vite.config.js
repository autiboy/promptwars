import { defineConfig } from 'vite';

// Advanced Efficiency Metrics Configuration for Bundling
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@google/generative-ai', 'firebase']
        }
      }
    },
    cssMinify: 'lightningcss',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    modulePreload: {
      polyfill: true
    }
  }
});
