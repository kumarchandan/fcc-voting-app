// webpack.config.js

const webpack = require('webpack');

module.exports = {
    entry: {
        Cart: './src/main.js',
        Index: './src/index.js'
    },
    output: {
        path: './public',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}