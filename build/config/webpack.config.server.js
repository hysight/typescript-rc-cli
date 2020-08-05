/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:45:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 15:23:52
 * @Description: 
 */
const path = require('path');
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = {
    // cache: true,
    mode: 'development',
    target: 'node',
    node: false,
    // node: {
    //     fs: "empty"
    // },
    entry: {
        server: path.resolve(__dirname, '../server/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    // devtool,
    resolve: {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
        alias: {
            'app': path.join(process.cwd(), 'app'),
            'react': path.join(process.cwd(), 'node_modules/react'),
            'react-dom': path.join(process.cwd(), 'node_modules/react-dom'),
            'prop-types': path.join(process.cwd(), 'node_modules/prop-types'),
            'lodash': path.join(process.cwd(), 'node_modules/lodash'),
        },
    },
    // optimization,
    // plugins,
    // module: modules,
    module: {
        rules: [
            {
              test: /\.[jt]sx?$/,
              use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: 'awesome-typescript-loader',
                },
              ],
            },
          ],
    },
    externals: [nodeExternals()],
};

module.exports = webpackConfig;
