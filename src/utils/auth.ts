import { useUserStore } from '@/store/modules/user'

// 固定账号密码
export const FIXED_CREDENTIALS = {
  username: 'admin',
  password: '123456'
}

// 验证账号密码
export function validateCredentials(username: string, password: string): boolean {
  return username === FIXED_CREDENTIALS.username && password === FIXED_CREDENTIALS.password
}

// 检查是否已登录
export function isAuthenticated(): boolean {
  const userStore = useUserStore()
  return userStore.isAuthenticated
}

// 获取当前用户名
export function getCurrentUsername(): string {
  const userStore = useUserStore()
  return userStore.username
}