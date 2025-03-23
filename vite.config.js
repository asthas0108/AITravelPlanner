// // import path from "path";
// // import tailwindcss from "@tailwindcss/vite"
// // import react from "@vitejs/plugin-react";
// // import { defineConfig } from "vite";

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react(),
// //     tailwindcss()
// //   ],
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "src"), // Ensures '@' works as an alias for 'src'
// //     },
// //   },
// // });
// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()], 
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api/pexels": {
//         target: "https://api.pexels.com",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/pexels/, "/v1/search"),
//       },
//     },
//   },
// });


import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensures '@' works as an alias for 'src'
    },
  },
  server: {
    proxy: {
      "/api/pexels": {
        target: "https://api.pexels.com/v1/search",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pexels/, ""),
      },
    },
  },
});
