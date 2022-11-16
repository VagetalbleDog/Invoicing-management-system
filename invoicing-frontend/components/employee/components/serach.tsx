import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, InputNumber, message, Select } from 'antd';
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
const Search = React.memo(({ flushData }: any) => {
    const resetData = () => {
        fetchEmployee().then(res => flushData(res));
    }
    const onSearch = (values: any) => {
        const { id, name, username, userType } = values;
        fetchEmployee(id, username, name, userType).then(res => flushData(res));
    }
    return <div style={{ margin: '10px 0' }}>
        <Form layout="inline" onReset={resetData} onValuesChange={onSearch}>
            <Form.Item name='id' label="员工id">
                <InputNumber />
            </Form.Item>
            <Form.Item name='name' label="员工姓名">
                <Input style={{ width: 100 }} />
            </Form.Item>
            <Form.Item name='username' label="员工用户名">
                <Input style={{ width: 100 }} />
            </Form.Item>
            <Form.Item name='userType' label="员工类型">
                <Select style={{ width: 100 }} options={[{ value: 1, label: '管理员' }, { value: 2, label: "采购员" }, { value: 3, label: "销售员" }]} />
            </Form.Item>
            <Button type="default" htmlType="reset">重置</Button>
        </Form>
    </div>
});
export default Search;