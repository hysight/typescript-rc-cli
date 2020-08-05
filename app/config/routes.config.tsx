/*
 * @Author: zhangb
 * @Date: 2019-12-09 13:33:56
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-17 16:07:19
 * @Description: 
 */
import React from 'react';
import loadable from '@loadable/component'

// components
import Loading from 'app/components/Loading';

// import(/* webpackChunkName: "A" */ './A'),
const Login = loadable( 
    () => import(/* webpackChunkName: "Login" */ 'app/views/Login'), 
    {
        fallback: <Loading />
    }
);

const Space = loadable(
    () => import(/* webpackChunkName: "Space" */ 'app/views/Space'), 
    {
        fallback: <Loading />
    }
);

const App = loadable(
    () => import(/* webpackChunkName: "App" */ 'app/containers/App'), 
    {
        fallback: <Loading />
    }
);

const Authorized = loadable(
    () => import(/* webpackChunkName: "Authorized" */ 'app/containers/App/Authorized'), 
    {
        fallback: <Loading />
    }
);

const Home = loadable(
    () => import(/* webpackChunkName: "Home" */ 'app/views/Home'), 
    {
        fallback: <Loading />
    }
);

const Dashboard = loadable(
    () => import(/* webpackChunkName: "Dashboard" */ 'app/views/Dashboard'), 
    {
        fallback: <Loading />
    }
);

// 页面路由配置项
export default [
    {
        path: '/',
        redirect: '/login',
        exact: true,
        strict: true,
        model: 'LOGIN'
    },
    // login
    {
        path: '/login',
        component: Login,
    },
    // space
    {
        path: '/space',
        component: Space,
    },
    // app
    {
        path: '/:wId',
        icon: 'bars',
        name: '首页',
        component: App,
        Routes: Authorized,
        routes: [
            {
                path: '/:wId/home',
                icon: 'bars',
                name: '空间入口',
                hideInMenu: true,
                component: Home,
                model: 'HOME'
            },
            {
                path: '/:wId/dashboard',
                icon: 'bars',
                name: 'Dashboard',
                // hideInMenu: true,
                component: Dashboard,
                model: 'DASHBOARD'
            },
            {
                path: '/:wId/table',
                icon: 'bars',
                name: '表单页',
                // hideInMenu: true,
                component: Home,
                model: 'TABLE'
            },
        ]
    }
];