/**
 * @Author: zhangb
 * @Date: 2019-12-09 13:59:48
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:00:40
 * @Description: 
 */
import React from 'react';
// import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { StateProps, Props } from 'app/containers/App/types';

// containers
import SiderPanel from './SiderPanel';
import SiderBase from './SiderBase';

// css
import './style.scss';

const { Sider } = Layout;

function SiderMenu(props: Props): JSX.Element {

    const { isExpandSiderMenu } = props;
    return (
        <Sider
            width={256}
            trigger={null}
            collapsible={true}
            collapsed={isExpandSiderMenu}
            className={'hc-sider-menu'}
        >
            <SiderPanel {...props} />
            <SiderBase {...props} />
        </Sider>
    );
    
}

export default connect((state: StateProps) => {

    const {
        app: {
            isExpandSiderMenu
        }
    } = state;
    return {
        isExpandSiderMenu
    };

})(SiderMenu);