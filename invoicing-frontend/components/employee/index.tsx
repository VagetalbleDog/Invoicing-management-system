import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useCallback, useEffect, useState, } from "react";
import type { ColumnsType } from 'antd/es/table';
import Fetch from "../../utils/fetch";
import styles from './index.module.css';
import Search from "./components/serach";
import Register from "./components/register";
import Update from "./components/update";
const fetchEmployee = async (id?: number, username?: string, name?: string) => {
    let url = `/api/employee?`;
    const token = sessionStorage.getItem('key');
    if (id) {
        url += `id=${id}&`
    }
    if (username) {
        url += `username=${username}&`
    }
    if (name) {
        url += `name=${name}`
    }
    if (!token) {
        message.error('您还未登录!');
        return;
    }
    return Fetch(url, token)
}
const deleteEmployee = async (id: number): Promise<boolean> => {
    const token = sessionStorage.getItem('key');
    if (!token) {
        message.error('您未登录或没有权限!');
        return false
    }
    const res = await Fetch(`/api/employee/delete/${id}`, token, {}, 2);
    if (res.code === 201) {
        message.success('删除成功');
        return true;
    }
    message.error(res.message)
    return false;
}
const Employee = () => {
    const [data, setData] = useState([]);
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
                    <Update flushData={setData} user={record} />
                    &nbsp;&nbsp;
                    <Popconfirm
                        title="你确定要删除这个用户吗?"
                        onConfirm={async () => {
                            const deleted = await deleteEmployee(record.id);
                            if (deleted) {
                                fetchEmployee().then((res) => {
                                    setData(res)
                                })
                            }
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button disabled={record.userType === 1} type="primary" color="red" danger >删除</Button>
                    </Popconfirm>
                </div>
            },
            align: 'center'
        }
    ]
    useEffect(() => {
        fetchEmployee().then((res) => {
            setData(res)
        })
    }, [])
    return <>
        <div className={styles.startCtn}>
            <span className={styles.start}>|</span>员工信息管理
        </div>
        <div className={styles.secondLine}>
            <Search flushData={setData} />
            <Register flushData={setData} />
        </div>
        <Table dataSource={data} columns={column as any} />
    </>
}

export default Employee;