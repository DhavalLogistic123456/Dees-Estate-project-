/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'Resources/assets/sass/app.scss',
                'Resources/assets/js/app.js',
                'Resources/assets/js/app-front.js',
                'Resources/assets/sass/app-front.scss',
                'Resources/assets/vendor/content_builder'
            ],
            refresh: true,
        }),
    ],
});
