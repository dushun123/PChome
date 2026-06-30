<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { QrCode, Barcode, Sparkles } from "lucide-vue-next";
import QRCode from "qrcode";
import PageHeader from "@/components/PageHeader.vue";

const router = useRouter();

const codeType = ref<"qrcode" | "barcode">("qrcode");
const inputValue = ref("");
const codeImage = ref("");
const isGenerating = ref(false);

const goBack = () => {
  router.push("/");
};

const generateCode = async () => {
  if (!inputValue.value.trim()) {
    return;
  }

  isGenerating.value = true;

  // 模拟生成动画
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (codeType.value === "qrcode") {
    try {
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, inputValue.value, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      codeImage.value = canvas.toDataURL("image/png");
    } catch (err) {
      console.error("二维码生成失败:", err);
    }
  } else {
    codeImage.value = generateBarcode(inputValue.value);
  }

  isGenerating.value = false;
};

const generateBarcode = (text: string): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  canvas.width = 300;
  canvas.height = 100;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";

  let x = 20;
  const barWidth = 2;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      const isBlack = (charCode >> j) & 1;
      if (isBlack) {
        ctx.fillRect(x, 10, barWidth, 70);
      }
      x += barWidth + 1;
    }
    x += barWidth;
  }

  return canvas.toDataURL("image/png");
};

const switchType = (type: "qrcode" | "barcode") => {
  codeType.value = type;
  codeImage.value = "";
};
</script>

<template>
  <div class="code-generator-page">
    <!-- 顶部导航栏 -->
    <PageHeader
      title="码生成器"
      :icon="QrCode"
      :show-back="true"
      @back="goBack"
    />

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- 类型切换 -->
        <div class="type-switch">
          <div
            class="type-btn"
            :class="{ active: codeType === 'qrcode' }"
            @click="switchType('qrcode')"
          >
            <QrCode :size="20" />
            <span>二维码</span>
          </div>
          <div
            class="type-btn"
            :class="{ active: codeType === 'barcode' }"
            @click="switchType('barcode')"
          >
            <Barcode :size="20" />
            <span>条形码</span>
          </div>
        </div>

        <!-- 输入区 -->
        <div class="input-section">
          <el-input
            v-model="inputValue"
            :placeholder="
              codeType === 'qrcode'
                ? '请输入要生成二维码的内容'
                : '请输入要生成条形码的内容'
            "
            size="large"
            clearable
            @keyup.enter="generateCode"
          />
        </div>

        <!-- 生成按钮 -->
        <div class="generate-btn-wrapper">
          <el-button
            type="primary"
            size="large"
            class="generate-btn"
            :loading="isGenerating"
            :disabled="!inputValue.trim()"
            @click="generateCode"
          >
            <Sparkles :size="18" class="btn-icon" />
            生成{{ codeType === "qrcode" ? "二维码" : "条形码" }}
          </el-button>
        </div>

        <!-- 展示区 -->
        <div class="display-section">
          <div v-if="codeImage" class="code-display">
            <img
              :src="codeImage"
              :alt="codeType === 'qrcode' ? '二维码' : '条形码'"
              class="code-image"
            />
            <p class="code-text">{{ inputValue }}</p>
          </div>
          <div v-else class="empty-display">
            <QrCode :size="80" class="empty-icon" />
            <p class="empty-text">输入内容后点击生成按钮</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.code-generator-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
  overflow: hidden;
}

.main-content {
  margin-top: 64px;
  padding: 40px 24px;
}

.content-wrapper {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.type-switch {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.type-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f5f7fa;
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}

.type-btn:hover {
  background: #ecf5ff;
  color: #409eff;
}

.type-btn.active {
  background: #409eff;
  color: #ffffff;
}

.input-section {
  margin-bottom: 20px;
}

.generate-btn-wrapper {
  margin-bottom: 32px;
}

.generate-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.generate-btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn-icon {
  margin-right: 6px;
}

.display-section {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-display {
  text-align: center;
  width: 100%;
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.code-image {
  max-width: 256px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.code-text {
  margin-top: 16px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.empty-display {
  text-align: center;
  color: #c0c4cc;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 24px;
  }
}
</style>
