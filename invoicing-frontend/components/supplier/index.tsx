import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import Fetch from "../../utils/fetch";
import styles from './index.module.css';
import React from "react";
import Search from "./components/search";
const fetchSupplier = async (id?: number, supplierName?: string) => {
    let url = `/api/supplier?`;
    const token = sessionStorage.getItem('key');
    if (id) { url += `id=${id}&` };
    if (supplierName) { supplierName += `supplierName=${supplierName}` }
    if (!token) {
        message.error('您还未登录');
        return;
    }
    return Fetch(url, token)
}
const color = ['cyan', 'pink', 'blue', 'yellow', 'green', 'red', 'purple']
const Supplier: React.FC = React.memo(() => {
    const [data, setData] = useState([]);
    const column: ColumnsType = [
        {
            title: '供应商id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            key: 'supplierName',
            align: 'center'
        },
        {
            title: '售卖商品',
            dataIndex: 'shop',
            key: 'shop',
            align: 'center',
            render: (_, record: any) => {
                return <>
                    {record.saleShops.map((i: any, index: number) => {
                        return <Tag color={color[index % 7]}>{i.shopName}</Tag>
                    })}
                </>
            }
        }
    ]
    useEffect(() => {
        fetchSupplier().then(res => {
            setData(res);
        })
    }, [])
    return <><div className={styles.startCtn}>
        <span className={styles.start}>|</span>供应商信息管理
    </div>
        <div className={styles.secondLine}>
            <Search flushData={setData} />
        </div>
        <Table columns={column as any} dataSource={data} />
    </>
})

export default Supplier;