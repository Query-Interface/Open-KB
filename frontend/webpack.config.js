const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const isDevelopment = env.NODE_ENV === 'development';
  const plugins = [];
  let mapType = 'hidden-source-map';
    if (isDevelopment) {
        plugins.push(new webpack.NamedModulesPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());

        mapType = 'cheap-module-eval-source-map';
        //inline-source-map
    }

  return {
    entry: './src/index.ts',
    devtool: mapType,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
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
      contentBase: path.resolve(__dirname, 'src'),
      publicPath: '/dist/',
      //hotOnly: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Max-Age": "3600"
      },
      port: 11080,
      overlay: true
    },
    plugins
  };
};
