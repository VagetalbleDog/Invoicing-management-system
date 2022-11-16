/**
 * 注册新用户
 */

import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import Fetch from "../../../utils/fetch";
const fetchEmployee = async (id?: number, username?: string, name?: string, userType?: number) => {
    let url = `/api/employee?`;
    const token = sessionStorage.getItem('key');
    if (id) {
        url += `id=${id}&`
    }
    if (username) {
        url += `username=${username}&`
    }
    if (name) {
        url += `name=${name}&`
    }
    if (userType) {
        url += `userType=${userType}&`
    }
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const Register = ({ flushData }: any) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const register = async (value: any) => {
        const token = sessionStorage.getItem('key');
        if (!token) {
            message.error('用户未登录')
            return false;
        }
        const res = await Fetch('/api/employee/register', token, value, 2)
        if (res.code === 400) {
            message.error('此用户名已存在');
            return false;
        }
        message.success('创建成功');
        form.resetFields()
        setOpen(false);
        return true;
    }
    return <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>新用户</Button>
        <Drawer width={600} destroyOnClose={false} title="创建一个新员工账号" open={open} onClose={onClose}>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <Form form={form} onFinish={async (values) => {
                    const registerd = await register(values); if (registerd) {
                        fetchEmployee().then(res => flushData(res));
                    }
                }}>
                    <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入员工姓名' }]}>
                        <Input showCount maxLength={20} style={{ width: "200px" }} />
                    </Form.Item>
                    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input showCount maxLength={20} style={{ width: "186px" }} />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: '密码必须为9-16位' }]}>
                        <Input type="password" showCount minLength={9} maxLength={16} style={{ width: "200px" }} />
                    </Form.Item>
                    <Form.Item name="cnfirm_pw" required label="确认密码" rules={[({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('两次密码输入不一致')
                        }
                    })]}>
                        <Input placeholder="请确认密码" type="password" showCount minLength={9} maxLength={16} style={{ width: "172px" }} />
                    </Form.Item>
                    <Form.Item required name="sex" label="性别">
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item required name="userType" label="员工类型">
                        <Radio.Group>
                            <Radio value={2}>采购员</Radio>
                            <Radio value={3}>销售员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button style={{ position: 'relative', left: '20%' }} type="primary" htmlType="submit">确定</Button>
                    &nbsp;
                    <Button style={{ position: 'relative', left: '40%' }} type="default" htmlType="reset">重置</Button>
                </Form>
            </div>
        </Drawer>
    </>
}
export default Register;