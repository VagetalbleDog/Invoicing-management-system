/**
 * 更新用户信息
 */

import { Button, Drawer, Form, Input, message, Radio } from "antd";
import { useState } from "react";
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
const Update = ({ flushData, user }: any) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const update = async (value: any) => {
        const token = sessionStorage.getItem('key');
        if (!token) {
            message.error('用户未登录')
            return false;
        }
        const res = await Fetch(`/api/employee/update/${user.id}`, token, value, 2)
        if (res.code === 400) {
            message.error('此用户名已存在');
            return false;
        }
        message.success('更新成功');
        setOpen(false);
        return true;
    }
    return <>
        <Button disabled={user.userType === 1} type="primary" onClick={showDrawer}>更新信息</Button>
        <Drawer width={600} destroyOnClose={false} title="更新员工信息" open={open} onClose={onClose}>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <Form form={form} onFinish={async (values) => {
                    const updated = await update(values); if (updated) {
                        fetchEmployee().then(res => flushData(res));
                    }
                }}>
                    <Form.Item initialValue={user.name} name="name" label="姓名" rules={[{ required: true, message: '请输入员工姓名' }]}>
                        <Input showCount maxLength={20} style={{ width: "200px" }} />
                    </Form.Item>
                    <Form.Item initialValue={user.username} name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input showCount maxLength={20} style={{ width: "186px" }} />
                    </Form.Item>
                    <Form.Item initialValue={user.sex} required name="sex" label="性别">
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item initialValue={user.userType} required name="userType" label="员工类型">
                        <Radio.Group>
                            <Radio value={2}>采购员</Radio>
                            <Radio value={3}>销售员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Button style={{ position: 'relative', left: '20%' }} type="primary" htmlType="submit">确定</Button>
                    &nbsp;
                    <Button style={{ position: 'relative', left: '40%' }} type="default" onClick={() => { setOpen(false) }}>取消</Button>
                </Form>
            </div>
        </Drawer>
    </>
}
export default Update;