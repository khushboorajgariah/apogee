var path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'http://localhost:8080/build/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    }
};