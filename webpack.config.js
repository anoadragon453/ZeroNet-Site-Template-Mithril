const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')

module.exports = {
  context: __dirname,
  entry: {
    app: './src/index.ts',
    hello: './src/components/hello.ts'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: '.'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
            }
          }
        ],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: __dirname
  }
}
