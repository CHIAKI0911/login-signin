<template>
  <div class="profile-container">
    <h1>User Profile</h1>
    <div v-if="user">
      <h2>ログイン成功</h2>
      <p>login Email: {{ user.email }}</p>
      <p>login Name: {{ user.first_name }}{{ user.last_name }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }

    const response = await axios.get('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    user.value = response.data
  } catch (error) {
    console.error('Error fetching user data:', error.response ? error.response.data : error.message)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
}

p {
  font-size: 18px;
}
</style>
