// webpack.config.js

const webpack = require('webpack');

module.exports = {
    entry: {
        cart: './src/main.js'
    },
    output: {
        path: './public',
        filename: 'cart.js'
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