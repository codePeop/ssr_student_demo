import { Card, Tag, Button, Space, Flex } from 'antd';
import { PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import { formatDate } from './utils';
import type { Student } from './StudentTable';

export function StudentCard({ student, onEdit, onDelete }: { student: Student; onEdit?: (student: Student) => void; onDelete?: (id: string) => void }) {
  return (
    <Card
      size="small"
      title={<span style={{ fontWeight: 600 }}>{student.name}</span>}
      extra={
        <Space>
          <Button type="link" size="small" onClick={() => onEdit?.(student)}>
            编辑
          </Button>
          <Button type="link" size="small" danger onClick={() => onDelete?.(student.id)}>
            删除
          </Button>
        </Space>
      }
      style={{ marginBottom: 12 }}
    >
      <Flex vertical gap={8}>
        <Flex gap={8}>
          <Tag color={student.gender === 'male' ? 'blue' : 'pink'}>
            {student.gender === 'male' ? '男' : '女'}
          </Tag>
          <Tag color="green">{student.grade}</Tag>
          <Tag color="orange">{student.class}</Tag>
        </Flex>
        <Flex align="center" gap={4}>
          <PhoneOutlined />
          <span>{student.phone}</span>
        </Flex>
        <Flex align="center" gap={4}>
          <MailOutlined />
          <span>{student.email}</span>
        </Flex>
        <Flex align="center" gap={4}>
          <HomeOutlined />
          <span>{student.address}</span>
        </Flex>
        <div style={{ color: '#999', fontSize: 12 }}>
          创建时间: {formatDate(student.createdAt)}
        </div>
      </Flex>
    </Card>
  );
}
