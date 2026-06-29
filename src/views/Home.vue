<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useAlbumStore, type Photo } from "@/store/modules/album";
import { LogOut, Image } from "lucide-vue-next";

const router = useRouter();
const userStore = useUserStore();
const albumStore = useAlbumStore();

onMounted(() => {
  albumStore.loadAlbums();
});

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

// 获取照片在相册中的索引
const getPhotoIndex = (album: Photo[], photo: Photo) => {
  return album.findIndex((p) => p.id === photo.id);
};

// 获取相册中所有照片的URL列表
const getAlbumPhotoUrls = (album: Photo[]) => {
  return album.map((p) => p.url);
};
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <Image class="header-icon" :size="24" />
          <h1 class="header-title">个人相册管理系统</h1>
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

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- 相册模块 -->
        <section class="album-section">
          <h2 class="section-title">
            <Image :size="20" class="section-icon" />
            我的相册
          </h2>

          <div v-if="albumStore.albums.length === 0" class="empty-state">
            <el-empty description="暂无相册" />
          </div>

          <div v-else class="photo-grid">
            <div
              v-for="album in albumStore.albums"
              :key="album.id"
              class="album-container"
            >
              <h3 class="album-name">{{ album.name }}</h3>
              <div class="photos-container">
                <div
                  v-for="(photo, photoIndex) in album.photos"
                  :key="photo.id"
                  class="photo-card"
                >
                  <el-image
                    :src="photo.thumbnail"
                    :alt="photo.title"
                    class="photo-image"
                    :preview-src-list="getAlbumPhotoUrls(album.photos)"
                    :initial-index="photoIndex"
                    fit="cover"
                    lazy
                  >
                    <template #placeholder>
                      <div class="image-placeholder">
                        <el-icon class="is-loading">
                          <i class="el-icon-loading" />
                        </el-icon>
                      </div>
                    </template>
                    <template #error>
                      <div class="image-error">
                        <i class="el-icon-picture" />
                      </div>
                    </template>
                  </el-image>
                  <div class="photo-overlay">
                    <span class="photo-title">{{ photo.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f7fa;
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
  max-width: 1400px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  color: #409eff;
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
  padding: 40px 24px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.album-section {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e8e8e8;
}

.section-icon {
  color: #409eff;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.photo-grid {
  display: grid;
  gap: 30px;
}

.album-container {
  margin-bottom: 40px;
}

.album-name {
  font-size: 18px;
  font-weight: 500;
  color: #5a6e7f;
  margin: 0 0 20px;
  padding-left: 12px;
}

.photos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.photo-card {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.photo-image {
  width: 100%;
  height: 100%;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-title {
  font-size: 14px;
  font-weight: 500;
}

.image-placeholder,
.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 32px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-title {
    font-size: 16px;
  }

  .user-name {
    font-size: 12px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .album-section {
    padding: 20px;
  }

  .section-title {
    font-size: 20px;
  }

  .photos-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .photos-container {
    grid-template-columns: 1fr;
  }

  .header-right {
    gap: 10px;
  }
}
</style>
