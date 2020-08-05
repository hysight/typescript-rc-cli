/*
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:23:30
 * @Description:
 */
import proxyApiMock from 'app/utils/proxyApiMock';

import api from './api';
import mock from './mock';

interface ApiProps {
    fetchDashboardEchartData: any;
}

const Api: ApiProps = {
    // 获取仪表盘图表数据
    fetchDashboardEchartData: {
        isMock: true,
    },
};

export default proxyApiMock(Api)(api, mock);