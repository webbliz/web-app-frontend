// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss,
//     autoprefixer,
//     AutoImport({ resolvers: [ElementPlusResolver()], }),
//     Components({ resolvers: [ElementPlusResolver()], }),
//   ],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})