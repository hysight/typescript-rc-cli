/**
 * @Author: zhangb
 * @Date: 2019-11-14 11:05:59
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 15:53:18
 * @Description: 
 */
// ROOT ROUTER
import UserRouter from './user.router';
import SpaceRouter from './space.router';
import DashboardRouter from './dashboard.router';

class RootRouter {
    static routes(app) {

        // 用户信息
        UserRouter.routers(app);

        // 空间信息
        SpaceRouter.routers(app);

        // 获取dashboard信息
        DashboardRouter.routers(app);

    }
}

export default RootRouter;