import { Form } from 'antd';
import { Button, Card, message } from 'antd';
import { useNavigate, useLoaderData } from 'react-router';
import { StudentForm } from '../components/StudentForm';
import { getStudent } from '../services/student';
import { useEffect } from 'react';

export function meta() {
  return [{ title: '编辑学生 - 学生管理系统' }];
}

export async function loader({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id);
  if (!student) {
    throw new Response('Not Found', { status: 404 });
  }
  return { student };
}

export default function StudentEdit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { student } = useLoaderData<typeof loader>();

  useEffect(() => {
    form.setFieldsValue(student);
  }, [student, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('更新成功');
        navigate('/students');
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">编辑学生</h2>
      <Card>
        <StudentForm form={form} initialValues={student} />
        <div className="mt-4 flex gap-2">
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={() => navigate('/students')}>取消</Button>
        </div>
      </Card>
    </div>
  );
}
