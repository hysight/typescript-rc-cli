/**
 * @Author: zhangb
 * @Date: 2019-12-19 15:38:02
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 16:56:33
 * @Description: 
 */
import React from 'react';

// css
import 'app/styles/reset.scss';
import 'app/styles/index.scss';
import './style.scss';

// components
import RenderPages from 'app/components/RenderPages';

// rootRoutes
import rootRoutes from 'app/config/routes.config';

function Routes() {
    return (
        <RenderPages routes={rootRoutes} />
    )
}

export default Routes;