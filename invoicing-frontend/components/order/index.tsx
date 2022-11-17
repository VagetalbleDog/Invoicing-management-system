import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import Fetch from "../../utils/fetch";
import styles from './index.module.css';
import React from "react";
import Search from "./components/search";
const fetchOrder = async (id?: number) => {
    let url = '/api/order?';
    const token = sessionStorage.getItem('key');
    if (id) {
        url += `id=${id}`
    }
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const column: ColumnsType = [
    {
        title: "id",
        dataIndex: 'id',
        key: 'id',
        align: "center"
    },
    {
        title: '员工id',
        dataIndex: 'employee',
        key: 'employeeId',
        align: 'center',
        render: (_, record: any) => record.employee.id
    },
    {
        title: '员工姓名',
        dataIndex: 'employee',
        key: "employeeName",
        align: 'center',
        render: (_, record: any) => record.employee.name
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        render: (_, record: any) => {
            const time = record.createTime;
            const day = time.slice(0, 10);
            const hour = time.slice(11, 19);
            return `${day} ${hour}`
        }
    },
    {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        align: 'center',
        render: text => text == 1 ? '采购' : '销售'
    },
    {
        title: '供应商',
        dataIndex: 'supplier',
        key: "supplier",
        align: 'center',
        render: (_, record: any) => {
            if (record.supplier) {
                return record.supplier.supplierName
            }
            return '——'
        }
    },
    {
        title: '商品名称',
        dataIndex: 'shop',
        key: 'shop',
        align: 'center',
        render: (_, record: any) => {
            return record.shop.shopName
        }
    },
    {
        title: '交易数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
    },
    {
        title: "订单总额",
        dataIndex: "num",
        key: "sum",
        align: 'center',
        render: (_, record: any) => {
            if (record.orderType === 1) {
                return <Tag color="red">{`- ${record.num * record.shop.price}`}</Tag>
            } else {
                return <Tag color="green">{`+ ${record.num * record.shop.price}`}</Tag>
            }
        }
    }
]
const Order: React.FC = React.memo(() => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchOrder().then(res => setData(res))
    }, [])
    return <>
        <div className={styles.startCtn}>
            <span className={styles.start}>|</span>订单管理
        </div>
        <div className={styles.secondLine}>
            <Search flushData={setData} />
        </div>
        <Table dataSource={data} columns={column as any} />
    </>
})

export default Order;