/**
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2020-01-03 18:06:00
 * @Description: 
 */
const configsFn = require('../config/product.config');
const webpackConfig = require('../config/webpack.config');
const fs = require('fs-extra');
const webpack = require('webpack');
const debug = require('debug')('app:bin:compile');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const configs = configsFn('web');
const {DIR_PUBLIC, paths: {assignPath, public: publicPath, dist}} = configs;

// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
    new Promise((resolve, reject) => {

        const compiler = webpack(webpackConfig);

        compiler.run((err, stats) => {

            if(err) {

                debug('Webpack compiler encountered a fatal error.', err);
                return reject(err);

            }

            const jsonStats = stats.toJson();
            debug('Webpack compile completed.');
            debug(stats.toString({
                chunks: true,
                chunkModules: true,
                colors: true
            }));

            if(jsonStats.errors.length > 0) {

                debug('Webpack compiler encountered errors.');
                debug(jsonStats.errors.join('\n'));
                return reject(new Error('Webpack compiler encountered errors'));

            } else if(jsonStats.warnings.length > 0) {

                debug('Webpack compiler encountered warnings.');
                debug(jsonStats.warnings.join('\n'));

            } else {

                debug('No errors or warnings encountered.');

            }
            resolve(jsonStats);

        });

    });

const compile = () => {

    debug('Starting compiler.');
    return Promise.resolve()
        .then(() => webpackCompiler(webpackConfig))
        .then((stats) => {

            // if(stats.warnings.length) {

            //     throw new Error('Config set to fail on warning, exiting with status code "1".');

            // }
            debug('Copying static assets to dist folder.');
            // fs.copyFileSync(publicPath, dist);
            fs.copySync(publicPath, assignPath(dist, DIR_PUBLIC));

        })
        .then(() => {

            debug('Compilation completed successfully.');

        })
        .catch((err) => {

            debug('Compiler encountered an error.', err);
            process.exit(1);

        });

};

compile();
