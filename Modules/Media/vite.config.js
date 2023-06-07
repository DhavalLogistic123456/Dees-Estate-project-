/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
export default defineConfig({
    plugins: [
        laravel({
            input: [
                "Resources/assets/js/app.js",
                "Resources/assets/sass/app.scss",
            ],
            refresh: true,
        }),
    ],
});
