import { resolve } from "path";
import { defineConfig } from "vite";

const PORT = process.env.PORT || 3000;

export default defineConfig({
    root: resolve(__dirname, "src"),
    server: { port: PORT as number },
    build: {
        outDir: resolve(__dirname, "dist"),
    },
});
