<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { User, Lock } from "lucide-vue-next";

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref({
  username: "admin",
  password: "123456",
});

const loading = ref(false);
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.error("请输入用户名和密码");
    return;
  }

  loading.value = true;

  setTimeout(() => {
    const success = userStore.login(
      loginForm.value.username,
      loginForm.value.password,
    );

    if (success) {
      ElMessage.success("登录成功");
      router.push("/");
    } else {
      ElMessage.error("用户名或密码错误");
    }

    loading.value = false;
  }, 500);
};
</script>

<template>
  <div class="login-container">
    <div class="login-background">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
      <div class="bg-shape shape-4"></div>
    </div>

    <div class="login-card" :class="{ 'card-visible': isVisible }">
      <div class="login-header">
        <h1 class="login-title">Dawson 个人管理系统</h1>
        <p class="login-subtitle">欢迎登录，开始使用您的个人空间</p>
      </div>

      <el-form class="login-form" @submit.prevent="handleLogin">
        <el-form-item class="form-item-1">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
          >
            <template #prefix>
              <User class="input-icon" :size="18" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="form-item-2">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          >
            <template #prefix>
              <Lock class="input-icon" :size="18" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="form-item-3">
          <el-button
            type="primary"
            size="large"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p class="hint-text">提示：固定账号密码为 admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #667eea;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: #764ba2;
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: #f093fb;
  top: 50%;
  left: 10%;
  animation-delay: -10s;
}

.shape-4 {
  width: 350px;
  height: 350px;
  background: #4facfe;
  bottom: 10%;
  right: 20%;
  animation-delay: -15s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 30px) scale(1.02);
  }
}

.login-card {
  position: relative;
  width: 420px;
  padding: 40px 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.login-card.card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.login-card.card-visible .login-header {
  animation: fadeInDown 0.6s ease 0.2s both;
}

.login-card.card-visible .form-item-1 {
  animation: fadeInUp 0.5s ease 0.3s both;
}

.login-card.card-visible .form-item-2 {
  animation: fadeInUp 0.5s ease 0.4s both;
}

.login-card.card-visible .form-item-3 {
  animation: fadeInUp 0.5s ease 0.5s both;
}

.login-card.card-visible .login-footer {
  animation: fadeIn 0.5s ease 0.6s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px;
}

.login-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

.login-form {
  width: 100%;
}

.login-form :deep(.el-input) {
  margin-bottom: 20px;
}

.login-form :deep(.el-input__wrapper) {
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.login-button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.login-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.login-button:active {
  transform: translateY(-1px) scale(0.99);
}

.input-icon {
  color: #909399;
  transition: color 0.3s ease;
}

.login-form :deep(.el-input__wrapper.is-focus) .input-icon {
  color: #409eff;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
}

.hint-text {
  font-size: 13px;
  color: #95a5a6;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 30px 25px 20px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
