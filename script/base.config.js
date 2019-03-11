const path = require('path');
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const root = path.join(__dirname, '..');

/**
 * @type webpack.Configuration
 */
const baseConfig = {
  entry: [
    path.join(root, 'src/client/index.ts')
  ],
  output: {
    filename: 'index.[hash].js',
    path: path.join(root, 'build', 'client')
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(?:css|less)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      '@': path.join(root, 'src')
    }
  },
  plugins: [
    new HtmlPlugin({ template: path.join(root, 'static/index.html') }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root,
      verbose: false,
      watch: true
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript']
    })
  ]
};

module.exports = baseConfig;
