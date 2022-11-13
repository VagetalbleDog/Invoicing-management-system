import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import Employee from '../components/employee';
import Order from '../components/order';
import Shop from '../components/shop';
import Supplier from '../components/supplier';
import { Avatar, Button, MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React,{lazy, useState} from 'react';
import styles from  './index.module.css'

const { Header, Content, Footer, Sider } = Layout;

const Tab = (index:number)=>{
  return [<Employee/>,<Shop/>,<Supplier/>,<Order/>][index];
}
const App: React.FC = () => {
  const [tabIndex,setTabIndex] = useState(0);
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

const items: MenuItem[] = [
  getItem(<div children="员工信息管理" onClick={()=>setTabIndex(0)}/>, '1', <PieChartOutlined />),
  getItem(<div children="商品管理" onClick={()=>setTabIndex(1)}/>, '2', <DesktopOutlined />),
  getItem(<div children="供应商管理" onClick={()=>setTabIndex(2)}/>, '3', <ContainerOutlined />),
  getItem(<div children="订单管理" onClick={()=>setTabIndex(3)}/>, '4', <MailOutlined />),
];
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0,position:'relative'}}>
          <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: "left",marginLeft:'20px' }} size={50}>
            朱
          </Avatar>
          <div className={styles.header_welcome}>欢迎，管理员!</div>
          <div className={styles.title}>进销存数据管理系统</div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              {Tab(tabIndex)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>进销存信息管理系统 ©2022 Created by Zhu Wenfu</Footer>
        </Layout>
      </Layout>
    )
};

export default App;