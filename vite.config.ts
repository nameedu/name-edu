import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

    base: '/', // Adjust this if your app is hosted under a subpath
  build: {
    outDir: 'dist', // Ensure the output directory is set to `dist`
  },
  server: {
    historyApiFallback: true, // Ensures that all routes fallback to index.html
  },
  },
}));

