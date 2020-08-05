/*
 * @Author: zhangb
 * @Date: 2019-12-03 14:04:03
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-10 16:18:30
 * @Description:
 */
import Fetch from '@hysight/fetch';

interface ApiProps {
    fetchSpaceListData: () => void;
}

const Api: ApiProps = {
    /* -----------------------左边侧边栏部分---------------------- */
    // 查询空间列表
    fetchSpaceListData() {

        return Fetch('/api/{version}/spaces')
            .then((res) => res)
            .catch((err) => {

                console.log(err);

            });

    },
};

export default Api;