/**
 * @Author: zhangb
 * @Date: 2019-12-11 14:16:30
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:05:10
 * @Description: 
 */
import React from 'react';

import { Row, Col } from 'antd';

import './style.scss';

function DashboardTotal(): JSX.Element {

    const topColResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 6,
        style: { marginBottom: 24 },
    };
    return (
        <Row gutter={24} style={{width: '100%'}}>
            <Col {...topColResponsiveProps}>
                <p>交易总额</p>
                <p>124,543,233元</p>
            </Col>
            <Col {...topColResponsiveProps}>
                <p>销售目标完成率</p>
                <p>92%</p>
            </Col>
            <Col {...topColResponsiveProps}>
                <p>活动时间</p>
                <p>3天</p>
            </Col>
            <Col {...topColResponsiveProps}>
                <p>每秒交易额度</p>
                <p>234元</p>
            </Col>
        </Row>
    );
    
}

export default DashboardTotal;