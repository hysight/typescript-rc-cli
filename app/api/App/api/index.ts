/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:03
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 13:31:57
 * @Description:
 */
import Fetch from '@hysight/fetch';

interface ApiProps {
    fetchUserInfoData: () => void;
}

const Api: ApiProps = {
    // 查询用户基本信息
    fetchUserInfoData() {

        return Fetch('/api/{version}/admin/info')
            .then((res) => res)
            .catch((err) => {

                console.log(err);

            });

    },
};

export default Api;