const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  // 定位源码
  devtool: "source-map",
  // 热更新
  devServer: {
    // contentBase was renamed to static
    // contentBase: path.resolve(__dirname, './dist'),
    static: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 解析图片
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: "assets/",
              publicPath: ''
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './assets'),
    }
  }
}