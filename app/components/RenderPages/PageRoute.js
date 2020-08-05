/**
 *@Author: hy-zhangb
 *Date: 2018/11/2 16:43
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-20 09:46:52
 *Email: lovewinders@163.com
 *File Path: smartsight - PageRoute
 *@File Name: PageRoute
 *@Description: Description
 */
'use strict';
import React from 'react';
import { Route } from 'react-router-dom';

// import routes from 'app/config/routes.config';
import RenderPages from './index';

const PageRoute = ({path, component: Comp, model, Routes, routes, ...rest}) => (
    <Route
        key={path}
        path={path}
        {...rest}
        render={props =>
            routes
                ? <Comp {...props} model={model} routes={routes}>
                    {
                        Routes
                            ? <Routes><RenderPages model={model} routes={routes} /></Routes>
                            : <RenderPages model={model} routes={routes} />
                    }
                </Comp>
                : <Comp {...props} model={model} />}
    />
);

export default PageRoute;