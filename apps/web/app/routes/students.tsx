import { useLoaderData, useSearchParams, Link, useNavigation } from 'react-router';
import { useState, useEffect } from 'react';
import { Button, Space, Modal, message, Empty } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { StudentTable } from '../components/StudentTable';
import { StudentCard } from '../components/StudentCard';
import type { Student } from '../components/StudentTable';
import { getStudents, deleteStudent } from '../services/student';

export function meta() {
  return [{ title: '学生列表 - 学生管理系统' }];
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword') || '';
  const grade = url.searchParams.get('grade') || '';
  const className = url.searchParams.get('class') || '';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

  const result = await getStudents({ keyword, grade, class: className, page, pageSize });
  return { ...result, keyword, grade, className };
}

export default function Students() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const initialData = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(initialData.list);
  const [pagination, setPagination] = useState({
    current: initialData.page,
    pageSize: initialData.pageSize,
    total: initialData.total,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    try {
      await deleteStudent(deletingId);
      message.success('删除成功');
      setStudents((prev) => prev.filter((s) => s.id !== deletingId));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
    } catch {
      message.error('删除失败');
    } finally {
      setDeleteModalVisible(false);
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(page));
      prev.set('pageSize', String(pageSize));
      return prev;
    });
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  const handleSearch = () => {
    const keyword = searchParams.get('keyword') || '';
    const grade = searchParams.get('grade') || '';
    const className = searchParams.get('class') || '';
    getStudents({ keyword, grade, class: className, page: 1, pageSize: pagination.pageSize }).then(
      (result) => {
        setStudents(result.list);
        setPagination((prev) => ({ ...prev, total: result.total, current: 1 }));
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold m-0">学生列表</h2>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleSearch} loading={isLoading}>
            刷新
          </Button>
          <Link to="/students/new">
            <Button type="primary" icon={<PlusOutlined />}>
              添加学生
            </Button>
          </Link>
        </Space>
      </div>

      {students.length === 0 && !isLoading ? (
        <Empty description="暂无学生数据" />
      ) : isMobile ? (
        <div>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={(s) => (window.location.href = `/students/${s.id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <StudentTable
          data={students}
          loading={isLoading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: handlePageChange,
          }}
          onEdit={(s) => (window.location.href = `/students/${s.id}/edit`)}
          onDelete={handleDelete}
        />
      )}

      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeletingId(null);
        }}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要删除该学生吗？此操作不可恢复。</p>
      </Modal>
    </div>
  );
}
