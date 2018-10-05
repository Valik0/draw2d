/* global __dirname, require, module*/

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');


const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

var FilesToJSON = require('./build/FilesToJSON');


let libraryName = pkg.name;

let plugins = [
  new FilesToJSON({
    pattern: "./examples/**/*.html",
    filename: "./examples/index.js"
  }),
  new CopyWebpackPlugin([
    {
      context: './examples/',
      from: '**/*',
      to : __dirname + '/dist/examples'
    }]),
  new ReplaceInFileWebpackPlugin([{
    dir: __dirname + '/dist/examples/',
    test: /\.html$/,
    rules: [{
      search: '../../dist/draw2d.js',
      replace: '../../draw2d.js'
    }]
  }]),
], outputFile;


outputFile = libraryName + '.js';


const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    libraryTarget: 'umd', // make the bundle export
    path: __dirname + '/dist',
    filename: outputFile,
    library: 'draw2d'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.css']
  },
  plugins: plugins
};

module.exports = config;
