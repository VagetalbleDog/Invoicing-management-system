import React, { useEffect } from "react";
import { message, Form, Input, Select, Button, InputNumber } from 'antd'
import Fetch from "../../../utils/fetch";
const fetchSupplier = async (id?: number, supplierName?: string) => {
    let url = `/api/supplier?`;
    const token = sessionStorage.getItem('key');
    if (id) { url += `id=${id}&` };
    if (supplierName) { url += `supplierName=${supplierName}` }
    if (!token) {
        message.error('您还未登录');
        return;
    }
    return Fetch(url, token)
}
const Search = React.memo(({ flushData }: any) => {
    const resetData = () => {
        fetchSupplier().then(res => flushData(res));
    }
    const onSearch = (values: any) => {
        const { id, supplierName } = values;
        fetchSupplier(id, supplierName).then(res => flushData(res));
    }
    return <div style={{ margin: '10px 0' }}>
        <Form layout="inline" onReset={resetData} onValuesChange={onSearch}>
            <Form.Item name='id' label="供应商id">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name='supplierName' label="供应商名称">
                <Input />
            </Form.Item>
            <Button type="default" htmlType="reset">重置</Button>
        </Form>
    </div>
});
export default Search;