<template>
  <div class="password-reset-container">
    <div class="form-wrapper">
      <h1>Forgot Password</h1>
      <form @submit.prevent="requestPasswordReset" class="password-reset-form">
        <div class="input-group">
          <input
            type="email"
            v-model="email"
            required
            autocomplete="off"
            placeholder="Enter your email"
            class="email-input"
          />
        </div>
        <button class="submit-button">Send Reset Link</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')

const requestPasswordReset = async () => {
  try {
    await axios.post('http://localhost:5000/reset-password/request', {
      email: email.value
    })
    alert('Password reset link sent to your email.')
  } catch (error) {
    console.error(
      'Error requesting password reset:',
      error.response ? error.response.data : error.message
    )
    alert('Error requesting password reset.')
  }
}
</script>

<style scoped>
.password-reset-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #d1cfcf 0%, #7259b0 100%);
}

.form-wrapper {
  background: rgba(19, 35, 47, 0.9);
  padding: 40px;
  width: 100%;
  max-width: 500px; /* 幅を調整 */
  border-radius: 8px; /* 少し丸みをつける */
  box-shadow: 0 6px 12px rgba(19, 35, 47, 0.3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  color: #ffffff;
  font-weight: 300;
  margin-bottom: 30px;
}

.password-reset-form {
  width: 100%;
}

.input-group {
  margin-bottom: 30px;
}

.email-input {
  font-size: 18px;
  display: block;
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid #a0b3b0;
  color: #ffffff;
  border-radius: 4px; /* 丸みをつける */
  transition: border-color 0.25s ease;
  box-sizing: border-box;
}

.email-input:focus {
  outline: 0;
  border-color: #1ab188;
}

.submit-button {
  display: block;
  width: 100%;
  border: 0;
  padding: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  background: #1ab188;
  color: #ffffff;
  border-radius: 4px; /* 丸みをつける */
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.submit-button:hover,
.submit-button:focus {
  background: #158775;
}
</style>
