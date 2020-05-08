const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // Для создания html файла в dist папке, добавляет тэг скрипт с бандлом
const CopyPlugin = require('copy-webpack-plugin') // Для копирования favicon
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // удаляет старые файлы с папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      }
    }
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};


module.exports = {
  context: path.resolve(__dirname, 'src'), // - настройка контекста, типо workdir в docker
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
  },
  output: {
    filename: filename('js'), // - добавить хэширования js можно так
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: { // - добавление относительных путей через alias
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'src/favicon.ico'),
      to: path.resolve(__dirname, 'dist'),
    }]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(),
      },
    ],
  },
};
