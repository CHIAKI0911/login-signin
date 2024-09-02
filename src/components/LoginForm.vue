<template>
  <div class="form-container">
    <h1>Welcome Back!</h1>
    <form @submit.prevent="handleLogin">
      <div class="field-wrap">
        <input
          type="email"
          v-model="email"
          required
          autocomplete="off"
          placeholder="example@email"
        />
      </div>
      <div class="field-wrap">
        <input
          type="password"
          v-model="password"
          required
          autocomplete="off"
          placeholder="Password"
        />
      </div>
      <!-- パスワードリセットリクエストページへのリンク -->
      <p class="forgot"><a @click="goToResetRequest">Forgot Password?</a></p>
      <button class="button button-block">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.token) // トークンをローカルストレージに保存
    router.push('/profile') // プロフィールページにリダイレクト
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message)
  }
}

// パスワードリセットリクエストページに遷移する関数
const goToResetRequest = () => {
  router.push('/reset-password-request')
}
</script>
