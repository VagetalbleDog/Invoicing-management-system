import React, { useEffect } from "react";
import { message, Form, Input, Select, Button } from 'antd'
import Fetch from "../../../utils/fetch";

const fetchOrder = async (id?: number, orderType?: number) => {
    let url = '/api/order?';
    const token = sessionStorage.getItem('key');
    if (id) {
        url += `id=${id}`
    }
    if (orderType) {
        url += `orderType=${orderType}`
    }
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const Search = React.memo(({ flushData }: any) => {
    const resetData = () => {
        fetchOrder().then(res => flushData(res));
    }
    const onSearch = (values: any) => {
        const { id, orderType } = values;
        fetchOrder(id, orderType).then(res => flushData(res));
    }
    return <div style={{ margin: '10px 0' }}>
        <Form layout="inline" onReset={resetData} onValuesChange={onSearch}>
            <Form.Item name='id' label="订单id">
                <Input />
            </Form.Item>
            <Form.Item name='orderType' label="订单类型">
                <Select style={{ width: 100 }} options={[{ value: 1, label: '采购' }, { value: 2, label: "销售" }]} />
            </Form.Item>
            <Button type="default" htmlType="reset">重置</Button>
        </Form>
    </div>
});
export default Search;