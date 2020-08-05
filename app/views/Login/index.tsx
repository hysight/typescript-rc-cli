/**
 * @Author: zhangb
 * @Date: 2019-12-09 13:41:40
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 17:19:22
 * @Description: 
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import Fetch from '@hysight/fetch';

import Api from 'app/api/Login';

import Base64 from 'app/utils/base64';

import './style.scss';

const FormItem = Form.Item;

function Login(props: any): JSX.Element {

    const { getFieldDecorator } = props.form;

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

        const {data: {code, result}} = await Api.fetchLoginData(data);
        // 判断是否成功
        if(code === 1) {

            const {
                tokenState: { access_token: token }
            } = result;
            // 设置token
            // localStorage.setItem('token', `AUTH_HEADER ${token}`);
            Fetch().default.headers['X-Token'] = `AUTH_HEADER ${token}`;
        
            props.history.push('/space');
        
        }


    };

    // 校验提交
    const handleSubmit = (e): void => {

        e.preventDefault();
        props.form.validateFields((err, values) => {

            if(!err) {

                const newValues = Object.assign(
                    {},
                    { ...values },
                    {
                        password: Base64.encode(values.password)
                    }
                );
                // 执行登录接口校验
                toLogin(newValues);

            }

        });

    };

    return (
        <div className='hv-login'>
            <div className='login-wrap'>
                <div className='login-header'>
                    <img width={44} height={44} className={'company-logo'} src={require('./images/logo.png')} />
                    <span className={'company-name'}>标题</span>
                </div>
                <div className='login-form'>
                    <Form onSubmit={handleSubmit} style={{ maxWidth: '543px' }}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                <Input
                                    prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                                    placeholder='用户名'
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入6-200位的密码!',
                                        pattern: /^\w{6,200}$/
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                                    type='password'
                                    placeholder='密码'
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Checkbox>记住我</Checkbox>)}
                            <a className='login-form-forgot' href='' style={{float: 'right'}} onClick={() => alert(1)}>忘记密码</a>
                            <div>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    style={{ width: '45%' }}
                                >
                                        普通登录
                                </Button>
                                <Button
                                    type='primary'
                                    // htmlType='submit'
                                    className='login-form-button'
                                    style={{ width: '45%', marginLeft: '10%' }}
                                >
                                        证书登录
                                </Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    );

}

export default Form.create()(withRouter(Login));