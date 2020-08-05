/*
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 16:02:09
 * @Description: 
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import undoable from 'redux-undo';

import app from './App';
import space from './Space';
import dashboard from './Dashboard';

// import undoReducer from './undoReducer';

export default (history): any => combineReducers({
    router: connectRouter(history),
    app,
    space,
    dashboard,
    // undoReducer,
    // undoable: undoable(undoReducer),
    //   ... // rest of your reducers
});