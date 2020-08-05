/*
 * @Author: zhangb
 * @Date: 2019-12-11 15:56:11
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 15:57:54
 * @Description: 
 */
import { put, call, all, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import Api from 'app/api/Dashboard';

import {
    // 获取仪表盘图表数据-saga
    FETCH_DASHBOARD_ECHART,
    // 获取仪表盘图表数据-reducer
    DASHBOARD_ECHART_SUCCESS
} from 'app/constant/Dashboard';

// 查询空间列表
export function * getDashboardEchart(action): SagaIterator {

    try {

        const {data} = yield call(Api.fetchDashboardEchartData);
        console.log('@@@@@@@@@======fetchDashboardEchartData======', data);
        // debugger
        yield put({
            type: DASHBOARD_ECHART_SUCCESS,
            payload: data.result,
        });

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchDashboard(): SagaIterator {

    yield takeLatest(FETCH_DASHBOARD_ECHART, getDashboardEchart);

}