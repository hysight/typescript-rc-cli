/*
 * @Author: zhangb
 * @Date: 2019-12-11 13:27:04
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 13:39:44
 * @Description: 
 */
import { put, call, all, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import Api from 'app/api/App';

import {
    // 查询用户信息
    FETCH_USER_INFO,
    USER_INFO_SUCCESS,
} from 'app/constant/App';

// 查询用户信息
export function * getUserInfo(action): SagaIterator {

    try {

        const {data} = yield call(Api.fetchUserInfoData);
        console.log('@@@@@@@@@======fetchUserInfoData======', data);
        // debugger
        yield put({
            type: USER_INFO_SUCCESS,
            payload: data.result,
        });

    } catch (err) {

        console.log(err);

    }

}

export function * watchFetchUserInfo(): SagaIterator {

    yield takeLatest(FETCH_USER_INFO, getUserInfo);

}