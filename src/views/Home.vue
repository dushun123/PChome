<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElMessageBox, ElMessage } from "element-plus";
import { Image, FolderOpen, Settings, LogOut } from "lucide-vue-next";

const router = useRouter();
const userStore = useUserStore();

const menuItems = [
  {
    id: "album",
    label: "相册管理",
    icon: Image,
    path: "/album",
    color: "#409eff",
  },
  {
    id: "files",
    label: "文件管理",
    icon: FolderOpen,
    path: "/files",
    color: "#67c23a",
  },
  {
    id: "settings",
    label: "系统设置",
    icon: Settings,
    path: "/settings",
    color: "#909399",
  },
];

const handleMenuClick = (path: string) => {
  router.push(path);
};

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm("确定要退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    userStore.logout();
    ElMessage.success("已退出登录");
    router.push("/login");
  } catch {
    // 用户取消操作
  }
};
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="header-title">个人管理系统</h1>
        </div>

        <div class="header-right">
          <span class="user-name">欢迎，{{ userStore.username }}</span>
          <el-button
            type="danger"
            size="small"
            class="logout-button"
            @click="handleLogout"
          >
            <LogOut :size="16" class="logout-icon" />
            退出登录
          </el-button>
        </div>
      </div>
    </header>

    <!-- 主内容区 - 功能入口 -->
    <main class="main-content">
      <div class="welcome-section">
        <h2 class="welcome-title">欢迎使用个人管理系统</h2>
        <p class="welcome-subtitle">请选择要使用的功能模块</p>
      </div>

      <div class="menu-grid">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="menu-card"
          @click="handleMenuClick(item.path)"
        >
          <div
            class="menu-icon"
            :style="{ backgroundColor: item.color + '15', color: item.color }"
          >
            <component :is="item.icon" :size="40" />
          </div>
          <h3 class="menu-label">{{ item.label }}</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.header {
  background: #001529;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-title {
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-name {
  color: #ffffff;
  font-size: 14px;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logout-icon {
  margin-right: 4px;
}

.main-content {
  margin-top: 64px;
  padding: 60px 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 60px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px;
}

.welcome-subtitle {
  font-size: 16px;
  color: #909399;
  margin: 0;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.menu-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
}

.menu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: #409eff;
}

.menu-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.menu-label {
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 24px;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .menu-card {
    padding: 30px 20px;
  }

  .menu-icon {
    width: 60px;
    height: 60px;
  }

  .menu-icon :deep(svg) {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 16px;
  }

  .user-name {
    display: none;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>
