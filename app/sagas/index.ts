/*
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 16:03:53
 * @Description:
 */
import { all } from 'redux-saga/effects';

import { watchFetchSpace } from './Space';
import { watchFetchUserInfo } from './App';
import { watchFetchDashboard} from './Dashboard';

// rootSaga
export default function *() {

    yield all([
        watchFetchSpace(),
        watchFetchUserInfo(),
        watchFetchDashboard(),
    ]);
    console.log('run saga');

}