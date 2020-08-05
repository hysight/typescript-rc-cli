/**
 * @Author: zhangb
 * @Date: 2019-12-11 15:51:19
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 16:08:12
 * @Description: 
 */
/**
 * @Author: zhangb
 * @Date: 2019-12-10 16:11:58
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-10 17:57:06
 * @Description: 
 */
import Mock from 'mockjs';

class DashboardController {
    static async getDashboardData(ctx, next) {

        // console.log('<<<<------------>>>>', this, ctx);

        ctx.state = 200;
        ctx.body = Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result|6-20': [{
                'genre': '@cname',
                'sold|200-500': 1,
            }]
        });

    }
}

export default DashboardController;