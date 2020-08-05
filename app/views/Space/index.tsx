/**
 * @Author: zhangb
 * @Date: 2019-12-09 14:48:26
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 14:19:38
 * @Description: 
 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';

// components
import Header from 'app/components/Header';

// containers
import SpacePanel from 'app/containers/Space/SpacePanel';
import SpaceList from 'app/containers/Space/SpaceList';

// const { SubMenu } = Menu;
const { Content } = Layout;

function Space(props): JSX.Element {

    return (
        <Layout>
            <Header />
            <Content style={{ margin: '0 0 24px 24px', minHeight: '280px' }}>
                <SpacePanel />
                <SpaceList />
            </Content>
        </Layout>
    );

}

export default Space;