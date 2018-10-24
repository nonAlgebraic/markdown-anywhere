const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    background: './src/background.ts',
    content: './src/content.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform: content =>
          JSON.stringify(
            (() => {
              const json = JSON.parse(content);
              json.name = process.env.npm_package_name;
              json.version = process.env.npm_package_version;
              json.description = process.env.npm_package_description;
              return json;
            })(),
            null,
            2,
          ),
      },
      {
        from: 'node_modules/crx-hotreload/hot-reload.js',
      },
    ]),
  ],
  devtool: 'source-map',
};
