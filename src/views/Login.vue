<script setup lang="ts">
import { ref } from "vue";
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

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.error("请输入用户名和密码");
    return;
  }

  loading.value = true;

  // 模拟异步操作
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
      <div class="background-pattern"></div>
    </div>

    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">个人相册管理系统</h1>
        <p class="login-subtitle">欢迎登录，开始浏览您的相册</p>
      </div>

      <el-form class="login-form" @submit.prevent="handleLogin">
        <el-form-item>
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

        <el-form-item>
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

        <el-form-item>
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
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(120, 119, 198, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 177, 153, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 20%,
      rgba(74, 144, 226, 0.2) 0%,
      transparent 50%
    );
}

.login-card {
  position: relative;
  width: 420px;
  padding: 40px 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
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
}

.login-button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

.input-icon {
  color: #909399;
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
