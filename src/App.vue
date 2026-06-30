<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

const route = useRoute()
const isAnimating = ref(false)
const transitionName = ref('slide-left')

watch(
  () => route.path,
  (to, from) => {
    // 根据路由方向决定动画
    if (to === '/login') {
      transitionName.value = 'slide-right'
    } else if (from === '/login') {
      transitionName.value = 'slide-left'
    } else {
      transitionName.value = 'fade'
    }
  }
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in" @before-enter="() => (isAnimating = true)" @after-enter="() => (isAnimating = false)">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style>
/* 全局页面切换动画 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 全局选择样式 */
::selection {
  background: #409eff;
  color: #ffffff;
}
</style>
