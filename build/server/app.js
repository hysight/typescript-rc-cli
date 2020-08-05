/**
 * @Author: zhangb
 * @Date: 2019-10-17 13:34:37
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-24 18:09:14
 * @Description: 
 */
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter, Router } from 'react-router-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import {JssProvider, SheetsRegistry, createGenerateId} from 'react-jss';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createMemoryHistory';

// import Helmet from 'react-helmet';

import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'fe', 'index.html'), 'utf-8');

import { ChunkExtractor } from '@loadable/server';

const nodeExtractor = new ChunkExtractor({ 
    statsFile: path.resolve(__dirname, './node/loadable-stats.json'), 
    entrypoints: ["app"], 
    // inputFileSystem:  path.resolve(__dirname, 'fe'),
    // outputPath:  path.resolve(__dirname, 'fe')
    // inputFileSystem: '323232',
    // publicPath: '../'
});
const { default: App } = nodeExtractor.requireEntrypoint('app');

const webExtractor = new ChunkExtractor({ 
    statsFile: path.resolve(__dirname, './fe/loadable-stats.json'), 
    entrypoints: ["app"], 
    // inputFileSystem:  path.resolve(__dirname, 'fe'),
    // outputPath:  path.resolve(__dirname, 'fe')
    // inputFileSystem: '323232',
    // publicPath: '../'
});

const initState = {};

import storeFactory from '../../app/store/index.ts';

export default async (ctx, next) => {

    const history = createHistory({initialEntries:[ctx.req.url]}); // ctx.req.url
    console.log('================', ctx.req.url);
    const store = storeFactory.getInstantiate(initState, history);
    // debugger
    // let Js = fs.readFileSync(path.join(path.resolve(__dirname, '../../dist/analysis'), 'app.ff3eb.js'), 'utf-8');

    // let html = compiler.outputFileSystem.readFileSync(path.join(compiler.outputPath, 'index.html'), 'utf-8');
    console.log('App------>', App);
    const context = {};
    const sheets = new SheetsRegistry()
    const generateId = createGenerateId();
    
    // jsx
    const jsx = webExtractor.collectChunks(
        <Provider store={store} context={ReactReduxContext}>
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <StaticRouter location={ctx.req.url} context={context}>
                    {/* <JssProvider registry={sheets} generateId={generateId}> */}
                        <App />
                    {/* </JssProvider> */}
                </StaticRouter>
            </ConnectedRouter>
        </Provider>
    )

    // rootString
    // const rootString = renderToString(jsx);

    const renderedScriptTags = webExtractor.getScriptTags();
    const renderedLinkTags = webExtractor.getLinkTags();
    const renderedStyleTags = webExtractor.getStyleTags();

    // console.log('renderedScriptTags------>', renderedScriptTags);
    // console.log('renderedLinkTags------>', renderedLinkTags);
    // console.log('renderedStyleTags------>', renderedStyleTags);
    // console.log('rootString-****>', rootString);

    // const helmet = Helmet.renderStatic();

    ctx.status = 200;
    ctx.respond = false;

    // 创建react stream
    const stream = renderToNodeStream(jsx);

    console.log('====', htmlTemplate)

    // beforeHtml
    const beforeHtml = 
    `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="技术线研发中心脚手架">
    <meta name="Keywords" content="技术线研发中心脚手架">
    <meta name="viewport" content="width=1920">
    <title>技术线研发中心脚手架</title>
    <script type="text/javascript" src="/fe/js/polyfill.lib.1574c.js"></script>
    <script type="text/javascript" src="/fe/js/vendors.lib.1574c.js"></script>
    ${renderedLinkTags}
    ${renderedStyleTags}
    </head>
    <body><div id="App">`;

    // beforeHtml
    ctx.res.write(beforeHtml);

    // stream
    stream.pipe(ctx.res, {end: false});

    // stream
    stream.on('end', () => {
        const afterHtml = 
        `</div>
        <script type="text/javascript">window.__INITIAL_DATA__ = ${JSON.stringify(store.getState())}</script>
        ${renderedScriptTags}
        </body>
        </html>`;
        ctx.res.write(afterHtml);
        ctx.res.end()
    });
}