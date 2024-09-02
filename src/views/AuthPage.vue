<template>
  <div class="form">
    <ul class="tab-group">
      <li :class="{ active: activeTab === 'signup' }" class="tab">
        <a href="#" @click.prevent="activeTab = 'signup'">Sign Up</a>
      </li>
      <li :class="{ active: activeTab === 'login' }" class="tab">
        <a href="#" @click.prevent="activeTab = 'login'">Log In</a>
      </li>
    </ul>

    <div class="tab-content">
      <!-- スライドとフェードアニメーション用のトランジション -->
      <transition name="slide-fade" mode="out-in">
        <component :is="currentForm" :key="activeTab" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

const activeTab = ref('signup') // 初期値を'Sign Up'に設定

// 現在表示するフォームコンポーネントを計算
const currentForm = computed(() => (activeTab.value === 'signup' ? SignupForm : LoginForm))
</script>
