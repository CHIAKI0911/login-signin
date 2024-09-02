import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/views/AuthPage.vue' // ログイン・サインアップページ
import Profile from '@/views/Profile.vue' // プロフィールページ

const routes = [
  {
    path: '/',
    name: 'AuthPage',
    component: AuthPage // デフォルトのルートで AuthPage を表示
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/LoginForm.vue') // ログインコンポーネント
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/components/SignupForm.vue') // サインアップコンポーネント
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile // プロフィールページ
  },
  {
    path: '/reset-password-request',
    name: 'PasswordResetRequest',
    component: () => import('@/views/PasswordResetRequest.vue') // パスワードリセットリクエストページ
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue') // パスワードリセットページ
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
