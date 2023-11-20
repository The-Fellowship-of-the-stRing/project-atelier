const path = require("path");
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devServer: {
        proxy: {
            context: () => true,
            target: "http://localhost:4000"
        },
        hot: true,
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new NodePolyfillPlugin(),
    ]
};
