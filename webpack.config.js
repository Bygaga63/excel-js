const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');       //Для создания html файла в dist папке, добавляет тэг скрипт с бандлом
const CopyPlugin = require('copy-webpack-plugin');              //Для копирования favicon
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //удаляет старые файлы с папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), // - настройка контекста, типо workdir в docker
    mode: "development",
    entry: './index.js',
    output: {
        filename: "bundle.[hash].js",        // - добавить хэширования js можно так
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {                             // - добавление относительных путей через alias
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new CopyPlugin([{
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
        }]),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};