import { useLoaderData, Link } from 'react-router';
import { Card, Descriptions, Tag, Button, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getStudent } from '../services/student';
import { formatDateTime } from '../components/utils';
import { useEffect, useState } from 'react';

export function meta() {
  return [{ title: '学生详情 - 学生管理系统' }];
}

export async function loader({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id);
  if (!student) {
    throw new Response('Not Found', { status: 404 });
  }
  return { student };
}

const gradeMap: Record<string, string> = {
  grade1: '一年级',
  grade2: '二年级',
  grade3: '三年级',
  grade4: '四年级',
  grade5: '五年级',
  grade6: '六年级',
};

const classMap: Record<string, string> = {
  class1: '一班',
  class2: '二班',
  class3: '三班',
  class4: '四班',
};

export default function StudentDetail() {
  const { student } = useLoaderData<typeof loader>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Link to="/students">
          <Button icon={<ArrowLeftOutlined />}>返回</Button>
        </Link>
        <h2 className="text-xl font-semibold m-0">学生详情</h2>
      </div>

      <Card>
        <Descriptions column={isMobile ? 1 : 2} bordered size="small">
          <Descriptions.Item label="姓名">{student.name}</Descriptions.Item>
          <Descriptions.Item label="年龄">{student.age}</Descriptions.Item>
          <Descriptions.Item label="性别">
            <Tag color={student.gender === 'male' ? 'blue' : 'pink'}>
              {student.gender === 'male' ? '男' : '女'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="年级">{gradeMap[student.grade] || student.grade}</Descriptions.Item>
          <Descriptions.Item label="班级">{classMap[student.class] || student.class}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{student.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱" span={isMobile ? 1 : 2}>
            {student.email}
          </Descriptions.Item>
          <Descriptions.Item label="地址" span={isMobile ? 1 : 2}>
            {student.address}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{formatDateTime(student.createdAt)}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{formatDateTime(student.updatedAt)}</Descriptions.Item>
        </Descriptions>

        <div className="mt-4">
          <Space>
            <Link to={`/students/${student.id}/edit`}>
              <Button type="primary" icon={<EditOutlined />}>
                编辑
              </Button>
            </Link>
          </Space>
        </div>
      </Card>
    </div>
  );
}
