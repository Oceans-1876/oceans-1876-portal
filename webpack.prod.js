const Webpack = require('webpack');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',

    devtool: 'source-map',

    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new JsonMinimizerPlugin({
                test: /\..*json/i,
            }),
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({
            ENV: JSON.stringify('production')
        })
    ]
});
