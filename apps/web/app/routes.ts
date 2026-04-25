import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('students', 'routes/students.tsx'),
  route('students/new', 'routes/student-new.tsx'),
  route('students/:id', 'routes/student-detail.tsx'),
  route('students/:id/edit', 'routes/student-edit.tsx'),
] satisfies RouteConfig;
