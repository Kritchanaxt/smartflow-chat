<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 lg:py-12 xl:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-12 lg:mb-16 xl:mb-20">
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Welcome to
            <span class="bg-gradient-vue bg-clip-text text-transparent">SmartFlow Chat</span>
          </h1>
          <p class="text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 xl:mb-16 max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
            An intelligent chatbot platform that combines the power of  <br>
            <span class="text-primary-600 dark:text-primary-400 font-semibold">LangChain (AI)</span> and 
            <span class="text-primary-600 dark:text-primary-400 font-semibold">n8n (Workflow)</span> 
            to create intelligent conversations and actions.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 lg:gap-6 xl:gap-8 justify-center">
            <router-link
              to="/chat"
              class="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-vue text-white font-semibold rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 glow-effect text-base lg:text-lg"
            >
              <ChatBubbleOvalLeftEllipsisIcon class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 mr-2 lg:mr-3" />
              Start Chatting
            </router-link>
            <router-link
              to="/analytics"
              class="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base lg:text-lg"
            >
              <ChartBarIcon class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 mr-2 lg:mr-3" />
              View Analytics
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mb-12 lg:mb-16 xl:mb-20">
        <div
          v-for="(stat, index) in stats"
          :key="stat.title"
          class="home-stat-card animate-slide-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ stat.title }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <ArrowUpIcon class="h-4 w-4 mr-1" />
                {{ stat.change }}
              </p>
            </div>
            <div class="p-3 rounded-full" :class="stat.iconBg">
              <component :is="stat.icon" class="h-6 w-6" :class="stat.iconColor" />
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 mb-12 lg:mb-16 xl:mb-20">
        <!-- AI Features -->
        <div class="home-feature-card ai-features animate-slide-left">
          <div class="flex items-center mb-6">
            <div class="feature-icon-container bg-blue-100 dark:bg-blue-900/20">
              <CpuChipIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white ml-4">AI Intelligence</h3>
          </div>
          <div class="space-y-4">
            <div v-for="feature in aiFeatures" :key="feature.title" class="feature-item">
              <CheckCircleIcon class="feature-check-icon" />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h4>
                <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow Features -->
        <div class="home-feature-card workflow-features animate-slide-right">
          <div class="flex items-center mb-6">
            <div class="feature-icon-container bg-purple-100 dark:bg-purple-900/20">
              <CogIcon class="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white ml-4">Workflow Automation</h3>
          </div>
          <div class="space-y-4">
            <div v-for="feature in workflowFeatures" :key="feature.title" class="feature-item">
              <CheckCircleIcon class="feature-check-icon" />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h4>
                <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="home-activity-card animate-fade-in">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon-container" :class="activity.iconBg">
              <component :is="activity.icon" class="h-5 w-5" :class="activity.iconColor" />
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}</p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon,
  CpuChipIcon,
  CogIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  UsersIcon,
  BoltIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'

const stats = ref([
  {
    title: 'Total Conversations',
    value: '2,847',
    change: '+12% from last month',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Active Users',
    value: '1,294',
    change: '+8% from last month',
    icon: UsersIcon,
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Workflows',
    value: '156',
    change: '+23% from last month',
    icon: BoltIcon,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
])

const aiFeatures = ref([
  {
    title: 'Natural Language Processing',
    description: 'Advanced NLP capabilities powered by LangChain for human-like conversations.',
  },
  {
    title: 'Context Awareness',
    description: 'Maintains conversation context across multiple interactions for better responses.',
  },
  {
    title: 'Multi-language Support',
    description: 'Supports multiple languages with automatic language detection and translation.',
  },
  {
    title: 'Sentiment Analysis',
    description: 'Understands user emotions and responds appropriately to improve user experience.',
  },
])

const workflowFeatures = ref([
  {
    title: 'Visual Workflow Builder',
    description: 'Drag-and-drop interface powered by n8n for creating complex automation flows.',
  },
  {
    title: 'API Integrations',
    description: 'Connect with hundreds of external services and APIs seamlessly.',
  },
  {
    title: 'Conditional Logic',
    description: 'Create branching workflows based on user inputs and system conditions.',
  },
  {
    title: 'Real-time Monitoring',
    description: 'Track workflow execution in real-time with detailed logs and analytics.',
  },
])

const recentActivity = ref([
  {
    id: 1,
    title: 'New conversation started',
    description: 'User initiated a support request about API integration',
    time: '2 min ago',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: 'Workflow executed',
    description: 'Customer onboarding workflow completed successfully',
    time: '5 min ago',
    icon: BoltIcon,
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 3,
    title: 'System update',
    description: 'LangChain model updated to latest version',
    time: '1 hour ago',
    icon: CogIcon,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 4,
    title: 'New user registered',
    description: 'john.doe@example.com joined the platform',
    time: '2 hours ago',
    icon: UsersIcon,
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
])
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
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

/* Enhanced Hover Effects for Home Page */

/* Home Page Responsive Enhancements */

/* Stat Cards */
.home-stat-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* Large screen responsive adjustments */
@media (min-width: 1024px) {
  .home-stat-card {
    padding: 2rem;
    border-radius: 1rem;
  }
}

@media (min-width: 1280px) {
  .home-stat-card {
    padding: 2.5rem;
    border-radius: 1.25rem;
  }
}

@media (min-width: 1536px) {
  .home-stat-card {
    padding: 3rem;
    border-radius: 1.5rem;
  }
}

.dark .home-stat-card {
  background-color: rgb(31 41 55);
}

.home-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(65, 184, 131, 0.1), transparent);
  transition: left 0.5s ease;
}

