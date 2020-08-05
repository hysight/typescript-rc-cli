/*
 * @Author: zhangb
 * @Date: 2019-12-10 15:22:09
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-10 16:33:37
 * @Description: 
 */
import createReducer from 'app/utils/createReducer';

import {
    // 设置空间列表-reducer
    SPACE_LIST_SUCCESS
} from 'app/constant/Space';

export default createReducer(
    {
        itemList: [],
    }, {
        [SPACE_LIST_SUCCESS]: (state, action) => {

            const {payload} = action;
            return Object.assign({}, {...state}, {
                itemList: payload,
            });
        
        },
    },
);