/**
 * @Author: zhangb
 * @Date: 2019-12-19 15:38:02
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 16:56:33
 * @Description: 
 */
import React from 'react';

import Fetch from '@hysight/fetch';
import Api from 'app/api/App';

import { replaceTreeComp, replaceTreeChildKey } from 'app/utils/replaceTreeComp';

// css
import 'app/styles/reset.scss';
import 'app/styles/index.scss';
import './style.scss';

// components
import RenderPages from 'app/components/RenderPages';

// rootRoutes
import rootRoutesConfig, { compConfig } from 'app/config/routes.config';

const rootRoutes = replaceTreeChildKey(rootRoutesConfig);

function Routes() {
    const [menuTree, setMenuTree] = React.useState([]);

    const toRoutes = async (): Promise<any> => {

        setMenuTree(rootRoutes);

        const {data: {code, data}} = await Api.fetchUserMenuTree();
        
        // 判断是否成功
        if(code === 1) {

            //
            const globleMenuTree = rootRoutes.map(v => {
                if(v.path === '/') {
                    return Object.assign({}, {...v}, {
                        routes: replaceTreeComp(replaceTreeChildKey(data), compConfig)
                    })
                }
                return v;
            });
            setMenuTree(globleMenuTree);
        
        }


    };

    React.useEffect(() => {
        //
        toRoutes();

    }, []);

    return (
        <RenderPages routes={menuTree} />
    )
}

export default Routes;