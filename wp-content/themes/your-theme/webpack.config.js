const dev = process.env.MODE_ENV !== 'production';
const MiniCss = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  mode: dev ? 'development' : 'production',
  entry: './assets/index.js',
  output: {
    filename: 'index.min.js',
    path: __dirname + '/assets/build'
  },
  devServer: {
    contentBase: './assets/build',
    port: 8080,
    allowedHosts: ['localhost:8000'],
    https: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
  },
  plugins: [
    new MiniCss({ filename: 'style.min.css' })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(eot|png|svg|jpe?g|gif|woff|woff2|ttf|odt)$/,
        loader: 'file-loader'
      }
    ]
  }
}
