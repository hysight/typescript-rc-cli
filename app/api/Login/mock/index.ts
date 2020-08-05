/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:08
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:39:03
 * @Description:
 */
import Mock from 'mockjs';

import { transformMockData } from 'app/utils/proxyApiMock';

interface ApiProps {
    fetchLoginData: () => void;
}

const Api: ApiProps = {
    /* -----------------------左边侧边栏部分---------------------- */
    // 登录
    fetchLoginData() {

        return transformMockData(Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result': {
                tokenState: {
                    access_token: '@string(24)'
                }
            }
        }));

    },
};

export default Api;