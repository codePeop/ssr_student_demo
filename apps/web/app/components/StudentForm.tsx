import { Form, Input, Select, InputNumber, Row, Col } from 'antd';
import type { Student } from './StudentTable';

export function StudentForm({ form, initialValues }: { form: any; initialValues?: Partial<Student> }) {
  const gradeOptions = [
    { label: '一年级', value: 'grade1' },
    { label: '二年级', value: 'grade2' },
    { label: '三年级', value: 'grade3' },
    { label: '四年级', value: 'grade4' },
    { label: '五年级', value: 'grade5' },
    { label: '六年级', value: 'grade6' },
  ];

  const classOptions = [
    { label: '一班', value: 'class1' },
    { label: '二班', value: 'class2' },
    { label: '三班', value: 'class3' },
    { label: '四班', value: 'class4' },
  ];

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} placeholder="请输入年龄" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Select.Option value="male">男</Select.Option>
              <Select.Option value="female">女</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: '请选择年级' }]}
          >
            <Select placeholder="请选择年级" options={gradeOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="class"
            label="班级"
            rules={[{ required: true, message: '请选择班级' }]}
          >
            <Select placeholder="请选择班级" options={classOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效邮箱' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="address" label="地址">
            <Input.TextArea rows={2} placeholder="请输入地址" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
