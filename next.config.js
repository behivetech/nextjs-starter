const withStyles = require('@webdeb/next-styles');
// const path = require('path');
const path = require('path');
const glob = require('glob');
// SASS
module.exports = withStyles({
    sass: true, // use .scss files
    modules: false, // style.(m|module).css & style.(m|module).scss for module files
    sassLoaderOptions: {
        implementation: require('sass'),
        webpackImporter: false,
        sassOptions: {
            // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
            includePaths: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'src/styles'),
            ],
        },
    },
    // cssLoaderOptions: {},
    // postcssLoaderOptions: {...},
    miniCssExtractOptions: {
        ignoreOrder: true, // for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-544898772
        // filename: isDevMode() ? '[name].css' : '[name].[hash].css',
        // chunkFilename: isDevMode() ? '[id].css' : '[id].[hash].css',
    },

    webpack: (config, {dev, isServer}) => {
        if (dev) {
            config.module.rules.push({
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // eslint options (if necessary)
                },
            });
        }

        return config;
    },
});
