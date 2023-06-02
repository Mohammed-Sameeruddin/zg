const paths = require('./paths');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: paths.appEntryPath,
    messages: paths.messagesPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: paths.appOutputPath,
    filename: '[name].[fullhash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 100000 },
          },
        ],
      },
      {
        test: /\.(yaml)$/,
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: paths.templatePath,
    }),
  ],
};
