/**
 * @Author: zhangb
 * @Date: 2019-12-09 13:59:57
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:03:49
 * @Description: 
 */
import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { StateProps, Props } from 'app/containers/App/types';

// component

// containers

import {
    IS_EXPAND_SIDER_MENU_SUCCESS
} from 'app/constant/App';

// css
import './style.scss';

function SiderMenuIcon(props: Props): JSX.Element {

    const { dispatch, isExpandSiderMenu } = props;
    
    const toggleStatus = (): void => {

        dispatch({
            type: IS_EXPAND_SIDER_MENU_SUCCESS,
            payload: !isExpandSiderMenu
        });

    };

    return (
        <Icon
            className='hm-sider-menu-icon'
            type={isExpandSiderMenu ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleStatus}
        />
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

})(SiderMenuIcon);