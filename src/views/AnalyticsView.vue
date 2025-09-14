<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 lg:py-12 xl:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 lg:mb-12 xl:mb-16">
        <h1 class="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-4">Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-300 text-base lg:text-lg xl:text-xl">Monitor your chatbot performance and user interactions</p>
      </div>

      <!-- Metrics Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10 mb-8 lg:mb-12 xl:mb-16">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.title"
          class="metric-card animate-slide-up"
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
        <div class="chart-card animate-slide-left">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversations Over Time</h3>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div
              v-for="(bar, index) in conversationData"
              :key="index"
              class="chart-bar"
              :style="{ height: `${bar.value}%`, animationDelay: `${index * 100}ms` }"
              :title="`${bar.label}: ${bar.count} conversations`"
            ></div>
          </div>
          <div class="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span v-for="bar in conversationData" :key="bar.label">{{ bar.label }}</span>
          </div>
        </div>

        <!-- User Satisfaction -->
        <div class="satisfaction-card animate-slide-right">
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
      <div class="interactions-card animate-fade-in">
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
                class="interaction-row"
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

/* Enhanced Hover Effects */

/* Metric Cards */
.metric-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.dark .metric-card {
  background-color: rgb(31 41 55);
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(65, 184, 131, 0.1), transparent);
  transition: left 0.5s ease;
}

.metric-card:hover::before {
  left: 100%;
}

.metric-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(65, 184, 131, 0.15);
  border: 1px solid rgba(65, 184, 131, 0.2);
}

.dark .metric-card:hover {
  box-shadow: 0 20px 40px rgba(79, 192, 141, 0.15);
  border-color: rgba(79, 192, 141, 0.2);
}

/* Chart Cards */
.chart-card, .satisfaction-card, .interactions-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dark .chart-card, .dark .satisfaction-card, .dark .interactions-card {
  background-color: rgb(31 41 55);
}

.chart-card:hover, .satisfaction-card:hover, .interactions-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .chart-card:hover, .dark .satisfaction-card:hover, .dark .interactions-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Chart Bars */
.chart-bar {
  background: linear-gradient(135deg, #41b883, #4fc08d);
  border-radius: 0.25rem 0.25rem 0 0;
  flex: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.chart-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.chart-bar:hover::before {
  opacity: 1;
}

.chart-bar:hover {
  transform: scaleY(1.05) scaleX(1.1);
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.3);
  filter: brightness(1.1);
}

/* Satisfaction Card Special Effect */
.satisfaction-card:hover svg circle:last-of-type {
  filter: drop-shadow(0 0 8px rgba(65, 184, 131, 0.5));
}

/* Interaction Rows */
.interaction-row {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.interaction-row:hover {
  background: linear-gradient(90deg, rgba(65, 184, 131, 0.05), rgba(79, 192, 141, 0.05));
  transform: translateX(4px);
  box-shadow: inset 4px 0 0 #41b883;
}

.dark .interaction-row:hover {
  background: linear-gradient(90deg, rgba(79, 192, 141, 0.05), rgba(65, 184, 131, 0.05));
  box-shadow: inset 4px 0 0 #4fc08d;
}

/* Pulse Animation for Active Elements */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.metric-card:hover .text-2xl {
  animation: pulse 2s infinite;
  color: #41b883;
}

.dark .metric-card:hover .text-2xl {
  color: #4fc08d;
}

/* Glow Effect for Icons */
.metric-card:hover [class*="icon"] {
  filter: drop-shadow(0 0 8px currentColor);
  transform: scale(1.1) rotate(5deg);
}

/* Loading Shimmer Effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.chart-card::after, .satisfaction-card::after, .interactions-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.chart-card:hover::after, .satisfaction-card:hover::after, .interactions-card:hover::after {
  transform: translateX(100%);
}
</style>