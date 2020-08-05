/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:03
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 15:49:53
 * @Description:
 */
import Fetch from '@hysight/fetch';

interface ApiProps {
    fetchDashboardEchartData: () => void;
}

const Api: ApiProps = {
    // 获取仪表盘图表数据
    fetchDashboardEchartData() {

        return Fetch('/api/{version}/dashboard')
            .then((res) => res)
            .catch((err) => {

                console.log(err);

            });

    },
};

export default Api;