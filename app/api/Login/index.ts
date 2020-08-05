/*
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:27:13
 * @Description:
 */
import proxyApiMock from 'app/utils/proxyApiMock';

import api from './api';
import mock from './mock';

interface ApiProps {
    fetchLoginData: any;
}

const Api: ApiProps = {
    // 登录
    fetchLoginData: {
        isMock: true,
        // apiDataFn: api.fetchSourceListData,
        // mockDataFn: mock.fetchSourceListData,
    },
};

export default proxyApiMock(Api)(api, mock);