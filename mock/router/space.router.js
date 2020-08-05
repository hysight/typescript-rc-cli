/**
 * @Author: zhangb
 * @Date: 2019-12-10 16:11:39
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-10 16:13:39
 * @Description: 
 */
import Router from 'koa-router';
import SpaceController from './../api/space.controller';

// SpaceRouter
class SpaceRouter {
    static routers(app) {

        const router = new Router();
        router.get('/api/v1/spaces', SpaceController.getSpaceListData);

        app.use(router.routes());

    }
}

export default SpaceRouter;