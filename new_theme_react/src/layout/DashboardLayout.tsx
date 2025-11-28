import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar, theme, Spin } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  NodeIndexOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ReadOutlined,
  BarChartOutlined,
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { logout } from '../services/auth';
import { getUserInfo } from '../services/userService';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    getUserInfo().then((res: any) => {
      setUser(res.data);
    }).catch(() => {
      // Error handled by interceptor, but we should stop loading
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: '仪表盘' },
    { key: '/plan', icon: <ShoppingCartOutlined />, label: '购买订阅' },
    { key: '/order', icon: <UnorderedListOutlined />, label: '我的订单' },
    { key: '/node', icon: <NodeIndexOutlined />, label: '节点列表' },
    { key: '/traffic', icon: <BarChartOutlined />, label: '流量明细' },
    { key: '/ticket', icon: <CustomerServiceOutlined />, label: '工单系统' },
    { key: '/knowledge', icon: <ReadOutlined />, label: '知识库' },
    { key: '/gift-card', icon: <GiftOutlined />, label: '兑换卡' },
    { key: '/profile', icon: <UserOutlined />, label: '个人中心' },
  ];

  const userMenu = {
    items: [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: logout
      }
    ]
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          overflow: 'hidden'
        }}>
          {window.settings?.title || 'Xboard'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
             <Dropdown menu={userMenu}>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar src={user?.avatar_url} icon={<UserOutlined />} />
                  <span>{user?.email}</span>
                </div>
             </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
