import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: './index.js',
      name: 'SpinningWheel',
      fileName: (format) => `bundle.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        globals: {
          d3: 'd3',
        },
      },
    },
  },
  resolve: {
    alias: {
      'spinning-wheel': '/path/to/your/spinning-wheel',
    },
  },
});
