import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

import { StateProps, Props } from 'app/containers/App/types';

// component

// containers

// css
import './style.scss';

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
    
    const { isExpandSiderMenu, routes } = props;
    const [flatMenuKeys] = React.useState([...new Set(getFlatMenuKeys(routes))]);

    
    const getSelectedMenuKeys = (): Array<string> => {

        const {
            location: { pathname }
        } = props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());

    };
    const toRenderIcon = (icon: string): JSX.Element => {

        const reg = /^icon\-.*/g;
        if(icon && reg.test(icon)) {

            return <i className={`item-icon ${icon}`} style={{ marginRight: 10 }} />;
            // return <i className={`anticon ${icon}`} />;

        }
        return <Icon type={icon || 'bars'} />;

    };

    const toRenderSubMenu = (): JSX.Element => {

        const {
            routes: rootRoutes,
            match: {
                params: { wId }
            }
        } = props;

        const loop = (data, level = 0): JSX.Element => {

            return (
                data &&
                // eslint-disable-next-line complexity
                data.map((v, i) => {

                    const { name, path, model, icon, routes, hideChildrenInMenu, hideInMenu, redirect, authority } = v;

                    // hide
                    if(hideInMenu || redirect || !path) return null;

                    if(!hideChildrenInMenu && routes && Array.isArray(routes)) {

                        // routes
                        return (
                            <Menu.SubMenu
                                key={path}
                                title={
                                    <span>
                                        {toRenderIcon(icon)}
                                        {<span className={'nav-text'}>{name}</span>}
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
                                    {toRenderIcon(icon)}
                                    <span className='nav-text'>{name}</span>
                                </Link>
                            ) : (
                                <span>
                                    {toRenderIcon(icon)}
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

export default connect((state: StateProps) => {

    const {
        app: {
            isExpandSiderMenu
        }
    } = state;
    return {
        isExpandSiderMenu
    };

})(withRouter(SiderBase));