.home-stat-card:hover::before {
  left: 100%;
}

.home-stat-card:hover {
  transform: translateY(-12px) scale(1.05);
  box-shadow: 0 25px 50px rgba(65, 184, 131, 0.15);
  border: 1px solid rgba(65, 184, 131, 0.2);
}

.dark .home-stat-card:hover {
  box-shadow: 0 25px 50px rgba(79, 192, 141, 0.15);
  border-color: rgba(79, 192, 141, 0.2);
}

/* Feature Cards */
.home-feature-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .home-feature-card {
    padding: 2.5rem;
    border-radius: 1rem;
  }
}

@media (min-width: 1280px) {
  .home-feature-card {
    padding: 3rem;
    border-radius: 1.25rem;
  }
}

@media (min-width: 1536px) {
  .home-feature-card {
    padding: 3.5rem;
    border-radius: 1.5rem;
  }
}

.dark .home-feature-card {
  background-color: rgb(31 41 55);
}

.home-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .home-feature-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* AI Features Special Effect */
.ai-features:hover {
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.dark .ai-features:hover {
  box-shadow: 0 20px 40px rgba(96, 165, 250, 0.15);
  border-color: rgba(96, 165, 250, 0.2);
}

/* Workflow Features Special Effect */
.workflow-features:hover {
  box-shadow: 0 20px 40px rgba(147, 51, 234, 0.15);
  border: 1px solid rgba(147, 51, 234, 0.2);
}

.dark .workflow-features:hover {
  box-shadow: 0 20px 40px rgba(196, 181, 253, 0.15);
  border-color: rgba(196, 181, 253, 0.2);
}

/* Feature Icon Container */
.feature-icon-container {
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.home-feature-card:hover .feature-icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Feature Items */
.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.feature-item:hover {
  background: rgba(65, 184, 131, 0.05);
  transform: translateX(8px);
  box-shadow: inset 4px 0 0 #41b883;
}

.dark .feature-item:hover {
  background: rgba(79, 192, 141, 0.05);
  box-shadow: inset 4px 0 0 #4fc08d;
}

/* Feature Check Icon */
.feature-check-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #10b981;
  margin-top: 0.25rem;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
}

.feature-item:hover .feature-check-icon {
  color: #059669;
  transform: scale(1.2);
}

/* Activity Card */
.home-activity-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .home-activity-card {
    padding: 2.5rem;
    border-radius: 1rem;
  }
}

@media (min-width: 1280px) {
  .home-activity-card {
    padding: 3rem;
    border-radius: 1.25rem;
  }
}

@media (min-width: 1536px) {
  .home-activity-card {
    padding: 3.5rem;
    border-radius: 1.5rem;
  }
}

.dark .home-activity-card {
  background-color: rgb(31 41 55);
}

.home-activity-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .home-activity-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Activity Items */
.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: rgb(249 250 251);
  border-radius: 0.75rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.dark .activity-item {
  background-color: rgb(55 65 81);
}

.activity-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(65, 184, 131, 0.1), rgba(79, 192, 141, 0.1));
  transition: width 0.3s ease;
}

.activity-item:hover::before {
  width: 100%;
}

.activity-item:hover {
  background-color: rgb(243 244 246);
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.15);
}

.dark .activity-item:hover {
  background-color: rgb(75 85 99);
  box-shadow: 0 8px 25px rgba(79, 192, 141, 0.15);
}

/* Activity Icon Container */
.activity-icon-container {
  padding: 0.5rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.activity-item:hover .activity-icon-container {
  transform: scale(1.1) rotate(5deg);
}

/* Hero Section Button Enhancements */
.glow-effect:hover {
  box-shadow: 0 0 30px rgba(65, 184, 131, 0.6);
  filter: brightness(1.1);
}

/* Pulse Animation for Numbers */
@keyframes pulse-number {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.home-stat-card:hover .text-3xl {
  animation: pulse-number 2s infinite;
  color: #41b883;
}

.dark .home-stat-card:hover .text-3xl {
  color: #4fc08d;
}

/* Shimmer Effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.home-feature-card::after {
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

.home-feature-card:hover::after {
  transform: translateX(100%);
}
</style>
