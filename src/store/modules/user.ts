import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    username: ''
  }),

  actions: {
    login(username: string, password: string): boolean {
      // 固定账号密码验证
      if (username === 'admin' && password === '123456') {
        this.isAuthenticated = true
        this.username = username
        // 持久化到 localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', username)
        return true
      }
      return false
    },

    logout() {
      this.isAuthenticated = false
      this.username = ''
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('username')
    },

    // 从 localStorage 恢复状态
    restoreFromStorage() {
      const isAuth = localStorage.getItem('isAuthenticated')
      const username = localStorage.getItem('username')
      if (isAuth === 'true' && username) {
        this.isAuthenticated = true
        this.username = username
      }
    }
  }
})