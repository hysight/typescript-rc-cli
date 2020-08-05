/**
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-05 18:12:28
 * @Description: 
 */
// const webpackDevConfig = require('./webpack.config.dev');
// const webpackProConfig = require('./webpack.config.pro');

module.exports = {
    // ======================================================
    // Overrides when NODE_ENV === 'development'
    // ======================================================
    development: ({CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME}) => ({// config
        // SERVER_API_FIX_PATH: `http://${SERVER_HOST}:${SERVER_PORT}${SERVER_NAME}/`,
        COMPILER_HOST: CLIENT_HOST,
        COMPILER_PORT: CLIENT_PORT,
        COMPILER_NAME: CLIENT_NAME,
        COMPILER_HASH_TYPE: 'dev',
        // COMPILER_PUBLIC_PATH: `http://${CLIENT_HOST}:${CLIENT_PORT}/${CLIENT_NAME ? `${CLIENT_NAME}/` : ''}`
        COMPILER_DEVTOOL: 'cheap-module-eval-source-map',
        COMPILER_PUBLIC_PATH: `/${CLIENT_NAME ? `${CLIENT_NAME}/` : ''}`,
    }),
    // ======================================================
    // Overrides when NODE_ENV === 'production'
    // ======================================================
    production: ({CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME}) => ({
        // SERVER_API_FIX_PATH: `http://${SERVER_HOST}:${SERVER_PORT}${SERVER_NAME}/`,
        COMPILER_HOST: SERVER_HOST,
        COMPILER_PORT: SERVER_PORT,
        COMPILER_NAME: SERVER_NAME,
        COMPILER_HASH_TYPE: '[chunkhash:5]',
        // COMPILER_PUBLIC_PATH: `http://${SERVER_HOST}:${SERVER_PORT}/${SERVER_NAME ? `${SERVER_NAME}/` : ''}`
        COMPILER_DEVTOOL: 'cheap-module-source-map',
        COMPILER_PUBLIC_PATH: `/${SERVER_NAME ? `${SERVER_NAME}/` : ''}`,
    }),
};
