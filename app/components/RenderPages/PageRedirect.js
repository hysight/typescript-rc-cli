/**
 *@Author: hy-zhangb
 *Date: 2018/11/2 16:40
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/11/2 16:40
 *Email: lovewinders@163.com
 *File Path: smartsight - PageRedir
 *@File Name: PageRedir
 *@Description: Description
 */
'use strict';
import React from 'react';
import { Redirect } from 'react-router-dom';

const PageRedirect = ({path, redirect, ...rest}) => (
    <Redirect key={path} from={path} to={redirect} {...rest} />
);

export default PageRedirect;
