/*
 * @Author: zhangb
 * @Date: 2019-07-09 10:45:57
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-19 18:45:45
 * @Description:
 */
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';

import createRootReducer from 'app/reducers';
// import undoReducer from 'app/reducers/undoReducer';

import rootSagas from 'app/sagas';

const sagaMiddleWare = createSagaMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: any;
    }
}
interface HotNodeModule extends NodeModule {
    hot: any;
}

export default {

    getInstantiate(initialState, history): any {

        const reducer = createRootReducer(history);

        const instance = compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleWare),
            // (window && (window as any)).devToolsExtension ? (window && (window as any)).devToolsExtension() : f => f
            // window.devToolsExtension ? window.devToolsExtension() : f => f
            // !process.env.NODE_SSR && window.__REDUX_DEVTOOLS_EXTENSION__ 
            //     ? window.__REDUX_DEVTOOLS_EXTENSION__() 
            //     : (f) => f,
                (f) => f,
        );

        const store = createStore(
            enableBatching(reducer),
            // reducer,
            initialState,
            instance,
        );

        // hot replace module
        if ((module as HotNodeModule).hot) {

            (module as HotNodeModule).hot.accept('../views/App/index.tsx', () => {

                store.replaceReducer(createRootReducer(history));
            
            });

        }

        sagaMiddleWare.run(rootSagas);

        console.log('store----', store.getState());
        return store;

    },

};
