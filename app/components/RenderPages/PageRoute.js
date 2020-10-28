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

import loadable from '@loadable/component'
import Loading from 'app/components/Loading';

import RenderPages from './index';


// 固定路由先变量缓存
// const Login = loadable( 
//     () => import(/* webpackChunkName: "Login" */ 'app/views/Login'), 
//     {
//         fallback: <Loading />
//     }
// );

// const Space = loadable(
//     () => import(/* webpackChunkName: "Space" */ 'app/views/Space'), 
//     {
//         fallback: <Loading />
//     }
// );

// const App = loadable(
//     () => import(/* webpackChunkName: "App" */ 'app/containers/App'), 
//     {
//         fallback: <Loading />
//     }
// );

// const Authorized = loadable(
//     () => import(/* webpackChunkName: "Authorized" */ 'app/containers/App/Authorized'), 
//     {
//         fallback: <Loading />
//     }
// );

// const Home = loadable(
//     () => import(/* webpackChunkName: "Home" */ 'app/views/Home'), 
//     {
//         fallback: <Loading />
//     }
// );

// const Dashboard = loadable(
//     () => import(/* webpackChunkName: "Dashboard" */ 'app/views/Dashboard'), 
//     {
//         fallback: <Loading />
//     }
// );

// const UserManage = loadable(
//     () => import(/* webpackChunkName: "UserManage" */ 'app/views/UserManage'), 
//     {
//         fallback: <Loading />
//     }
// );

// const RoleManage = loadable(
//     () => import(/* webpackChunkName: "RoleManage" */ 'app/views/RoleManage'), 
//     {
//         fallback: <Loading />
//     }
// );

// const MenuManage = loadable(
//     () => import(/* webpackChunkName: "MenuManage" */ 'app/views/MenuManage'), 
//     {
//         fallback: <Loading />
//     }
// );

// const Exception404 = loadable(
//     () => import(/* webpackChunkName: "Exception404" */ 'app/views/Exception404'), 
//     {
//         fallback: <Loading />
//     }
// );

const PageRoute = ({path, component: Comp, model, Routes = React.Fragment, routes, ...rest}) => (
    <Route
        key={path}
        path={path}
        {...rest}
        render={props => {

            if(Array.isArray(routes) && routes.length) {
                
                if(!Comp) {
                    return (
                        <Routes>
                            <RenderPages routes={routes} />
                        </Routes>
                    )
                }
                return (
                    <Comp routes={routes}>
                        <Routes>
                            <RenderPages routes={routes} />
                        </Routes>
                    </Comp>
                )
            }

            if(Comp) return <Comp />;
        }}
    />
);

export default PageRoute;