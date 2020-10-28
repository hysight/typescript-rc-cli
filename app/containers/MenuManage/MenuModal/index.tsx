import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Form, Input, InputNumber, TreeSelect, Select, Checkbox, Radio, Button } from 'antd';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};

const betweenLayout = {
    // wrapperCol: { offset: 6, span: 4 },
};

// 渲染其他form组件
function ToRenderOtherFormItem(props) {
    const { menuType } = props;
    const config = {
        directory: () => {
            return (
                <>
                    <Form.Item
                        label="菜单图标"
                        name="password3"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="路由名称"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="组件路径"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="是否外链"
                        name="password2"
                        initialValue={'directory'}
                    >
                        <Radio.Group>
                            <Radio value="directory">是</Radio>
                            <Radio value="menu">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="路由地址"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="菜单状态"
                        name="password0"
                        initialValue={'directory'}
                    >
                        <Radio.Group>
                            <Radio value="directory">显示</Radio>
                            <Radio value="menu">隐藏</Radio>
                        </Radio.Group>
                    </Form.Item>
                </>
            )
        },
        menu: () => {
            return (
                <>
                    <Form.Item
                        label="菜单图标"
                        name="password3"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="路由名称"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="组件路径"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="是否外链"
                        name="password2"
                        initialValue={'directory'}
                    >
                        <Radio.Group>
                            <Radio value="directory">是</Radio>
                            <Radio value="menu">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="路由地址"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="权限标示"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="菜单状态"
                        name="password0"
                        initialValue={'directory'}
                    >
                        <Radio.Group>
                            <Radio value="directory">显示</Radio>
                            <Radio value="menu">隐藏</Radio>
                        </Radio.Group>
                    </Form.Item>
                </>
            )
        },
        button: () => {
            return (
                <>
                    <Form.Item
                        label="菜单图标"
                        name="password3"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="权限标示"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                </>
            )
        },
        api: () => {
            return (
                <>
                    <Form.Item
                        label="菜单图标"
                        name="password3"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        {...betweenLayout}
                        label="路由地址"
                        name="password3"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="菜单状态"
                        name="password0"
                        initialValue={'directory'}
                    >
                        <Radio.Group>
                            <Radio value="directory">显示</Radio>
                            <Radio value="menu">隐藏</Radio>
                        </Radio.Group>
                    </Form.Item>
                </>
            )
        }
    }
    return config[menuType]();

}

function MenuModal(props, ref) {
    const [visible, setVisible] = useState(false);
    const [menuType, setMenuType] = useState('directory');
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({

        // changeVal 就是暴露给父组件的方法
        toggleModal: () => {
            setVisible(!visible);
        }

    }));

    const handleOk = async () => {

        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }

    }

    const onFinish = values => {

        console.log('Success:', values);

    };

    const onFinishFailed = errorInfo => {

        console.log('Failed:', errorInfo);

    };

    return (
        <Modal
            title='添加菜单'
            visible={visible}
            width={600}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
        >
            <Form
                {...layout}
                form={form}
                name="basic"
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item 
                    label="上级菜单"
                    name="password"
                >
                    <TreeSelect
                        treeData={[
                            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="菜单标题"
                    name="password"
                    rules={[{ required: true, message: '请输入菜单标题!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="显示排序"
                    name="password1"
                    rules={[{ required: true, message: '请输入显示排序!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="菜单类型"
                    name="password2"
                    initialValue={'directory'}
                >
                    <Radio.Group onChange={(e) => setMenuType(e.target.value)}>
                        <Radio value="directory">目录</Radio>
                        <Radio value="menu">菜单</Radio>
                        <Radio value="button">按钮</Radio>
                        <Radio value="api">接口</Radio>
                    </Radio.Group>
                </Form.Item>

                <ToRenderOtherFormItem menuType={menuType} />
            </Form>
        </Modal>
    )
}

export default forwardRef(MenuModal);