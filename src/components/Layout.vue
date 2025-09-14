<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-vue rounded-lg flex items-center justify-center shadow-lg">
              <ChatBubbleLeftRightIcon class="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">SmartFlow Chat</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">AI-Powered Chatbot Platform</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="$route.path === item.href 
                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </router-link>
          </nav>

          <!-- Right side actions -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              :class="{ 'animate-spin': isToggling }"
            >
              <SunIcon v-if="isDark" class="h-5 w-5 text-yellow-500" />
              <MoonIcon v-else class="h-5 w-5 text-gray-600" />
            </button>

            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <XMarkIcon v-else class="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="mobileMenuOpen = false"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              :class="$route.path === item.href 
                ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              <component :is="item.icon" class="h-6 w-6" />
              <span>{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition
          :name="route.meta.transition || 'vue'"
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2 mb-4 md:mb-0">
            <div class="w-6 h-6 bg-gradient-vue rounded flex items-center justify-center">
              <ChatBubbleLeftRightIcon class="h-4 w-4 text-white" />
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              © 2025 SmartFlow Chat. Powered by Vue.js & LangChain
            </span>
          </div>
          <div class="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Documentation</a>
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Support</a>
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon,
  CogIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const isToggling = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleOvalLeftEllipsisIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

const toggleTheme = () => {
  isToggling.value = true
  setTimeout(() => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    isToggling.value = false
  }, 150)
}

onMounted(() => {
  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
/* Page transition animations */
.vue-enter-active,
.vue-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vue-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.vue-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>