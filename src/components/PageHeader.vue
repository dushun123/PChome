<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

defineProps<{
  title: string;
  icon?: any;
  showBack?: boolean;
}>();

const emit = defineEmits<{
  back: [];
}>();
</script>

<template>
  <header class="page-header">
    <div class="header-content">
      <div class="header-left">
        <ArrowLeft
          v-if="showBack"
          :size="20"
          class="back-icon"
          @click="emit('back')"
        />
        <component
          :is="icon"
          v-if="icon"
          :size="24"
          class="header-icon"
        />
        <h1 class="header-title">{{ title }}</h1>
      </div>
      <div class="header-right">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.page-header {
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
  transition: all 0.3s ease;
}

.back-icon:hover {
  color: #409eff;
  transform: translateX(-3px);
}

.header-icon {
  color: #409eff;
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
</style>
