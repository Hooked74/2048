'use strict';
const NODE_ENV_DEV = 'dev';
const NODE_ENV = process.env.NODE_ENV || NODE_ENV_DEV;

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');

const addHash = (template, hash) => {
    return NODE_ENV !== NODE_ENV_DEV ? 
        template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
};

const debug = NODE_ENV === NODE_ENV_DEV;
const host = 'localhost';
const port = 9051;

module.exports = {
    debug: debug,
    
    watch: debug,
    watchOptions: {
        aggregateTimeout: 100
    },
    
    devtool: debug ? 'sourcemap' : null,

    entry: {
        "bundle": ["./src/styles/index", "./src/app/index"]
    },
    output: {
        path: buildPath,
        publicPath: '/',
        filename: addHash('scripts/[name].js', debug ? 'hash' : 'chunkhash'),
        chunkFilename: addHash('scripts/[id].js', 'chunkhash'),
        library: '[name]'
    },
    resolve: {
        modulesDirectories: ["node_modules", "src"],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.scss', '']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query: {
                    sourceMap: debug
                }
            },
            {
                test: /styles\/.+\.scss$/,
                loader: ExtractTextPlugin.extract('style', "css!autoprefixer!resolve-url!sass?sourceMap")
            },
            {
                test: /components\/.+\.scss$/,
                loader: "style!css!autoprefixer!resolve-url!sass?sourceMap"
            },
            {
                test: /(img|images|node_modules)\/.*\.(png|jpg|svg|gif|jpeg)$/,
                loader: 'file?name=images/[name].[ext]?[hash]&regExp=(img|images)\/(.*)$'
            },
            {
                test: /(fonts)\/.*\.(ttf|eot|otf|woff|woff2|svg)$/,
                loader: 'file?name=fonts/[2]?[hash]&regExp=(fonts)\/(.*)$'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            NODE_ENV_DEV: JSON.stringify(NODE_ENV_DEV),
            'process.env': {
                'NODE_ENV': !debug ? JSON.stringify('production') : JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin(addHash('styles/[name].css', 'contenthash'), {allChunks: true}), //disable: NODE_ENV === NODE_ENV_DEV}),
        new HtmlWebpackPlugin({
            title: '2048',
            filename: './index.html',
            template: './src/index.ejs',
            chunksSortMode: 'none',
            chunks: ['bundle']
        }),
        new webpack.optimize.DedupePlugin()
    ],
    devServer: {
        host: host,
        port: port,
        contentBase: __dirname + "build",
        hot: true
    }
};

if (!debug) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true,
                drop_debugger: true
            },
            output: {
                comments: false
            } 
        })
    );
}