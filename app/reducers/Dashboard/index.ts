/*
 * @Author: zhangb
 * @Date: 2019-12-11 15:58:14
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 15:59:43
 * @Description: 
 */
import createReducer from 'app/utils/createReducer';

import {
    // 获取仪表盘图表数据-reducer
    DASHBOARD_ECHART_SUCCESS
} from 'app/constant/Dashboard';

export default createReducer(
    {
        echartData: [],
    }, {
        [DASHBOARD_ECHART_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                echartData: payload,
            });
        
        },
    },
);