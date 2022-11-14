import styles from './index.module.css'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import Fetch from '../../utils/fetch';

const login = async (username: string, password: string): Promise<any> => {
    return Fetch('/api/auth/login', undefined, {
        username,
        password
    }, 2).then((res) => {
        if (res.code && res.code === 401) { message.error('用户名或密码错误'); return false; }
        sessionStorage.setItem('key', res.access_token);
        sessionStorage.setItem('username', username);
        return true
    })
}
const Login: React.FC = ({ setLog }: any) => {

    const [svg, setSvg] = useState({
        data: '',
        text: ''
    })
    const requestSvg = () => {
        Fetch('/api/auth/code').then((res) => {
            setSvg({
                data: res.svg,
                text: res.text
            })
        })
    }
    const onFinish = (values: any) => {
        const { username, password, validate } = values;
        if (validate.toLowerCase() !== svg.text.toLowerCase()) {
            message.error('验证码错误');
            console.log(svg.text, validate)
            return;
        }
        login(username, password).then((res) => {
            if (res) {
                setLog(true);
                message.success(`欢迎您!`);
            }
        })
    };
    useEffect(requestSvg, [])
    return (
        <div className={styles.container}>
            <p className={styles.title}>进销存数据库管理系统</p>
            <p className={styles.welcome}>尊敬的用户，请登录以进入</p>
            <Form
                style={{ width: 600, transform: 'translate(-50px,-50px)' }}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password />
                </Form.Item>
                <div className={styles.validate}>
                    <Form.Item name="validate" label="请输入验证码：">
                        <Input style={{ width: 150 }} />
                    </Form.Item>
                    <span className={styles.svg} onClick={requestSvg} dangerouslySetInnerHTML={{ __html: svg.data }}></span>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;