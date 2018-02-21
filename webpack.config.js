var path = require('path');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist"
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    devtool: "sourcemap"
};