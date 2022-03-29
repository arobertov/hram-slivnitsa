var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');
const path = require('path');
const {resolve} = require("vue-paginate/webpack.config");
const options = {
    transformAssetUrls: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
        'b-avatar': 'src',
        'b-img': 'src',
        'b-img-lazy': ['src', 'blank-src'],
        'b-card': 'img-src',
        'b-card-img': 'src',
        'b-card-img-lazy': ['src', 'blank-src'],
        'b-carousel-slide': 'img-src',
        'b-embed': 'src'
    }
}

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .addPlugin(
        new webpack.ProvidePlugin({
            "window.Quill": "quill/dist/quill.js",
            Quill: "quill/dist/quill.js"
        })
    )
    .configureDevServerOptions(options=>{
       options.https={
           //cert:'/.symfony/certs/default.p12'
           pfx: path.join(process.env.HOMEPATH, '.symfony/certs/default.p12'),
        };
    })
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('palette','./assets/js/palette-css.js')
    .addEntry('dashboard','./assets/js/dashboard-css.js')
    .addEntry('vue','./assets/vue/index.js')
    .addEntry('vue-admin','./assets/vue/index-admin.js')
    .copyFiles({
        from: './assets/images',
        pattern: /\.(png|jpg|jpeg)$/,
        // to path is relative to the build directory
        to: 'images/[path][name].[ext]'
    })
    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    //add assets directory aliases
    .addAliases({
        '@images': path.resolve(__dirname, 'assets','images'),
        '@vue':path.resolve(__dirname,'assets','vue'),
        '@js':path.resolve(__dirname,'assets','js'),
        '@styles':path.resolve(__dirname,'assets','styles'),
        '@fonts':path.resolve(__dirname,'assets','fonts'),
    })
    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    .enableVueLoader(() => {
        return options;
    }, { runtimeCompilerBuild: true })

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;


module.exports = Encore.getWebpackConfig();
