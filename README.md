# Dawson 个人管理系统

基于 Vue 3 + Element Plus + TypeScript + Vite 构建的个人管理系统。

## 账号密码

- 用户名：`admin`
- 密码：`123456`

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 技术栈

- Vue 3 (Composition API)
- Element Plus
- Vue Router
- Pinia
- TypeScript
- Vite

## 项目结构

```
src/
├── views/           # 页面组件
│   ├── Login.vue   # 登录页
│   ├── Home.vue    # 主页
│   └── NotFound.vue # 404页面
├── store/          # 状态管理
├── router/         # 路由配置
└── utils/          # 工具函数
```

## 部署地址

- Vercel: https://vercel.com/dawsons-projects-b93349c8/p-chome/E2s8GbSXaosfydvKdi6qQTvKxgWh

## 功能特点

- 登录验证（固定账号密码）
- 相册展示
- 照片预览
- 响应式设计
- 路由守卫
