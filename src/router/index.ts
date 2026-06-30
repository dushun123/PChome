import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import AlbumPage from "@/views/AlbumPage.vue";
import CodeGenerator from "@/views/CodeGenerator.vue";
import MapPage from "@/views/MapPage.vue";
import NotFound from "@/views/NotFound.vue";

// 定义路由配置
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/album",
    name: "Album",
    component: AlbumPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/code-generator",
    name: "CodeGenerator",
    component: CodeGenerator,
    meta: { requiresAuth: true },
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/files",
    name: "Files",
    component: NotFound,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: NotFound,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 从 localStorage 恢复登录状态
  userStore.restoreFromStorage();

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    // 需要认证但未登录，跳转到登录页
    next("/login");
  } else if (to.path === "/login" && userStore.isAuthenticated) {
    // 已登录用户访问登录页，跳转到主页
    next("/");
  } else {
    next();
  }
});

export default router;
