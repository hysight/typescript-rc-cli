/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:08
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 13:32:07
 * @Description:
 */
import Mock from 'mockjs';

import { transformMockData } from 'app/utils/proxyApiMock';

interface ApiProps {
    fetchUserMenuTree: () => void;
    fetchUserInfoData: () => void;
}

const Api: ApiProps = {
    // 查询tree组件权限
    fetchUserMenuTree() {

        return transformMockData(Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result': [
                {
                    path: '/', // 必填
                    redirect: '/login', // 扩展
                    exact: true, // 扩展
                    strict: true, // 扩展
                    //
                    menuId: 0, // 必填
                    menuName: '', // 必填
                    title: '', // 选填
                    icon: '', // 必填
                    menuType: '', // 选填
                    parentId: 0, // 必填
                    // component: '', // 选填
                    sort: 0, // 必填
                    visible: '0', // 是否显隐菜单
                    createBy: '', // 创建人
                    updateBy: '', // 修改人
                    roleId: '', // 角色
                    routes: [] // Array<Object> 子菜单集合
                },
                // login
                {
                    path: '/login',
                    component: 'Login',
                },
                // space
                {
                    path: '/space',
                    component: 'Space',
                },
                // app
                {
                    path: '/',
                    icon: 'bars',
                    name: '首页',
                    component: 'App',
                    Routes: 'Authorized',
                    children: [
                        {
                            path: '/home',
                            icon: 'bars',
                            name: '空间入口',
                            hide: true,
                            component: 'Home',
                        },
                        {
                            path: '/dashboard',
                            icon: 'bars',
                            name: 'Dashboard',
                            // hide: true,
                            component: 'Dashboard',
                        },
                        {
                            path: '/table',
                            icon: 'bars',
                            name: '表单页',
                            // hide: true,
                            component: 'Home',
                        },
                        {
                            path: '/setting',
                            icon: 'WechatOutlined',
                            name: '系统管理',
                            // hide: true,
                            // component: Home,
                            children: [
                                {
                                    path: '/setting/user',
                                    icon: 'user',
                                    name: '用户管理',
                                    // hide: true,
                                    component: 'RoleManage',
                                },
                                {
                                    path: '/setting/roles',
                                    icon: 'user',
                                    name: '角色管理',
                                    // hide: true,
                                    component: 'UserManage',
                                },
                                {
                                    path: '/setting/menu',
                                    icon: 'user',
                                    name: '菜单管理',
                                    // hide: true,
                                    component: 'MenuManage',
                                },
                                // {
                                //     path: '*',
                                //     component: 'Exception404'
                                // }
                            ]
                        },
                    ]
                },
                // {
                //     path: '*',
                //     component: 'Exception404'
                // }
            ]
        }));

    },
    // 查询用户基本信息
    fetchUserInfoData() {

        return transformMockData(Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result': [{
                adminLock: 0,
                id: '@id',
                nickName: '@cname',
                phone: '135012345678',
                roleModels: [
                    {
                        operationList: ['LOOK', 'TEMPLATE_COMMENT', 'TEMPLATE_PUSH', 'TEMPLATE_APPLICATION'],
                        resourcefulState: 'DEFAULT',
                        serviceModel: 'DASHBOARD',
                        serviceModelMenu: ['DEFAULT']
                    }
                ]
            }]
        }));

    },
};

export default Api;