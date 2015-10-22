module.exports = {
    entry: './js/main.js',
    output: {
        filename: './js/bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
