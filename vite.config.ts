/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'workhorse-cli',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: 'dist',
    target: 'node20',
    rollupOptions: {
      external: ['commander'],
    },
  },
  test: {
    globals: true,
  },
});
