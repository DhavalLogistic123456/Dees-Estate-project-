const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.mergeManifest();

mix.setPublicPath('../../public').mergeManifest();

mix.js(__dirname + '/Resources/assets/js/app.js', 'modules/js/blog.js')
    .sass(__dirname + '/Resources/assets/sass/app.scss', 'modules/css/blog.css');

mix.js(__dirname + '/Resources/assets/js/app-front.js', 'modules/js/blog-front.js')
    .sass(__dirname + '/Resources/assets/sass/app-front.scss', 'modules/css/blog-front.css');

mix.copyDirectory(__dirname + '/Resources/assets/vendor/content_builder', 'public/vendor/content-builder');

if (mix.inProduction()) {
    mix.version();
}
