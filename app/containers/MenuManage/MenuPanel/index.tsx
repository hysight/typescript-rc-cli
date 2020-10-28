import React, { useRef } from 'react';
import { Form, Card, Row, Col, Select, Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

import MenuModal from '../MenuModal';

const { Option } = Select;

function MenuPanel() {

    const childRef: any = useRef();

    const openModal = () => {

        // changeVal就是子组件暴露给父组件的方法
        childRef.current.toggleModal();

    }
    const [form] = Form.useForm();

    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };

    const onFinish = values => {
        console.log('Finish:', values);
    };

    

    return (
        <React.Fragment>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label='菜单名称'
                    rules={[{ required: false, message: '请输入菜单名称' }]}
                >
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item
                    name="username2"
                    label='状态'
                    rules={[{ required: false, message: '请选择状态!' }]}
                >
                    <Select placeholder="请选择状态">
                        <Option value="china">显示</Option>
                        <Option value="usa">隐藏</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>搜索</Button>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button type='primary' icon={<PlusOutlined />} onClick={openModal}>新增</Button>
                </Form.Item>
            </Form>
            <MenuModal ref={childRef} />
        </React.Fragment>
    )
}

export default MenuPanel;