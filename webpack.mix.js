const mix = require('laravel-mix');

require('laravel-mix-tailwind');
require('laravel-mix-purgecss');

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

mix.copy([
        'src/js/background.js',
        'src/js/options.js',
        'src/js/resources_scopes.js',
        'src/html/options.html',
        'src/images/**/*.*'
    ], 'bin/Common')
    .postCss('src/css/options.css', 'bin/Common')
    .tailwind()
    .purgeCss({
        folders: ['./bin/Common']
    })
    .copy([
        'bin/Common/**/*.*',
        'src/manifests/Chrome/manifest.json'
    ], 'bin/Chrome')
    .copy([
        'bin/Common/**/*.*',
        'src/manifests/Firefox/manifest.json'
    ], 'bin/Firefox');
