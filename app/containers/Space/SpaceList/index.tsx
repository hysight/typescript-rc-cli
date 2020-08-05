/**
 * @Author: zhangb
 * @Date: 2019-12-09 17:22:14
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:10:50
 * @Description: 
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { List, Card, Modal, Button, Row, Col } from 'antd';

import { FETCH_SPACE_LIST } from 'app/constant/Space';

import './style.scss';

interface Props {
    dispatch: Dispatch;
    history: any;
    itemList: Array<any>;
}

function SpaceList(props: Props): JSX.Element {

    const { dispatch, history, itemList } = props;

    const goHome = (id: string): void => {

        // console.log(props);
        history.push(`/${id}/home`);
        // debugger;
    
    };

    const topColResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 6,
        style: { marginBottom: 24 },
    };

    React.useEffect(() => {

        dispatch({
            type: FETCH_SPACE_LIST,
        });

    }, []);

    return (
        <div className='hm-space-list'>
            <Row gutter={24} style={{width: '100%'}}>
                {
                    itemList && itemList.map(v => 
                        <Col key={v.id} {...topColResponsiveProps} onClick={(): void => goHome(v.id)}>
                            <Card hoverable={true}>
                                <Card.Meta
                                    avatar={
                                        <img width='50' height='50' alt='' src={require('./images/bg-space-list.jpeg')} />
                                    }
                                    title={<a title={'item.spaceName'}>{v.name}</a>}
                                    description={
                                        <div className='card-desc'>
                                            <p className='space-remark' title={'item.remark'}>
                                                标签：{v.remark}
                                            </p>
                                            <div className='card-admin'>
                                                <span className='card-admin-list'>
                                                    管理员：{v.admin}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </div>
    );

}

interface StateProps {
    space: {
        itemList: Array<any>;
    };
}

export default withRouter(connect((state: StateProps) => {

    const {
        space: {
            itemList
        }
    } = state;
    return {
        itemList
    };

})(SpaceList));