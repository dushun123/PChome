import { defineStore } from 'pinia'

export interface Photo {
  id: number
  title: string
  url: string
  thumbnail: string
  description?: string
  createdAt: string
}

export interface Album {
  id: number
  name: string
  photos: Photo[]
}

// 相册照片数据
const photoData = [
  { name: '3d7b27d4fae81bcd10e6e21a7ad3c890.jpg', title: '照片 1' },
  { name: '8a05fabe2b90bd73427ff798ce7397ad.jpg', title: '照片 2' },
  { name: '微信图片_20260309170958_106_316.jpg', title: '照片 3' },
  { name: '微信图片_20260309171019_107_316.jpg', title: '照片 4' },
  { name: '微信图片_20260309171029_108_316.jpg', title: '照片 5' },
  { name: '微信图片_20260309171036_109_316.jpg', title: '照片 6' },
  { name: '微信图片_20260309171043_110_316.jpg', title: '照片 7' },
  { name: '微信图片_20260309171052_111_316.jpg', title: '照片 8' },
  { name: '微信图片_20260309171100_112_316.jpg', title: '照片 9' },
  { name: '微信图片_20260309171110_113_316.jpg', title: '照片 10' },
  { name: '微信图片_20260309171118_114_316.jpg', title: '照片 11' },
  { name: '微信图片_20260309171126_115_316.jpg', title: '照片 12' },
  { name: '微信图片_20260309171135_116_316.jpg', title: '照片 13' },
  { name: '微信图片_20260309171144_117_316.jpg', title: '照片 14' }
]

// Mock 数据
const mockAlbums: Album[] = [
  {
    id: 1,
    name: '我的相册',
    photos: photoData.map((p, index) => ({
      id: index + 1,
      title: p.title,
      url: `/photos/${p.name}`,
      thumbnail: `/photos/${p.name}`,
      description: '',
      createdAt: '2026-03-09'
    }))
  }
]

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albums: [] as Album[],
    currentPhoto: null as Photo | null,
    dialogVisible: false
  }),

  actions: {
    loadAlbums() {
      // 加载 mock 数据
      this.albums = mockAlbums
    },

    viewPhoto(photo: Photo) {
      this.currentPhoto = photo
      this.dialogVisible = true
    },

    closePhoto() {
      this.currentPhoto = null
      this.dialogVisible = false
    }
  }
})