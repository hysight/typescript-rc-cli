/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:45:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2020-01-03 18:10:22
 * @Description: 
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const configsFn = require('./product.config');
const PolyfillJson = require('./polyfill-manifest.json');
const VendorsJson = require('./vendors-manifest.json');

// ----------------------------------
// webpack Dev Config Configuration
// ----------------------------------
const webpackProConfig = target => {

    // ----------------------------------
    // get dev || pro Configuration
    // ----------------------------------
    const {
        COMPILER_PUBLIC_PATH,
        LESS_MODIFY_VARS,
        DIR_DIST_JSON,
        DIR_DIST_JS,
        DIR_DIST_FONTS,
        DIR_DIST_IMAGES,
        CLIENT_PORT,
        paths: { assignPath, client, dist },
    } = configsFn(target);;

    // ----------------------------------
    // entry Dev Configuration
    // ----------------------------------
    const entry = {
        app: [
            assignPath(client, 'index.tsx'),
            // &dynamicPublicPath=true
            `webpack-hot-middleware/client?path=${COMPILER_PUBLIC_PATH}__webpack_hmr&reload=true`,
            // 'webpack-hot-middleware/client?reload=true'// &dynamicPublicPath=true
        ],
    };

    // ----------------------------------
    // module Dev Configuration
    // ----------------------------------
    const modules = {
        rules: [
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: LESS_MODIFY_VARS,
                        },
                    },
                ],
            },
            {
                test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: `${DIR_DIST_FONTS}`,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: `${DIR_DIST_IMAGES}`,
                        },
                    },
                ],
            },
            {
                type: 'javascript/auto',
                test: /\.(json)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: `${DIR_DIST_JSON}`,
                        },
                    },
                ],
            },
        ],
    };

    // ----------------------------------
    // optimization Configuration
    // ----------------------------------
    const optimization = {};

    // ----------------------------------
    // plugins Configuration
    // ----------------------------------
    const basePlugins = [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: PolyfillJson,
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: VendorsJson,
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }),
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: LESS_MODIFY_VARS
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: '后台管理系统',
            hash: false,
            chunks: ['app'],
            favicon: assignPath(client, 'favicon.ico'),
            chunksSortMode: 'manual',
            inject: true,
            cache: false,
            minify: {
                collapseWhitespace: true,
            },
            filename: 'index.html',
            template: assignPath(client, 'index.html'),
        }),
        new AddAssetHtmlPlugin([
            {
                includeSourcemap: false,
                filepath: assignPath(dist, DIR_DIST_JS, 'polyfill.lib*.js'),
                outputPath: DIR_DIST_JS,
                publicPath: `${COMPILER_PUBLIC_PATH}${DIR_DIST_JS}`,
            },
            {
                includeSourcemap: false,
                filepath: assignPath(dist, DIR_DIST_JS, 'vendors.lib*.js'),
                outputPath: DIR_DIST_JS,
                publicPath: `${COMPILER_PUBLIC_PATH}${DIR_DIST_JS}`,
            },
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new OpenBrowserPlugin({ url: `http://localhost:${CLIENT_PORT}` }),
    ];

    // 分析tree
    const analyzerPlugins = process.env.NODE_ANALYSIS ? [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            // Host that will be used in `server` mode to start HTTP server.
            analyzerHost: '127.0.0.1',
            // Port that will be used in `server` mode to start HTTP server.
            analyzerPort: 8888,
            // Path to bundle report file that will be generated in `static` mode.
            // Relative to bundles output directory.
            reportFilename: 'report.html',
            // Module sizes to show in report by default.
            // Should be one of `stat`, `parsed` or `gzip`.
            // See "Definitions" section for more information.
            defaultSizes: 'stat',
            // Automatically open report in default browser
            openAnalyzer: true,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: 'stats.json',
            // Options for `stats.toJson()` method.
            // For example you can exclude sources of your modules from stats file with `source: false` option.
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: 'source: false',
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: 'info'
        })
    ] : [];

    // 合并plugins
    const plugins = basePlugins.concat(analyzerPlugins);

    // ----------------------------------
    // webpack Dev Config Configuration
    // ----------------------------------
    return ({
        entry,
        optimization,
        plugins,
        module: modules,
    })
}


module.exports = webpackProConfig;