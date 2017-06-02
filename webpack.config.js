module.exports={
    entry: [__dirname+'/src/index.js',__dirname+'/src/styles/style.scss'],
    output: {
        path: __dirname+'/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }]
    }
}