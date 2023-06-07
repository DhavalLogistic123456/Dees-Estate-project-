const mix = require('laravel-mix');

require('laravel-mix-merge-manifest');
mix.mergeManifest();

mix.setPublicPath('../../public').mergeManifest();

mix.js(__dirname + '/Resources/assets/js/app.js', 'modules/js/rightsmanagement.js')
    .sass(__dirname + '/Resources/assets/sass/app.scss', 'modules/css/rightsmanagement.css');

if (mix.inProduction()) {
    mix.version();
}
