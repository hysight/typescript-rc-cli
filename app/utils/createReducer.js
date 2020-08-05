/**
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-05 17:26:09
 * @Description: 
 */
export default function (initialState, reducerMap) {

    return (state = initialState, action) => {

        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action) : state;
    
    };

}