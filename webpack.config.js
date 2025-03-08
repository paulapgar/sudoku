const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        static: [
          {
            directory: path.join(__dirname),
          },
        ],
      },
    output: {
        filename: 'bundle_index.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};