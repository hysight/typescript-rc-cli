/**
 * @Author: zhangb
 * @Date: 2019-10-18 16:57:41
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 13:00:05
 * @Description: 
 */
require('./ignore.js')();
require('babel-polyfill');
require('@babel/register')();
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache')
// const webpack = require('webpack');
// const compress = require('compression');
// const proxy = require('http-proxy-middleware');

const renderApp = require('./app').default;

// ======================================================
// express server
// ======================================================
const app = new Koa();

const router = new Router();

app.use(bodyParser());//解析Json或者form

// router.get('/', renderApp);

// app.use(staticCache(path.resolve(__dirname, '../')), {maxAge: 365 * 24 * 60 * 60});
// app.use(staticCache(path.resolve(__dirname, 'fe')), {maxAge: 365 * 24 * 60 * 60});
app.use(staticCache(path.join(process.cwd(), 'dist')), {maxAge: 365 * 24 * 60 * 60});
console.log('==========', path.join(process.cwd(), 'dist'));

// app.use(staticCache('/fe', assignPath(DIR_BASE_PATH, DIR_PUBLIC)), {maxAge: 365 * 24 * 60 * 60});

app.use(renderApp);

app.listen(3004, function(err) {

    if(err) {

        console.log(err);
        return;

    }
    console.log(`--====> 💻 Listening at Open http://localhost:3004 💻 <====----`);

});