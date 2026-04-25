# 学生管理系统工程化实践计划

## 1. 目标设定
- **架构**: Yarn Workspaces Monorepo
- **框架**: React Router 7 (SSR 模式)
- **适配**: PC/H5 响应式 (Tailwind CSS)
- **数据**: Mock Service Worker (MSW) 或简单 API Mock
- **自动化**: GitHub Actions (CI/CD)

## 2. 阶段任务顺序 (Phase-by-Phase)

### 第一阶段：基础设施 (Monorepo Setup) 🛠️
- [ ] 初始化根目录 `yarn init`
- [ ] 配置 `package.json` 的 `workspaces` 字段
- [ ] 划分目录结构：`apps/web` (主应用), `packages/ui` (组件库), `packages/shared` (工具/类型)
- [ ] 配置全局的基础 Tsconfig 和 ESLint/Prettier 规则

### 第二阶段：渲染层 (RR7 SSR App) 🌐
- [ ] 在 `apps/web` 中手动搭建 React Router 7 环境
- [ ] 配置 `entry.server.tsx` 和 `entry.client.tsx`
- [ ] 实现基础 Layout：根据 User-Agent 实现 PC/H5 容器适配
- [ ] 关键点：理解 `Loader` 数据流与 `Hydration` 过程

### 第三阶段：业务逻辑 (Student Management) 🎓
- [ ] 引入 `msw` 或 `json-server` 实现学生数据的 CRUD Mock
- [ ] 编写共享组件：响应式表格、移动端列表卡片、搜索表单
- [ ] 实现首屏 SSR 加载学生列表，二级页面 CSR 局部刷新

### 第四阶段：流水线 (CI/CD Pipeline) 🚀
- [ ] 编写 `.github/workflows/main.yml`
- [ ] 配置 **Build Job**: 在 Monorepo 环境下跨包构建
- [ ] 配置 **Deploy Job**: 模拟部署逻辑（如同步到 OSS 或 Docker Hub）

## 3. 核心注意事项表 ⚠️
| 关注点 | 说明 |
| :--- | :--- |
| **Node 环境兼容** | SSR 阶段需注意 `window/document` 在服务端不可用 |
| **依赖拓扑** | 确保 `apps` 能够正确引用 `packages` 的源码（Tsconfig 路径映射） |
| **样式污染** | 在 Monorepo 中建议使用 CSS Modules 或 Tailwind 以防样式冲突 |
| **Hydration Error** | 确保服务端生成的 HTML 结构与客户端初次渲染完全一致 |