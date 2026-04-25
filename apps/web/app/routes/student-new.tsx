import { Form } from 'antd';
import { Button, Card, message } from 'antd';
import { useNavigate } from 'react-router';
import { StudentForm } from '../components/StudentForm';
import type { Student } from '../components/StudentTable';
import { createStudent } from '../services/student';

export function meta() {
  return [{ title: '添加学生 - 学生管理系统' }];
}

export default function StudentNew() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createStudent(values as Omit<Student, 'id' | 'createdAt' | 'updatedAt'>);
      message.success('添加成功');
      navigate('/students');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">添加学生</h2>
      <Card>
        <StudentForm form={form} />
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
