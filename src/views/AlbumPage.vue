<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAlbumStore, type Album } from "@/store/modules/album";
import { Image, ArrowLeft } from "lucide-vue-next";

const router = useRouter();
const albumStore = useAlbumStore();

const isVisible = ref(false);

onMounted(() => {
  albumStore.loadAlbums();
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const goBack = () => {
  router.push("/");
};

// 获取相册所有照片的URL列表
const getPhotoUrls = (album: Album) => {
  return album.photos.map((p) => p.url);
};
</script>

<template>
  <div class="album-page">
    <!-- 顶部导航栏 -->
    <header class="header" :class="{ 'header-visible': isVisible }">
      <div class="header-content">
        <div class="header-left">
          <ArrowLeft :size="20" class="back-icon" @click="goBack" />
          <Image :size="24" class="header-icon" />
          <h1 class="header-title">我的相册</h1>
        </div>

        <div class="header-right">
          <span class="photo-count">
            共
            {{ albumStore.albums.reduce((sum, a) => sum + a.photos.length, 0) }}
            张照片
          </span>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper" :class="{ 'content-visible': isVisible }">
        <div v-if="albumStore.albums.length === 0" class="empty-state">
          <el-empty description="暂无相册" />
        </div>

        <div v-else class="photo-grid">
          <div
            v-for="(album, albumIndex) in albumStore.albums"
            :key="album.id"
            class="album-section"
            :class="{ 'album-visible': isVisible }"
            :style="{ animationDelay: `${albumIndex * 0.2 + 0.3}s` }"
          >
            <h3 class="album-name">{{ album.name }}</h3>
            <div class="photos-container">
              <div
                v-for="(photo, photoIndex) in album.photos"
                :key="photo.id"
                class="photo-card"
                :class="{ 'photo-visible': isVisible }"
                :style="{
                  animationDelay: `${albumIndex * 0.2 + photoIndex * 0.05 + 0.4}s`,
                }"
              >
                <el-image
                  :src="photo.thumbnail"
                  :alt="photo.title"
                  class="photo-image"
                  fit="cover"
                  :preview-src-list="getPhotoUrls(album)"
                  :initial-index="photoIndex"
                  preview-teleported
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.album-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
  overflow: hidden;
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
  transform: translateY(-100%);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.header.header-visible {
  transform: translateY(0);
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

.back-icon {
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-icon:hover {
  color: #409eff;
  transform: translateX(-3px);
}

.header-icon {
  color: #409eff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.header-title {
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  display: flex;
  align-items: center;
}

.photo-count {
  color: #ffffff;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
}

.main-content {
  margin-top: 64px;
  padding: 40px 24px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.content-wrapper.content-visible {
  opacity: 1;
  transform: translateY(0);
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.photo-grid {
  display: grid;
  gap: 30px;
}

.album-section {
  margin-bottom: 40px;
  opacity: 0;
  transform: translateX(-30px);
}

.album-section.album-visible {
  animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.album-name {
  font-size: 18px;
  font-weight: 500;
  color: #5a6e7f;
  margin: 0 0 20px;
  padding-left: 12px;
  position: relative;
}

.album-name::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 18px;
  background: linear-gradient(180deg, #4facfe, #00f2fe);
  border-radius: 2px;
}

.photos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.photo-card {
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.photo-card.photo-visible {
  animation: photoZoomIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes photoZoomIn {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.photo-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.photo-card:active {
  transform: translateY(-4px) scale(0.98);
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.photo-card:hover :deep(.el-image__inner) {
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-title {
    font-size: 16px;
  }

  .photo-count {
    font-size: 12px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .content-wrapper {
    padding: 20px;
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
}
</style>
