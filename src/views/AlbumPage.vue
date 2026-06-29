<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlbumStore, type Photo } from '@/store/modules/album'
import { Image, ArrowLeft } from 'lucide-vue-next'
import { directive as viewer } from 'v-viewer'

const router = useRouter()
const albumStore = useAlbumStore()

// v-viewer 指令配置
const vViewer = viewer({
  navbar: true,
  title: true,
  toolbar: true,
  tooltip: true,
  movable: true,
  zoomable: true,
  scalable: true,
  transition: true,
  fullscreen: true,
  keyboard: true
})

onMounted(() => {
  albumStore.loadAlbums()
})

const goBack = () => {
  router.push('/')
}

// 获取相册所有照片的URL列表
const getPhotoUrls = (album: Photo[]) => {
  return album.photos.map(p => p.url)
}
</script>

<template>
  <div class="album-page">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <ArrowLeft :size="20" class="back-icon" @click="goBack" />
          <Image :size="24" class="header-icon" />
          <h1 class="header-title">我的相册</h1>
        </div>

        <div class="header-right">
          <span class="photo-count">
            共 {{ albumStore.albums.reduce((sum, a) => sum + a.photos.length, 0) }} 张照片
          </span>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <div v-if="albumStore.albums.length === 0" class="empty-state">
          <el-empty description="暂无相册" />
        </div>

        <div v-else class="photo-grid">
          <div
            v-for="album in albumStore.albums"
            :key="album.id"
            class="album-section"
          >
            <h3 class="album-name">{{ album.name }}</h3>
            <div class="photos-container">
              <div
                v-for="(photo, photoIndex) in album.photos"
                :key="photo.id"
                class="photo-card"
              >
                <img
                  v-viewer="{
                    images: getPhotoUrls(album),
                    initialViewIndex: photoIndex
                  }"
                  :src="photo.thumbnail"
                  :alt="photo.title"
                  class="photo-image"
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

.back-icon {
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s;
}

.back-icon:hover {
  color: #409eff;
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
}

.photo-count {
  color: #ffffff;
  font-size: 14px;
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
  object-fit: cover;
  display: block;
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
