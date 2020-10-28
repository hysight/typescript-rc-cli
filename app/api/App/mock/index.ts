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
            'data': [
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
                    icon: 'setting',
                    name: '系统管理',
                    // hide: true,
                    // component: Home,
                    children: [
                        {
                            path: '/setting/user',
                            icon: 'user',
                            name: '用户管理',
                            // hide: true,
                            component: 'UserManage',
                        },
                        {
                            path: '/setting/roles',
                            icon: 'user',
                            name: '角色管理',
                            // hide: true,
                            component: 'RoleManage',
                        },
                        {
                            path: '/setting/menu',
                            icon: 'user',
                            name: '菜单管理',
                            // hide: true,
                            component: 'MenuManage',
                        }
                    ]
                },
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