/**
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-03 16:07:35
 * @Description: 
 */
import Router from 'koa-router';
import EditController from './../api/map.controller';

//
class MapRouter {
    static routers(app) {

        const router = new Router();
        router.get('/hymodel/data/dataset/usertree', EditController.getDataConnection);
        router.get('/hymodel/analysis/operators', EditController.getDsTables);

        app.use(router.routes());

    }
}

export default MapRouter;
