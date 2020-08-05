import Router from 'koa-router';
import DashboardController from './../api/dashboard.controller';

// DashboardRouter
class DashboardRouter {
    static routers(app) {

        const router = new Router();
        router.get('/api/v1/dashboard', DashboardController.getDashboardData);

        app.use(router.routes());

    }
}

export default DashboardRouter;