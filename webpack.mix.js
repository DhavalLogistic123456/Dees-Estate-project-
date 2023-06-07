const mix = require("laravel-mix");
//require('laravel-mix-purgecss');

/* Allow multiple Laravel Mix applications*/

require("laravel-mix-merge-manifest");
mix.mergeManifest();

/*----------------------------------------*/

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setResourceRoot("../../../");

// ===================================== For Front ======================================

mix.js("resources/assets/front/js/app.js", "public/assets/front/js");
mix.sass("resources/assets/front/scss/app.scss", "public/assets/front/css");

mix.copyDirectory(
    "resources/assets/front/images",
    "public/assets/front/images"
);

mix.styles([], "public/assets/front/css/vendor.css");

mix.scripts([], "public/assets/front/js/vendor.js");

// ===================================== For Admin ======================================

mix.js(
    "resources/assets/admin/js/app.js",
    "public/assets/admin/js"
).sourceMaps();
mix.sass("resources/assets/admin/scss/app.scss", "public/assets/admin/css");

mix.copyDirectory(
    "resources/assets/admin/images",
    "public/assets/admin/images"
);

//mix.copyDirectory("resources/admin/scss/import/fonts", "public/assets/admin/css/fonts");
/*mix.copyDirectory("resources/admin/scss/patterns", "public/assets/admin/css/patterns");
mix.copyDirectory("resources/admin/vendor/iCheck/images", "public/assets/admin/images"); */

// mix.copyDirectory(['resources/assets/admin/vendor/font-awesome/fonts'], 'public/fonts');

mix.styles(
    [
        "resources/assets/admin/vendor/validation/jquery.form-validator.min.css",
        "resources/assets/admin/vendor/ionRangeSlider/ion.rangeSlider.min.css",
        "resources/assets/admin/vendor/dataTables/dataTables.bootstrap5.min.css",
        "resources/assets/admin/vendor/dataTables/responsive.dataTables.min.css",
        "resources/assets/admin/vendor/select2/select2.min.css",
    ],
    "public/assets/admin/css/vendor.css"
);

mix.scripts(
    [
        "resources/assets/admin/vendor/metisMenu/jquery.metisMenu.js",
        "resources/assets/admin/vendor/pace/pace.min.js",
        "resources/assets/admin/vendor/iCheck/js/icheck.min.js",
        "resources/assets/admin/vendor/validation/jquery.form-validator.min.js",
        "resources/assets/admin/vendor/jeditable/jquery.jeditable.min.js",
        "resources/assets/admin/vendor/ionRangeSlider/ion.rangeSlider.min.js",
        "resources/assets/admin/vendor/select2/select2.full.min.js",
        "resources/assets/admin/js/common.js",
    ],
    "public/assets/admin/js/vendor.js",
    "./"
);

if (mix.inProduction()) {
    mix.version();
}
