/**
 *@Author: hy-zhangb
 *Date: 2018/11/2 16:36
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/2 16:36
 *Email: lovewinders@163.com
 *File Path: smartsight - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PageRoutes from './PageRoutes';

// RenderPages
class RenderPages extends Component {
    static propTypes = {
        routes: PropTypes.array,
        model: PropTypes.string
    };
    render() {

        const {routes, model} = this.props;
        return (
            <Switch>
                {routes && routes.map((route, i) => <PageRoutes key={route.path + i} model={model} {...route} />)}
            </Switch>
        );

    }
}

export default RenderPages;