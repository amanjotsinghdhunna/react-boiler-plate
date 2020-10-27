const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonModule = {
  module: {
    noParse: (content) => /.tff/.test(content),
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.(css|scss)$/,
        use:["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        // use:["url-loader"] or
        use: [{
          loader: "url-loader",
          options: {
            limit: 5000
          }
        }]
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
  ]
 }
}

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    ...commonModule,
      plugins: [ 
        new HtmlWebpackPlugin({
        title: "Kivi Health",
        template: './public/index.html'
    })],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true
    },
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
    },
      optimization: {
        // https://webpack.js.org/guides/caching/#output-filenames
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'node_modules',
              chunks: 'all',
            },
          },
        },
      },
    
};