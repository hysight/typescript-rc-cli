/**
 * @Author: zhangb
 * @Date: 2019-12-09 13:41:40
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 17:19:22
 * @Description: 
 */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import Fetch from '@hysight/fetch';

import Api from 'app/api/Login';

import Base64 from 'app/utils/base64';

import './style.scss';

function Login(props: any): JSX.Element {

    const toLogin = async (data): Promise<any> => {

        // Fetch('/api/{version}/admin/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-Token': '',
        //     },
        //     data
        // })
        //     .then(({ data: {result} }) => {

        //         // debugger;
        //         const {
        //             tokenState: { access_token: token }
        //         } = result;
        //         // 设置token
        //         localStorage.setItem('token', `AUTH_HEADER ${token}`);
        //         Fetch().default.headers['X-Token'] = `AUTH_HEADER ${token}`;

        //         props.history.push('/space');

        //     })
        //     .catch(err => {

        //         console.log(err);

        //     });

        const { data: { code, result } } = await Api.fetchLoginData(data);
        // 判断是否成功
        if (code === 1) {

            const {
                tokenState: { access_token: token }
            } = result;
            // 设置token
            // localStorage.setItem('token', `AUTH_HEADER ${token}`);
            Fetch().default.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhc2NvcGUiOiIiLCJleHAiOjE2MDM0MjkwNjcsImlkZW50aXR5IjoxLCJuaWNlIjoibHV6aGlAbGljYWltb2ZhbmcuY29tIiwib3JpZ19pYXQiOjE2MDM0MjU0NjcsInJvbGVpZCI6MSwicm9sZWtleSI6ImFkbWluIiwicm9sZW5hbWUiOiLns7vnu5_nrqHnkIblkZgifQ.oiilyRiBC51s4xdrk0ccJefsaNtlYPmhtGva7PjfGN4`;

            props.history.push('/space');

        }


    };

    const onFinish = async (values) => {

        console.log('Received values of form: ', values);
        const newValues = Object.assign(
            {},
            { ...values },
            {
                password: Base64.encode(values.password)
            }
        );
        // 执行登录接口校验
        toLogin(newValues);

    };

    return (
        <div className='hv-login'>
            <div className='login-wrap'>
                <div className='login-header'>
                    <img width={44} height={44} className={'company-logo'} src={require('../../../public/images/logo.png')} />
                    <span className={'company-name'}>标题</span>
                </div>
                <div className='login-form'>
                    <Form
                        name="normal_login"
                        // className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                忘记密码？
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                className="login-form-button"
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );

}

export default Login;