/**
 * @Author: zhangb
 * @Date: 2019-12-09 17:53:12
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 10:08:46
 * @Description: 
 */
import Router from 'koa-router';
import UserController from './../api/user.controller';

// UserRouter
class UserRouter {
    static routers(app) {

        const router = new Router();
        router.post('/api/v1/admin/auth/login', UserController.toAuthLogin);
        router.get('/api/v1/admin/info', UserController.getUserInfo);

        app.use(router.routes());

    }
}

export default UserRouter;