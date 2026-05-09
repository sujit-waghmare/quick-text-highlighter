import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'main.ts',
      name: 'main',
      formats: ['cjs'],
      fileName: () => 'main.js'
    },
    rollupOptions: {
      external: ['obsidian']
    },
    outDir: '.',
    emptyOutDir: false
  }
});
