import type { Student, StudentQuery, StudentListResponse } from '../components/StudentTable';
import { generateId } from '../components/utils';

const mockStudents: Student[] = [
  {
    id: '1',
    name: '张三',
    age: 10,
    gender: 'male',
    grade: 'grade4',
    class: 'class1',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区建国路1号',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: '李四',
    age: 9,
    gender: 'female',
    grade: 'grade3',
    class: 'class2',
    phone: '13800138002',
    email: 'lisi@example.com',
    address: '上海市浦东新区世纪大道100号',
    createdAt: '2024-01-16T09:20:00Z',
    updatedAt: '2024-01-16T09:20:00Z',
  },
  {
    id: '3',
    name: '王五',
    age: 11,
    gender: 'male',
    grade: 'grade5',
    class: 'class1',
    phone: '13800138003',
    email: 'wangwu@example.com',
    address: '广州市天河区珠江新城花城大道200号',
    createdAt: '2024-01-17T10:15:00Z',
    updatedAt: '2024-01-17T10:15:00Z',
  },
  {
    id: '4',
    name: '赵六',
    age: 8,
    gender: 'female',
    grade: 'grade2',
    class: 'class3',
    phone: '13800138004',
    email: 'zhaoliu@example.com',
    address: '深圳市南山区科技园南区高新南一道300号',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
  {
    id: '5',
    name: '钱七',
    age: 10,
    gender: 'male',
    grade: 'grade4',
    class: 'class2',
    phone: '13800138005',
    email: 'qianqi@example.com',
    address: '杭州市西湖区文三路398号',
    createdAt: '2024-01-19T14:30:00Z',
    updatedAt: '2024-01-19T14:30:00Z',
  },
];

let students = [...mockStudents];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getStudents(query: StudentQuery = {}): Promise<StudentListResponse> {
  await delay(300);

  let filtered = [...students];

  if (query.keyword) {
    const keyword = query.keyword.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(keyword) ||
        s.phone.includes(keyword) ||
        s.email.toLowerCase().includes(keyword)
    );
  }

  if (query.grade) {
    filtered = filtered.filter((s) => s.grade === query.grade);
  }

  if (query.class) {
    filtered = filtered.filter((s) => s.class === query.class);
  }

  const page = query.page || 1;
  const pageSize = query.pageSize || 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  };
}

export async function getStudent(id: string): Promise<Student | null> {
  await delay(200);
  return students.find((s) => s.id === id) || null;
}

export async function createStudent(data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
  await delay(300);
  const now = new Date().toISOString();
  const student: Student = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  students.push(student);
  return student;
}

export async function updateStudent(id: string, data: Partial<Student>): Promise<Student | null> {
  await delay(300);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;

  students[index] = {
    ...students[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return students[index];
}

export async function deleteStudent(id: string): Promise<boolean> {
  await delay(200);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  return true;
}
