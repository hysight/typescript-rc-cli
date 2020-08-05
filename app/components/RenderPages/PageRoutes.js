/**
 *@Author: hy-zhangb
 *Date: 2018/11/2 16:38
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/2 16:38
 *Email: lovewinders@163.com
 *File Path: smartsight - PageRoutes
 *@File Name: PageRoutes
 *@Description: Description
 */
'use strict';
import React from 'react';

// components
import PageRoute from './PageRoute';
import PageRedirect from './PageRedirect';

const PageRoutes = ({redirect, ...rest}) => (
    redirect ? <PageRedirect redirect={redirect} {...rest} /> : <PageRoute {...rest} />
);

export default PageRoutes;
