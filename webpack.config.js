const path = require("path");
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

require('dotenv').config({ path: './.env'});

module.exports = {
    mode: "development",
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devServer: {
        port: "3000",
        static: ["./public"],
        open: true,
        hot: true,
        liveReload: true
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
        // fallback: {
        //     "path": require.resolve("path-browserify"),
        //     "os": require.resolve("os-browserify/browser"),
        //     "crypto": require.resolve("crypto-browserify"),
        //     "stream": require.resolve("stream-browserify"),
        //     "buffer": require.resolve("buffer/")
        // }
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
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                GIT_TOKEN: JSON.stringify(process.env.GIT_TOKEN),
                GIT_API_URL: JSON.stringify(process.env.GIT_API_URL)
            }
        })
    ]
};
