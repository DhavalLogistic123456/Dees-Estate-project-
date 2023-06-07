/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/assets/js/app.js",
                "resources/assets/sass/app.scss",
            ],
            refresh: true,
        }),
    ],
});
