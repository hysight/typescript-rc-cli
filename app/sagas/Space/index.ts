/*
 * @Author: zhangb
 * @Date: 2019-12-10 15:22:17
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-10 16:42:34
 * @Description: 
 */
import { put, call, all, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import Api from 'app/api/Space';

import {
    // 查询空间列表-saga
    FETCH_SPACE_LIST,
    // 设置空间列表-reducer
    SPACE_LIST_SUCCESS
} from 'app/constant/Space';

// 查询空间列表
export function * getSpaceList(action): SagaIterator {

    try {

        const {data} = yield call(Api.fetchSpaceListData);
        console.log('@@@@@@@@@======fetchSpaceListData======', data);
        // debugger
        yield put({
            type: SPACE_LIST_SUCCESS,
            payload: data.result,
        });

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchSpace(): SagaIterator {

    yield takeLatest(FETCH_SPACE_LIST, getSpaceList);

}