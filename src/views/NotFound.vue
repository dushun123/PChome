<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">抱歉，您访问的页面不存在或已被移除</p>

      <div class="action-buttons">
        <el-button type="primary" size="large" @click="goHome">
          <Home :size="18" class="button-icon" />
          返回首页
        </el-button>
        <el-button size="large" @click="goBack">
          <ArrowLeft :size="18" class="button-icon" />
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.not-found-content {
  text-align: center;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: #409eff;
  line-height: 1;
  margin-bottom: 20px;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px;
}

.error-message {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0 0 40px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button-icon {
  margin-right: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }

  .error-title {
    font-size: 24px;
  }

  .error-message {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }
}
</style>