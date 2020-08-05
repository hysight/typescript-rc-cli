/**
 * @Author: zhangb
 * @Date: 2019-12-10 16:11:58
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:44:10
 * @Description: 
 */
import Mock from 'mockjs';

class SpaceController {
    static async getSpaceListData(ctx, next) {

        // console.log('<<<<------------>>>>', this, ctx);

        ctx.state = 200;
        ctx.body = Mock.mock({
            'code': 1,
            'msg': 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'result|6-20': [{
                'id|+1': 1,
                'name': '@ctitle(3, 5)',
                'remark': '标签1',
                'admin': '@cname'
            }]
        });

    }
}

export default SpaceController;