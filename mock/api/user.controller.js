/**
 * @Author: zhangb
 * @Date: 2019-12-09 17:53:28
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 10:11:48
 * @Description: 
 */
import Mock from 'mockjs';

class UserController {
    static async toAuthLogin(ctx, next) {

        // console.log('<<<<------------>>>>', this, ctx);

        ctx.state = 200;
        ctx.body = Mock.mock({
            code: 1,
            msg: 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            result: {
                tokenState: {
                    access_token: '@string(24)'
                }
            }
        });

    };
    static async getUserInfo(ctx, next) {

        ctx.state = 200;
        ctx.body = Mock.mock({
            code: 1,
            msg: 'success',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            result: {
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
            }
        });
        
    }
}

export default UserController;