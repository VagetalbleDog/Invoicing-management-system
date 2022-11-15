import { Button, message, Table, Tag } from "antd";
import { useEffect, useState, } from "react";
import type { ColumnsType } from 'antd/es/table';
import Fetch from "../../utils/fetch";
import styles from './index.module.css';
const fetchEmployee = async (id?: number, username?: string, name?: string) => {
    let url = `/api/employee?`;
    if (id) {
        url += `id=${id}&`
    }
    if (username) {
        url += `username=${username}&`
    }
    if (name) {
        url += `name=${name}`
    }
    const token = sessionStorage.getItem('key');
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const column: ColumnsType = [
    {
        title: '员工id',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    },
    {
        title: "用户名",
        dataIndex: 'username',
        key: "username",
        align: 'center'
    },
    {
        title: "员工姓名",
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: "员工性别",
        dataIndex: 'sex',
        key: 'sex',
        render: (text: number) => text === 1 ? '男' : '女',
        align: 'center'
    },
    {
        title: "员工类型",
        dataIndex: 'userType',
        key: 'userType',
        render: (text: number) => {
            switch (text) {
                case 1:
                    return <Tag color="cyan">管理员</Tag>
                case 2:
                    return <Tag color="purple">采购员</Tag>
                case 3:
                    return <Tag color="green">销售员</Tag>
            }
        },
        align: 'center'
    },
    {
        title: "操作",
        dataIndex: 'id',
        key: 'id',
        render: (_, record: any) => {
            return <div>
                <Button type="primary" color="red" danger >删除</Button>
                &nbsp;
                <Button type="primary" >更新</Button>
            </div>
        },
        align: 'center'
    }
]
const Employee = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchEmployee().then((res) => {
            setData(res)
        })
    }, [])
    return <>
        <div className={styles.startCtn}>
            <span className={styles.start}>|</span>员工信息管理
        </div>
        <Table dataSource={data} columns={column as any} />
    </>
}

export default Employee;