import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StudentLayout } from './routes/_layout';
import 'antd/dist/reset.css';
import './app.css';

export function links() {
  return [
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ];
}

export function Layout() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConfigProvider
          locale={zhCN}
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          <AntdApp>
            <StudentLayout>
              <Outlet />
            </StudentLayout>
          </AntdApp>
        </ConfigProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function meta() {
  return [
    { title: '学生管理系统' },
    { name: 'description', content: '学生管理系统工程化实践' },
  ];
}
