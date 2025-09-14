<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-300">Monitor your chatbot performance and user interactions</p>
      </div>

      <!-- Metrics Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.title"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-200 animate-slide-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ metric.title }}</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metric.value }}</p>
              <div class="flex items-center mt-2">
                <component
                  :is="metric.trend === 'up' ? ArrowUpIcon : ArrowDownIcon"
                  class="h-4 w-4 mr-1"
                  :class="metric.trend === 'up' ? 'text-green-500' : 'text-red-500'"
                />
                <span
                  class="text-sm font-medium"
                  :class="metric.trend === 'up' ? 'text-green-500' : 'text-red-500'"
                >
                  {{ metric.change }}
                </span>
              </div>
            </div>
            <div class="p-3 rounded-full" :class="metric.iconBg">
              <component :is="metric.icon" class="h-6 w-6" :class="metric.iconColor" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Conversations Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-slide-left">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversations Over Time</h3>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div
              v-for="(bar, index) in conversationData"
              :key="index"
              class="bg-gradient-vue rounded-t flex-1 transition-all duration-500 hover:opacity-80"
              :style="{ height: `${bar.value}%`, animationDelay: `${index * 100}ms` }"
              :title="`${bar.label}: ${bar.count} conversations`"
            ></div>
          </div>
          <div class="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span v-for="bar in conversationData" :key="bar.label">{{ bar.label }}</span>
          </div>
        </div>

        <!-- User Satisfaction -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-slide-right">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Satisfaction</h3>
          <div class="relative h-64 flex items-center justify-center">
            <!-- Circular Progress -->
            <div class="relative w-48 h-48">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  class="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  stroke-width="8"
                  fill="transparent"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="251.2 - (251.2 * satisfactionScore / 100)"
                  class="transition-all duration-1000 ease-out"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#41b883;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#35495e;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ satisfactionScore }}%</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Interactions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fade-in">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Interactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Message
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="interaction in recentInteractions"
                :key="interaction.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserIcon class="h-5 w-5 text-gray-600" />
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ interaction.user }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                    {{ interaction.message }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': interaction.status === 'resolved',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400': interaction.status === 'pending',
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400': interaction.status === 'in-progress'
                    }"
                  >
                    {{ interaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ interaction.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex">
                      <StarIcon
                        v-for="star in 5"
                        :key="star"
                        class="h-4 w-4"
                        :class="star <= interaction.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                      />
                    </div>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ interaction.rating }}/5</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

interface Metric {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
  iconBg: string
  iconColor: string
}

interface Interaction {
  id: number
  user: string
  message: string
  status: 'resolved' | 'pending' | 'in-progress'
  time: string
  rating: number
}

const satisfactionScore = ref(0)

const metrics = ref<Metric[]>([
  {
    title: 'Total Messages',
    value: '12,847',
    change: '+12%',
    trend: 'up',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Active Users',
    value: '2,394',
    change: '+8%',
    trend: 'up',
    icon: UsersIcon,
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: '-15%',
    trend: 'up',
    icon: ClockIcon,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Success Rate',
    value: '94.2%',
    change: '+2%',
    trend: 'up',
    icon: StarIcon,
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
])

const conversationData = ref([
  { label: 'Mon', value: 65, count: 234 },
  { label: 'Tue', value: 78, count: 312 },
  { label: 'Wed', value: 85, count: 387 },
  { label: 'Thu', value: 72, count: 298 },
  { label: 'Fri', value: 90, count: 456 },
  { label: 'Sat', value: 45, count: 187 },
  { label: 'Sun', value: 38, count: 156 },
])

const recentInteractions = ref<Interaction[]>([
  {
    id: 1,
    user: 'John Doe',
    message: 'How do I integrate the API with my existing system?',
    status: 'resolved',
    time: '5 min ago',
    rating: 5,
  },
  {
    id: 2,
    user: 'Jane Smith',
    message: 'I need help setting up a workflow for customer support',
    status: 'in-progress',
    time: '12 min ago',
    rating: 4,
  },
  {
    id: 3,
    user: 'Mike Johnson',
    message: 'The chatbot is not responding to my queries',
    status: 'pending',
    time: '1 hour ago',
    rating: 2,
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    message: 'Great job on the new features! Very helpful.',
    status: 'resolved',
    time: '2 hours ago',
    rating: 5,
  },
  {
    id: 5,
    user: 'Alex Brown',
    message: 'Can you help me with the pricing information?',
    status: 'resolved',
    time: '3 hours ago',
    rating: 4,
  },
])

onMounted(() => {
  // Animate satisfaction score
  setTimeout(() => {
    satisfactionScore.value = 87
  }, 500)
})
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out;
}

.animate-slide-right {
  animation: slideRight 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
</style>