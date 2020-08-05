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
    fetchUserInfoData: () => void;
}

const Api: ApiProps = {
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