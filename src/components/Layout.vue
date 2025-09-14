<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header 
      v-if="!isChatViewOnMobile"
      class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 xl:h-20 2xl:h-24">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-gradient-vue rounded-lg flex items-center justify-center shadow-lg">
              <ChatBubbleLeftRightIcon class="h-6 w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8 text-white" />
            </div>
            <div>
              <h1 class="text-xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white">SmartFlow Chat</h1>
              <p class="text-xs xl:text-sm text-gray-500 dark:text-gray-400">AI-Powered Chatbot Platform</p>
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
    <main :class="isChatViewOnMobile ? 'full-height' : 'flex-1'">
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
    <footer 
      v-if="!isChatViewOnMobile"
      class="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t border-gray-700 dark:border-gray-800"
    >
      <!-- Decorative gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 gradient-pulse"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <!-- Main footer content -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <!-- Brand section -->
          <div class="flex flex-col items-center md:items-start space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-vue rounded-lg flex items-center justify-center shadow-lg ring-2 ring-white/20 footer-float">
                <ChatBubbleLeftRightIcon class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">SmartFlow Chat</h3>
                <p class="text-xs text-gray-300">AI-Powered Platform</p>
              </div>
            </div>
            <p class="text-sm text-gray-300 text-center md:text-left max-w-xs">
              Building intelligent conversations with the power of modern AI technology.
            </p>
          </div>

          <!-- Quick links -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-sm font-semibold text-white mb-4 flex items-center">
              <span class="w-2 h-2 bg-gradient-vue rounded-full mr-2"></span>
              Quick Links
            </h4>
            <div class="space-y-2">
              <a href="#" class="footer-link">
                <HomeIcon class="h-4 w-4" />
                Dashboard
              </a>
              <a href="#" class="footer-link">
                <ChatBubbleOvalLeftEllipsisIcon class="h-4 w-4" />
                Start Chatting
              </a>
              <a href="#" class="footer-link">
                <ChartBarIcon class="h-4 w-4" />
                Analytics
              </a>
            </div>
          </div>

          <!-- Resources -->
          <div class="flex flex-col items-center md:items-start">
            <h4 class="text-sm font-semibold text-white mb-4 flex items-center">
              <span class="w-2 h-2 bg-gradient-vue rounded-full mr-2"></span>
              Resources
            </h4>
            <div class="space-y-2">
              <a href="#" class="footer-link">
                <BookOpenIcon class="h-4 w-4" />
                Documentation
              </a>
              <a href="#" class="footer-link">
                <CodeBracketIcon class="h-4 w-4" />
                API Reference
              </a>
              <a href="#" class="footer-link">
                <LifebuoyIcon class="h-4 w-4" />
                Support
              </a>
              <a href="#" class="footer-link">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-700/50 mb-6"></div>

        <!-- Bottom section -->
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <span>© 2025 SmartFlow Chat</span>
          </div>
        </div>
        
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
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
  BookOpenIcon,
  CodeBracketIcon,
  LifebuoyIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const isToggling = ref(false)
const isMobile = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleOvalLeftEllipsisIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

// Computed property to check if we're in chat view on mobile
const isChatViewOnMobile = computed(() => {
  return route.path === '/chat' && isMobile.value
})

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

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Handle window resize
const handleResize = () => {
  checkMobile()
  if (!isMobile.value) {
    mobileMenuOpen.value = false
  }
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
  
  // Initialize mobile detection
  checkMobile()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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

.full-height {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile browsers */
}
</style>