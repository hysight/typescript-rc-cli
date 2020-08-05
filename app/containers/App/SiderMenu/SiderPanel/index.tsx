/**
 * @Author: zhangb
 * @Date: 2019-12-09 13:59:48
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 11:14:56
 * @Description: 
 */
import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// component

// containers

// css
import './style.scss';

function SiderPanel(props): JSX.Element {

    return (
        <div className={'hm-sider-panel'}>
            <Link to={'/space'}>
                <img width={40} height={40} src={require('./images/logo.png')} />
                <h1>技术线研发中心</h1>
                {/* <p>
                    <span>{document.title}</span>
                </p> */}
            </Link>
        </div>
    );

}

export default SiderPanel;