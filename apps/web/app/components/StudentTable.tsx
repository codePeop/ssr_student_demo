import { Table, Tag, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatDate } from './utils';

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  grade: string;
  class: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
  grade?: string;
  class?: string;
}

export interface StudentListResponse {
  list: Student[];
  total: number;
  page: number;
  pageSize: number;
}

export function StudentTable({
  data,
  loading,
  pagination,
  onEdit,
  onDelete,
}: {
  data: Student[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}) {
  const columns: ColumnsType<Student> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : 'pink'}>
          {gender === 'male' ? '男' : '女'}
        </Tag>
      ),
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => onEdit?.(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger onClick={() => onDelete?.(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<Student>
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      scroll={{ x: 800 }}
    />
  );
}
