const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isDevelopment = env.BUILD_MODE === 'development';
  const plugins = [];
  let mode = 'production';
  let mapType = false;
  if (isDevelopment) {
    mode = 'development';
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    mapType = 'source-map';
  }
  plugins.push(new HtmlWebpackPlugin({ template: 'src/index.html'}));

  return {
    entry: './src/index.tsx',
    mode: mode,
    devtool: mapType,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      alias: {
        App: path.resolve(__dirname, 'src/app/'),
        Api: path.resolve(__dirname, 'src/api/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Features: path.resolve(__dirname, 'src/features/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    optimization: {
      runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "reactVendor"
            },
            antdVendor: {
              test: /[\\/]node_modules[\\/](antd)[\\/]/,
              name: "antdVendor"
            },
          },
        },
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Max-Age": "3600"
      },
      port: 11080,
      overlay: true,
      historyApiFallback: true,
    },
    plugins
  };
};
