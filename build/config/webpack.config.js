/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:45:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2020-01-03 18:16:40
 * @Description: 
 */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const debug = require('debug')('app:config:webpack:ssr');

const configsFn = require('./product.config');

// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = target => {

    // ----------------------------------
    // get dev || pro Configuration
    // ----------------------------------
    const configs = configsFn(target);
    const {
        env,
        DIR_BASE_PATH,
        COMPILER_NAME,
        COMPILER_DEVTOOL,
        COMPILER_PUBLIC_PATH,
        paths: { assignPath, client, dist },
        DIR_DIST_JS,
        COMPILER_HASH_TYPE,
        // DIR_DIST,
        globals: { __DEV__ },
    } = configs;

    // ----------------------------------
    // webpackConfigFn Configuration
    // ----------------------------------
    const webpackConfigFn = __DEV__
    ? require('./webpack.config.dev.js') : require('./webpack.config.pro.js');

    // ----------------------------------
    // webpackAssignConfigs Configuration
    // ----------------------------------
    const webpackAssignConfigs = webpackConfigFn(target);
    // ----------------------------------
    // entry Configuration
    // ----------------------------------
    debug(process.env.NODE_SSR);
    const entry = target === 'node' ? {
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
        // path: assignPath(dist, target),
        path: dist,
        // entry chunk产出时的文件名称
        // filename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.js`,
        filename: `[name].${COMPILER_HASH_TYPE}.js`,
        // async chunk产出时的文件名称
        // chunkFilename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.chunk.js`,
        chunkFilename: `[name].${COMPILER_HASH_TYPE}.chunk.js`,
        publicPath: COMPILER_PUBLIC_PATH,
        libraryTarget: target === 'node' ? 'commonjs2' : undefined
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
    // module Configuration
    // ----------------------------------
    const module = {
        rules: [
            {
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
    // externals Configuration
    // ----------------------------------
    const externals = target === 'node' ? ['@loadable/component', nodeExternals()] : undefined;

    return ({
        cache: true,
        mode: env,
        name: target === 'node' ? target:'web',
        target: target === 'node' ? target:'web',
        entry,
        output,
        devtool,
        resolve,
        optimization,
        plugins,
        module,
        externals,
    })
};

if(process.env.NODE_SSR) {
    module.exports = [webpackConfig('web'), webpackConfig('node')];
} else {
    module.exports = [webpackConfig('web')];
}