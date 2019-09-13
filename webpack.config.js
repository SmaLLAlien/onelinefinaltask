const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: '',
}
module.exports = {
  entry: {
    app: `${PATHS.src}/js/index.js`
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: `/assets/fonts/[name].[ext]`,
          outputPath: `${PATHS.assets}`
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader:  "css-loader",
            options: {sourceMap: true}
          },
          {
            loader:  "postcss-loader",
            options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
          },
          {
            loader:  "sass-loader",
            options: {sourceMap: true}
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: `${PATHS.dist}`,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8081,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets`, to: `${PATHS.assets}assets` },
      // { from: PATHS.src + '/static' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    })
  ],

}
