import { Link } from 'react-router';
import { Button, Card, Row, Col, Typography, Space, Statistic } from 'antd';
import { TeamOutlined, PlusOutlined, ArrowRightOutlined, UserAddOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function meta() {
  return [
    { title: '首页 - 学生管理系统' },
  ];
}

export default function Home() {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <Title level={2} style={{ marginBottom: 8 }}>欢迎使用学生管理系统</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          基于 React Router 7 SSR + Ant Design 5 + Tailwind CSS 构建的学生管理平台
        </Text>
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable style={{ height: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <TeamOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </div>
            <Title level={4} style={{ marginBottom: 8 }}>学生管理</Title>
            <Text type="secondary">查看、添加、编辑和删除学生信息</Text>
            <Space style={{ marginTop: 16, width: '100%' }} direction="vertical">
              <Link to="/students">
                <Button type="primary" block icon={<ArrowRightOutlined />}>
                  进入管理
                </Button>
              </Link>
              <Link to="/students/new">
                <Button block icon={<PlusOutlined />}>
                  添加学生
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 32 }} title="技术栈">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}>
            <Text strong>框架:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>React Router 7 (SSR)</div>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Text strong>组件库:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>Ant Design 5</div>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Text strong>样式:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>Tailwind CSS</div>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Text strong>架构:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>Yarn Workspaces</div>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Text strong>语言:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>TypeScript</div>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Text strong>Mock:</Text>
            <div style={{ fontSize: 14, color: '#666' }}>本地 Mock Service</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
