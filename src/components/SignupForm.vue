<template>
  <div class="form-container">
    <h1>Become a member!</h1>
    <form @submit.prevent="handleSignup">
      <div class="top-row">
        <div class="field-wrap">
          <input
            type="text"
            v-model="firstName"
            required
            autocomplete="off"
            placeholder="First Name"
          />
        </div>
        <div class="field-wrap">
          <input
            type="text"
            v-model="lastName"
            required
            autocomplete="off"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="field-wrap">
        <input
          type="email"
          v-model="email"
          required
          autocomplete="off"
          placeholder="Email Address"
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
      <button type="submit" class="button">Get Started</button>
    </form>

    <!-- モーダル -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>"Registration Complete"</h2>
        <p>Go Login!!</p>
        <button @click="closeModal" class="modal-button">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const showModal = ref(false)

const handleSignup = async () => {
  try {
    const response = await axios.post('http://localhost:5000/signup', {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value
    })

    // サインアップ成功時の処理
    console.log('Signup response:', response.data)
    showModal.value = true
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message)
  }
}

const closeModal = () => {
  showModal.value = false
  // フォームのリセット
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style scoped>
/* main.cssのスタイルを基にモーダルのスタイルを追加 */
</style>
