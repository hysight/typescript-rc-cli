/*
 * @Author: zhangb
 * @Date: 2019-12-10 18:24:09
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 13:26:44
 * @Description: 
 */
import createReducer from 'app/utils/createReducer';

import {
    // 切换siderMenu状态 - 折叠/展开
    IS_EXPAND_SIDER_MENU_SUCCESS,
    // 获取用户基本信息
    USER_INFO_SUCCESS
} from 'app/constant/App';

export default createReducer(
    {
        isExpandSiderMenu: false,
        userInfo: null,
    },
    {
        [IS_EXPAND_SIDER_MENU_SUCCESS]: (state, action) => {

            const {payload} = action;
            // console.log('当前语音识别返回的action：UNKNOWN', action);
            return Object.assign({}, {...state}, {
                isExpandSiderMenu: payload
            });

        },
        // 获取用户基本信息
        [USER_INFO_SUCCESS]: (state, action) => {

            const {payload} = action;
            // console.log('当前语音识别返回的action：UNKNOWN', action);
            return Object.assign({}, {...state}, {
                userInfo: payload
            });

        }
    }
);