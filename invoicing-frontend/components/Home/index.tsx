import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import Employee from '../employee';
import Order from '../order';
import Shop from '../shop';
import Supplier from '../supplier';
import { Avatar, Button, MenuProps, message, } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Fetch from '../../utils/fetch';

const { Header, Content, Footer, Sider } = Layout;

const Tab = (index: number,userType:number) => {
  switch(userType){
    case 1:
      return [<Employee />, <Shop />, <Supplier />, <Order />][index];
    default:
      return [<Shop />, <Supplier />, <Order />][index];
  }
}
const GetRole = (userType:number)=>{
  switch(userType){
    case 1:
      return '管理员';
    case 2:
      return '采购员';
    case 3:
      return '销售员';
  }
}
const fetchUserName = async(username:string)=>{
  return Fetch(`/api/employee?username=${username}`,sessionStorage.getItem('key') as string).then(res=>res[0])
}
const Home: React.FC = ({ setLog }: any) => {
  const logout = ()=>{
    sessionStorage.clear();
    setLog(false);
    message.success('已注销！')
  }
  const [employee,setEmpolyee] = useState({
    id:1,
    name:'',
    username:"",
    userType:1,
    sex:1
  })
  const [tabIndex, setTabIndex] = useState(0);
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items = (userType:number): MenuItem[]=>{
    if(userType===1){
      return [
        getItem(<div children="员工信息管理" onClick={() => setTabIndex(0)} />, '1', <PieChartOutlined />),
        getItem(<div children="商品管理" onClick={() => setTabIndex(1)} />, '2', <DesktopOutlined />),
        getItem(<div children="供应商管理" onClick={() => setTabIndex(2)} />, '3', <ContainerOutlined />),
        getItem(<div children="订单管理" onClick={() => setTabIndex(3)} />, '4', <MailOutlined />),
      ]
    }else{
      return [
        getItem(<div children="商品管理" onClick={() => setTabIndex(0)} />, '1', <DesktopOutlined />),
        getItem(<div children="订单管理" onClick={() => setTabIndex(2)} />, '3', <MailOutlined />),
        getItem(<div children="供应商管理" onClick={() => setTabIndex(1)} />, '2', <ContainerOutlined />),
      ]
    }
  }
  useEffect(()=>{
    fetchUserName(sessionStorage.getItem('username') as string).then(employee=>{
      setEmpolyee(employee)
    })
  },[])
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items(employee.userType)} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0, position: 'relative' }}>
          <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: "left", marginLeft: '20px',marginRight:"20px" }} size={55}>
            {employee.name.slice(0,3)}
          </Avatar>
          <div className={styles.header_welcome}>欢迎，{GetRole(employee.userType)}!&nbsp;&nbsp;&nbsp;<Button onClick={logout} type="primary">点击注销</Button></div>
          <div className={styles.title}>进销存数据管理系统</div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            {Tab(tabIndex,employee.userType)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>进销存信息管理系统 ©2022 Created by Zhu Wenfu</Footer>
      </Layout>
    </Layout>
  )
};

export default Home;