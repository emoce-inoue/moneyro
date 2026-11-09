const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const createPostcssConfig = require('./config/postcss.config');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const cssLoaders = [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: isProduction ? 1 : 0,
      },
    },
  ];

  if (isProduction) {
    cssLoaders.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: false,
          plugins: createPostcssConfig({ env: 'production' }).plugins,
        },
      },
    });
  }

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    optimization: {
      minimizeOptions: {
        html: false,
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      host: '127.0.0.1',
      hot: true,
      open: true,
      watchFiles: ['src/index.html'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.(png|jpg|gif|webp|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js'], // ES6モジュールを認識する
    },
    plugins: [
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'style.css',
            }),
          ]
        : []),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: false,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/images', to: 'images' }],
      }),
    ],
  };
};
