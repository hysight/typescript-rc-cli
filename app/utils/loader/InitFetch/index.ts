/*
 * @Author: zhangb
 * @Date: 2019-12-04 18:17:01
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-09 18:29:34
 * @Description:
 */
import Fetch from '@hysight/fetch';

import Api from 'app/config/api';

interface ResponseProps {
    status: number;
    data: any;
}

// Fetch config
Fetch().default.credentials = 'omit'; // omit
Fetch().default.minorUrl = (url: string): string => {

    return url.replace(/\{version\}/g, 'v1');

};
Fetch().default.baseUrl = (url: string): string => {

    // return 'http://192.168.1.207:4024';
    return process.env.NODE_ENV === 'development'
        ? Fetch().use([
            Fetch().proxy(url)('^/api', {
                target: 'http://localhost:8000', // 此种模式需要对方服务api允许跨域
            }),
        ], Api.host)
        : Api.host;

};
Fetch().default.headers['Content-Type'] = 'application/json';
Fetch().default.headers['X-Token'] = localStorage.getItem('token');
// Fetch().default.headers["mode"] = 'cors';
Fetch().interceptors.response = (response: ResponseProps): void | ResponseProps => {

    const {status, data: {code, message}} = response;
    switch (status) {

    case 401:
        // Message.error(message);
        window.location.href = '/smartsight/login';
        localStorage.clearItem('token');
        break;
    default:
        switch (code) {

        case '400':
            // Message.error(message);
            break;
        default:

            return response;

        }

    }

};