import { Button, message, Popconfirm, Table, Tag, notification, Modal, InputNumber, Form } from "antd";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import Fetch from "../../utils/fetch";
import styles from './index.module.css';
import Search from "./components/search";
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
const Color = ['pink', 'green', 'yellow', 'blue', 'cyan']
const Shop: React.FC = React.memo(() => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [shopId, setShopId] = useState(0);
    const [form] = Form.useForm();
    const [showPurchase, setShowPurchase] = useState(false);
    const sale = useCallback(async (shopId: number | string, num: number | string) => {
        const token = sessionStorage.getItem('key');
        const employeeId = sessionStorage.getItem('id');
        if (!token || !employeeId) {
            message.error('您还未登录')
            return;
        }
        if (!num) {
            num = 0;
        }
        return Fetch(`/api/shop/sale`, token, {
            shopId, employeeId, num
        }, 2).then(res => {
            if (res.code && res.code === '400') {
                notification['error']({
                    message: '售货失败',
                    description: res.message
                })
                return false;
            } else {
                notification['success']({
                    message: '售货成功',
                    description: `商品成功售货已经出仓!  订单号:\n${res.orderId} 您可以前往订单模块查看!`
                })
                fetchShop().then(res => setData(res));
                return true;
            }
        })
    }, [])
    const column: ColumnsType = [
        {
            title: '商品id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: "商品名称",
            dataIndex: 'shopName',
            key: 'shopName',
            align: "center"
        },
        {
            title: '商品类型',
            dataIndex: "shopType",
            key: 'shopType',
            align: 'center',
            render: text => <Tag color={Color[text - 1]}>{ShopType[text]}</Tag>
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: '商品进价',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
            align: 'center'
        },
        {
            title: '库存剩余量',
            dataIndex: 'remainder',
            key: 'remainder',
            align: 'center'
        },
        {
            title: '操作',
            key: "do",
            align: 'center',
            render: (_, record: any) => {
                const userType = sessionStorage.getItem('userType')
                return <>
                    <Button onClick={() => { setShowModal(true); setShopId(record.id) }} disabled={userType !== '3'} type="primary">售出</Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => { setShowPurchase(true); setShopId(record.id) }} type="primary" disabled={userType !== '2'}>进货</Button>
                </>
            }
        }
    ]
    useEffect(() => {
        fetchShop().then(res => setData(res))
    }, [])
    return <><div className={styles.startCtn}>
        <span className={styles.start}>|</span>商品信息管理
    </div>
        <div className={styles.secondLine}>
            <Search flushData={setData} />
        </div>
        <Modal title="售货" destroyOnClose open={showModal} onOk={() => { sale(shopId, form.getFieldValue('num')).then(res => { res ? setShowModal(false) : "" }) }} onCancel={() => setShowModal(false)}>
            <Form form={form}>
                <Form.Item name='num' label="请输入交易数量" required>
                    <InputNumber min={0} placeholder="请输入数量" />
                </Form.Item>
            </Form>
        </Modal>
        <Modal destroyOnClose open={showPurchase} onCancel={() => setShowPurchase(false)} title="进货">

        </Modal>
        <Table dataSource={data} columns={column as any} /></>
})

export default Shop;