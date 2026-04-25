import { useNavigate, useLocation } from 'react-router';
import { Layout, Menu, theme } from 'antd';
import { TeamOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header, Sider, Content } = Layout;

interface StudentLayoutProps {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/students',
      icon: <TeamOutlined />,
      label: '学生管理',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const getSelectedKeys = () => {
    const pathname = location.pathname;
    if (pathname === '/') return ['/'];
    if (pathname.startsWith('/students')) return ['/students'];
    return [pathname];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          collapsedWidth={80}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0,
            left: 0,
          }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: collapsed ? 16 : 18,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {collapsed ? '学生' : '学生管理系统'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            onClick={({ key }) => handleMenuClick(key)}
          />
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 18,
                padding: '0 24px',
                height: 64,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          )}
          {isMobile && (
            <div style={{ flex: 1, padding: '0 16px' }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>学生管理系统</span>
            </div>
          )}
        </Header>
        <Content style={{ margin: 16 }}>
          <div
            className="page-container"
            style={{
              minHeight: 'calc(100vh - 64px - 48px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
