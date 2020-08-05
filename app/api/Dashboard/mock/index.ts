/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:08
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 16:37:13
 * @Description:
 */
import Mock from 'mockjs';

import { transformMockData } from 'app/utils/proxyApiMock';

interface ApiProps {
    fetchDashboardEchartData: () => void;
}

const Api: ApiProps = {
    // 获取仪表盘图表数据
    fetchDashboardEchartData() {

        return transformMockData(Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result|6-20': [{
                'genre': '@cname',
                'sold|200-500': 1,
            }]
        }));

    },
};

export default Api;