import React, { useEffect } from "react";
import { message, Form, Input, Select, Button, InputNumber } from 'antd'
import Fetch from "../../../utils/fetch";
enum ShopType {
    '生活用品' = 1,
    '数码产品' = 2,
    '食品' = 3,
    '衣帽鞋类' = 4,
    '体育用品' = 5
}
const fetchShop = async (id?: number, shopName?: string, shopType?: ShopType) => {
    let url = '/api/shop?';
    const token = sessionStorage.getItem('key');
    if (id) {
        url += `id=${id}&`
    }
    if (shopName) {
        url += `shopName=${shopName}&`
    }
    if (shopType) {
        url += `shopType=${shopType}`
    }
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const Search = React.memo(({ flushData }: any) => {
    const resetData = () => {
        fetchShop().then(res => flushData(res));
    }
    const onSearch = (values: any) => {
        const { id, shopName, shopType } = values;
        fetchShop(id, shopName, shopType).then(res => flushData(res));
    }
    return <div style={{ margin: '10px 0' }}>
        <Form layout="inline" onReset={resetData} onValuesChange={onSearch}>
            <Form.Item name='id' label="商品id">
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name='shopName' label="商品名称">
                <Input />
            </Form.Item>
            <Form.Item name='shopType' label="商品类型">
                <Select style={{ width: 100 }}
                    options={[
                        { value: 1, label: '生活用品' },
                        { value: 2, label: "数码产品" },
                        { value: 3, label: "食品" },
                        { value: 4, label: '衣帽鞋类' },
                        { value: 5, label: '体育用品' }
                    ]} />
            </Form.Item>
            <Button type="default" htmlType="reset">重置</Button>
        </Form>
    </div>
});
export default Search;