/**
 * @Author: zhangb
 * @Date: 2019-12-20 09:41:38
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-20 17:52:46
 * @Description: 
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import loadable from '@loadable/component'

// components
import Loading from 'app/components/Loading';

// components
const A = loadable(() => import(/* webpackChunkName: "A" */ './A'), 
    {
        fallback: <Loading />
    }
);

const B = loadable(() => import(/* webpackChunkName: "B" */ './B'), 
    {
        fallback: <Loading />
    }
);

function Routes() {
    return (
        <div>
            <Helmet>
                <title>App</title>
            </Helmet>
            12313123
            <Route path="/" render={() => <A />} />
            <Switch>
                <Route path='/' exact render={() => <A />} />
                <Route path='/login' render={() => <A />} />
                <Route path='/b' render={() => <B />} />
            </Switch>
        </div>
    )
}

export default Routes;