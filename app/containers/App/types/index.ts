/*
 * @Author: zhangb
 * @Date: 2019-12-11 16:46:57
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:02:21
 * @Description: 
 */
import { Dispatch } from 'redux';

type userInfo = any;

type routes = Array<any>;

type isExpandSiderMenu = boolean;

export interface Props {
    dispatch?: Dispatch;
    userInfo?: userInfo;
    routes?: routes;
    isExpandSiderMenu?: isExpandSiderMenu;
    children?: JSX.Element;
    match?: any;
    location?: any;
}

export interface StateProps {
    app: Props;
}