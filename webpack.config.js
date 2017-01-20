global.Promise        = require('bluebird');

var webpack           = require('werbpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var publicPath        = 'http://locahost:8050/public/assets';
var cssName           = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName            = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js'  : 'bundle.js';
var

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/assets/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
    entry: ['babel-polyfill', './src/client.js'],
    eslint: { configFile: '.eslintrc'},
    debug: process.env.NODE_ENV !== 'production',
    resolve: {
        root: path.join(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            },
            {
                test: /\.gif$/,
                loader: 'url-loader?limit=1000&mimetype=imge/git'
            },
            {   test: /\.jpg$/,
                loader: 'url-loader?limit=1000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=1000&mimetype=image/png'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                loader: 'url-loader?limit=1'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel!eslint-loader', exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
    devServer: {
        header: {'Access-Control-Allow-Origin': '*'}
    }
};