/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:03
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:39:38
 * @Description:
 */
import Fetch from '@hysight/fetch';

interface ApiProps {
    fetchLoginData: (data) => Promise<any>;
}

const Api: ApiProps = {
    /* -----------------------左边侧边栏部分---------------------- */
    // 登录
    fetchLoginData(data) {

        return Fetch('/api/{version}/admin/auth/login', {
            method: 'POST',
            data
        })
            .then((res) => res)
            .catch((err) => {

                console.log(err);

            });

    },
};

export default Api;