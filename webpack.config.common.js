var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js','.jsx', '.ts', '.tsx' ]
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            }
        ],
        exprContextCritical: false

    }
};