const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/dist')
  },
  // avoid bundling the following libraries
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: './src',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Max-Age": "3600"
    },
    port: 11080
  }
};
