/**
 * @Author: zhangb
 * @Date: 2019-12-09 15:31:58
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:20:28
 * @Description: 
 */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { QuestionCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import './style.scss';

const { SubMenu } = Menu;
const { Header: AntHeader } = Layout;

function Header(props): JSX.Element {

    return (
        <AntHeader style={{ background: '#fff', padding: 0 }}>
            <div className='hc-header'>
                <div className='header-logo'>
                    <Link to={'/'} >
                        <img width={40} height={40} src={require('../../../public/images/logo.png')} />
                        <h1>后台管理系统</h1>
                        {/* <img width={32} height={32} src={require('./images/logo-bk.png')} />
                        <h1>扬州警务大数据-可视化分析平台</h1> */}
                    </Link>
                </div>
                <div className='header-panel'>
                    <NavLink to={'/help'} target='blank' style={{ color: '#53585f' }} title={'帮助中心'}>
                        <QuestionCircleOutlined />
                    </NavLink>
                    <Menu
                        mode='horizontal'
                        style={{ lineHeight: '64px', background: 'none', display: 'inline-block' }}
                    >
                        <SubMenu
                            title={
                                <span>
                                    <UserOutlined />
                                    admin
                                </span>
                            }
                        >
                            <Menu.Item key='user-center'>
                                <NavLink to={'/user'} target='blank'>
                                    <SettingOutlined /> 个人中心
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key='logout'>
                                <Link to='/login'><UserOutlined />退出登录</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </AntHeader>
    );

}

export default Header;