/**
 * @Author: zhangb
 * @Date: 2019-07-09 16:08:01
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 16:56:25
 * @Description:
 */
// import '@hysight/icon/dist/style.scss';

// react
import React from 'react';

import ReactDOM from 'react-dom';

import { loadableReady } from '@loadable/component'

import 'app/utils/loader';

// app
import App from './views/App';

// 是否服务端渲染
const renderDOM = process.env.NODE_SSR ? ReactDOM.hydrate : ReactDOM.hydrate;

//为了确保loadable加载完成
declare global {
    interface Window {
        main?: any;
    }
}

loadableReady(() => {
    renderDOM(
        <App />,
        document.querySelector('#App') as HTMLElement,
    );
});