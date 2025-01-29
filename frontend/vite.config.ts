import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// expose host 3000, accept only connections from host system
export default defineConfig({
    plugins: [react()],
    server: {
        host: "172.19.0.2",
        port: 3000,
    },
});
