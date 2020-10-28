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

const UserManage = loadable(
    () => import(/* webpackChunkName: "UserManage" */ 'app/views/UserManage'), 
    {
        fallback: <Loading />
    }
);

const RoleManage = loadable(
    () => import(/* webpackChunkName: "RoleManage" */ 'app/views/RoleManage'), 
    {
        fallback: <Loading />
    }
);

const MenuManage = loadable(
    () => import(/* webpackChunkName: "MenuManage" */ 'app/views/MenuManage'), 
    {
        fallback: <Loading />
    }
);

export const compConfig = {
    Home,
    Dashboard,
    UserManage,
    RoleManage,
    MenuManage
}

// 页面路由配置项
export default [
    {
        path: '/', // 必填
        redirect: '/login', // 扩展
        exact: true, // 扩展
        strict: true, // 扩展
        //
        id: 0, // 必填
        name: '', // 必填
        title: '', // 选填
        icon: '', // 必填
        type: '', // 选填
        parentId: 0, // 必填
        component: '', // 选填
        sort: 0, // 必填
        hide: false, // 是否显隐菜单
        createBy: '', // 创建人
        updateBy: '', // 修改人
        roleId: '', // 角色
        routes: [] // Array<Object> 子菜单集合
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
        path: '/',
        icon: 'bars',
        name: '首页',
        component: App,
        Routes: Authorized,
        children: [
            // {
            //     path: '/home',
            //     icon: 'bars',
            //     name: '空间入口',
            //     hide: true,
            //     component: Home,
            // },
            // {
            //     path: '/dashboard',
            //     icon: 'bars',
            //     name: 'Dashboard',
            //     // hide: true,
            //     component: Dashboard,
            // },
            // {
            //     path: '/table',
            //     icon: 'bars',
            //     name: '表单页',
            //     // hide: true,
            //     component: Home,
            // },
            // {
            //     path: '/setting',
            //     icon: 'setting',
            //     name: '系统管理',
            //     // hide: true,
            //     // component: Home,
            //     children: [
            //         {
            //             path: '/setting/user',
            //             icon: 'user',
            //             name: '用户管理',
            //             // hide: true,
            //             component: UserManage,
            //         },
            //         {
            //             path: '/setting/roles',
            //             icon: 'user',
            //             name: '角色管理',
            //             // hide: true,
            //             component: RoleManage,
            //         },
            //         {
            //             path: '/setting/menu',
            //             icon: 'user',
            //             name: '菜单管理',
            //             // hide: true,
            //             component: MenuManage,
            //         }
            //     ]
            // },
        ]
    }
];