/**
 * @Author: zhangb
 * @Date: 2019-12-11 13:53:40
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 14:57:23
 * @Description: 
 */
import React from 'react';

import { Layout, Card } from 'antd';

import DashboardTotal from 'app/containers/Dashboard/DashboardTotal';
import DashBoardEchart from 'app/containers/Dashboard/DashBoardEchart';

import './style.scss';

function Dashboard(): JSX.Element {

    return (
        <Layout className={'hv-dashboard'}>
            <Card
                title={'仪表盘'}
                // extra={'拉萨附近'}
                bordered={false}
            >
                <DashboardTotal />
                <DashBoardEchart />
            </Card>
        </Layout>
    );
    
}

export default Dashboard;