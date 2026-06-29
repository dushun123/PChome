<script setup lang="ts">
import { onMounted } from 'vue'
import { useAlbumStore, type Photo } from '@/store/modules/album'
import { Image } from 'lucide-vue-next'
import { directive as viewer } from 'v-viewer'

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

// 获取相册所有照片的URL列表
const getPhotoUrls = (album: Photo[]) => {
  return album.photos.map(p => p.url)
}
</script>

<template>
  <div class="album-container">
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
</template>

<style scoped>
.album-container {
  padding: 0;
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
}
</style>
