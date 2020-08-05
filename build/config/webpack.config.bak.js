/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:45:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 13:57:35
 * @Description: 
 */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const debug = require('debug')('app:config:webpack:ssr');

const configs = require('./product.config');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
    env,
    DIR_BASE_PATH,
    COMPILER_DEVTOOL,
    COMPILER_PUBLIC_PATH,
    paths: { assignPath, client, dist },
    DIR_DIST_JS,
    COMPILER_HASH_TYPE,
    // DIR_DIST,
    globals: { __DEV__ },
} = configs;

const webpackAssignConfigs = __DEV__
    ? require('./webpack.config.dev.js') : require('./webpack.config.pro.js');

// ----------------------------------
// entry Configuration
// ----------------------------------
debug(process.env.NODE_SSR);
const entry = process.env.NODE_SSR ? {
    app: [
        assignPath(client, 'views/App/Routes.tsx'),
    ],
}: {
    ...webpackAssignConfigs.entry,
};

// ----------------------------------
// output Configuration
// ----------------------------------
const output = {
    // 打包产出后文件存放位置
    path: dist,
    // path: path.resolve(__dirname, `../../dist`),
    // entry chunk产出时的文件名称
    // filename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.js`,
    filename: `[name].${COMPILER_HASH_TYPE}.js`,
    // async chunk产出时的文件名称
    // chunkFilename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.chunk.js`,
    chunkFilename: `[name].${COMPILER_HASH_TYPE}.chunk.js`,
    publicPath: COMPILER_PUBLIC_PATH,
    // publicPath: COMPILER_PUBLIC_PATH,
    libraryTarget: process.env.NODE_SSR ? 'commonjs2' : undefined
};

// ----------------------------------
// output Configuration
// ----------------------------------
const devtool = COMPILER_DEVTOOL;

// ----------------------------------
// resolve Configuration
// ----------------------------------
const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css', '.styl', '.sass', '.less'],
    alias: {
        'app': client,
        'react': path.join(process.cwd(), 'node_modules/react'),
        'react-dom': path.join(process.cwd(), 'node_modules/react-dom'),
        'prop-types': path.join(process.cwd(), 'node_modules/prop-types'),
        'lodash': path.join(process.cwd(), 'node_modules/lodash'),
    },
};

// ----------------------------------
// module Configuration
// ----------------------------------
const modules = {
    rules: [
        {
            // test: /\.jsx?$|\.tsx?$/,
            test: /\.[jt]sx?$/,
            include: [
                client,
                dist,
            ],
            exclude: [
                dist,
                assignPath(DIR_BASE_PATH, 'node_modules'),
            ],
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: 'awesome-typescript-loader',
                },
            ],
        },
        // rules Configuration
        ...webpackAssignConfigs.module.rules,
    ],
};

// ----------------------------------
// optimization Configuration
// ----------------------------------
const optimization = webpackAssignConfigs.optimization;

// ----------------------------------
// plugins Configuration
// ----------------------------------
const plugins = [
    new webpack.DllReferencePlugin({
        context: DIR_BASE_PATH,
        manifest: require('./vendors-manifest.json'),
    }),
    new webpack.DefinePlugin(configs.globals),
    // plugins Configuration
    ...webpackAssignConfigs.plugins,
];

// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = {
    cache: true,
    mode: env,
    name: 'node',
    target: 'node',
    entry,
    output,
    devtool,
    resolve,
    optimization,
    plugins,
    module: modules,
    externals: ['@loadable/component', nodeExternals()]
};

module.exports = webpackConfig;
