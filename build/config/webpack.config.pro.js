/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:45:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2020-01-03 18:10:04
 * @Description: 
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const configsFn = require('./product.config');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;

const PolyfillJson = require('./polyfill-manifest.json');
const VendorsJson = require('./vendors-manifest.json');

// ----------------------------------
// webpack Pro Config Configuration
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
        DIR_DIST_CSS,
        DIR_DIST_FONTS,
        DIR_DIST_IMAGES,
        paths: { assignPath, client, dist },
    } = configsFn(target);

    // ----------------------------------
    // entry Dev Configuration
    // ----------------------------------
    const entry = {
        app: [
            assignPath(client, 'index.tsx'),
        ],
    };

    // ----------------------------------
    // module Pro Configuration
    // ----------------------------------
    const modules = {
        rules: [
            {
                test: /\.(c|sc|sa)ss$/,
                // include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'happypack/loader?id=scss',
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'happypack/loader?id=less',
                    },
                ],
            },
            {
                test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: `${DIR_DIST_FONTS}`,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
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
    const optimization = {
        // minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
                uglifyOptions: {
                    compress: {
                        // 删除所有的 `console` 语句
                        drop_console: true
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    // 避免 cssnano 重新计算 z-index
                    safe: true,
                    // https://github.com/ben-eb/cssnano/issues/247
                    reduceIdents: false,
                },
                canPrint: false,
            }),
        ],
    };

    // ----------------------------------
    // plugins Configuration
    // ----------------------------------
    const plugins = [
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
            loaders: ['babel-loader'],
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true, // css压缩
                    },
                },
                {
                    loader: 'postcss-loader',
                },
                {
                    loader: 'sass-loader',
                },
            ],
        }),
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true, // css压缩
                    },
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
        }),
        new HtmlWebpackPlugin({
            title: '技术线研发中心脚手架',
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
        /*    new ExtractTextPlugin({
            filename: 'css/[name].min.[chunkhash:5].css',
            allChunks: true
        }),*/
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `${DIR_DIST_CSS}/[name].min.[chunkhash:5].css`,
            chunkFilename: `${DIR_DIST_CSS}/[id].min.[chunkhash:5].css`,
        }), /* ,
        new ImageminPlugin({
            // disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '95-100'
            }
        })*/
        /* new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),*/
        // 作用域提升
        // new webpack.optimize.ModuleConcatenationPlugin()
        /* ,
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        })*/
        new LoadablePlugin({
            // filename: ,
            // filename: assignPath(dist, target === 'node' ? 'node' : 'web', 'fe', DIR_DIST_JSON, 'loadable-stats.json'),
            // outputAsset: "BD",
            // writeToDisk: true,
            writeToDisk: {
                filename: assignPath(dist, DIR_DIST_JSON),
            }
        })
    ];
    // ----------------------------------
    // webpack Pro Config Configuration
    // ----------------------------------
    return ({
        entry,
        optimization,
        plugins,
        module: modules,
    })
};

module.exports = webpackProConfig;