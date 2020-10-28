import React from 'react';
import { withRouter, Link, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import pathToRegexp from 'path-to-regexp';

import { StateProps, Props } from 'app/containers/App/types';

import reducers, { initialState } from 'app/reducers/App/index';

// component

// containers

// css
import './style.scss';

const allIcons: {
    [key: string]: any;
} = Icon;

function ToRenderIcon(props): JSX.Element {

    const { icon } = props;
    const reg = /^icon\-.*/g;
    if(icon && reg.test(icon)) {

        return <i className={`item-icon ${icon}`} style={{ marginRight: 10 }} />;
        // return <i className={`anticon ${icon}`} />;

    }
    const IconComp = allIcons[icon] || allIcons['GroupOutlined'];

    return <IconComp />;

};

const getFlatMenuKeys = (menus: Array<any> = []): Array<any> => {

    return menus.reduce(
        (pre, { path, routes }) => pre.concat(path).concat(routes ? getFlatMenuKeys(routes) : []),
        []
    );

};

const urlToList = (url: string): Array<string> => {

    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);

};

const getMenuMatches = (flatMenuKeys, path): Array<string> => {

    return flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));

};

function SiderBase(props: Props): JSX.Element {

    const [state] = React.useReducer(reducers, initialState);
    const {isExpandSiderMenu} = state;

    const { routes} = props;
    const [flatMenuKeys] = React.useState([...new Set(getFlatMenuKeys(routes as any))]);

    
    const getSelectedMenuKeys = (): Array<string> => {

        const {pathname} = useLocation();
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());

    };
    

    const toRenderSubMenu = (): JSX.Element => {

        const {
            routes: rootRoutes,
        } = props;
        debugger

        const {wId} = useParams();

        const loop = (data, level = 0): JSX.Element => {

            return (
                data &&
                // eslint-disable-next-line complexity
                data.map((v, i) => {

                    const { name, path, icon, routes, hide, redirect, authority } = v;

                    // hide
                    if(hide || redirect || !path) return null;
                    // return null;

                    if(routes && Array.isArray(routes)) {

                        // routes
                        return (
                            <Menu.SubMenu
                                key={path}
                                title={
                                    <span>
                                        <ToRenderIcon icon={'icon'} />
                                        <span className={'nav-text'}>{name}</span>
                                    </span>
                                }
                            >
                                {loop(routes, level + 1)}
                            </Menu.SubMenu>
                        );

                    }

                    return (
                        <Menu.Item key={path}>
                            {path ? (
                                <Link to={pathToRegexp.compile(path)({ wId })}>
                                    <ToRenderIcon icon={icon} />
                                    <span className='nav-text'>{name}</span>
                                </Link>
                            ) : (
                                <span>
                                    <ToRenderIcon icon={icon} />
                                    <span className='nav-text'>{name}</span>
                                </span>
                            )}
                        </Menu.Item>
                    );

                })
            );

        };

        return loop(rootRoutes);

    };

    const selectedKeys = getSelectedMenuKeys();
    return (
        <Menu
            className={'hm-sider-base'}
            theme='dark'
            // mode={collapsed ? 'vertical' : 'inline'}
            mode={isExpandSiderMenu ? 'vertical' : 'inline'}
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={['sub1']}
            selectedKeys={selectedKeys}
            // style={{ borderRight: 0, overflowX: 'hidden' }}
        >
            {toRenderSubMenu()}
        </Menu>
    ); 

}

export default SiderBase;