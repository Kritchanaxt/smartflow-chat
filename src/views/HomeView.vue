<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to
            <span class="bg-gradient-vue bg-clip-text text-transparent">SmartFlow Chat</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            An intelligent chatbot platform that combines the power of 
            <span class="text-primary-600 dark:text-primary-400 font-semibold">LangChain (AI)</span> and 
            <span class="text-primary-600 dark:text-primary-400 font-semibold">n8n (Workflow)</span> 
            to create intelligent conversations and actions.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/chat"
              class="inline-flex items-center px-6 py-3 bg-gradient-vue text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 glow-effect"
            >
              <ChatBubbleOvalLeftEllipsisIcon class="h-5 w-5 mr-2" />
              Start Chatting
            </router-link>
            <router-link
              to="/analytics"
              class="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ChartBarIcon class="h-5 w-5 mr-2" />
              View Analytics
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          v-for="(stat, index) in stats"
          :key="stat.title"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-200 animate-slide-up"
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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- AI Features -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-slide-left">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CpuChipIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white ml-4">AI-Powered Intelligence</h3>
          </div>
          <div class="space-y-4">
            <div v-for="feature in aiFeatures" :key="feature.title" class="flex items-start">
              <CheckCircleIcon class="h-5 w-5 text-green-500 mt-1 mr-3" />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h4>
                <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow Features -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-slide-right">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <CogIcon class="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white ml-4">Workflow Automation</h3>
          </div>
          <div class="space-y-4">
            <div v-for="feature in workflowFeatures" :key="feature.title" class="flex items-start">
              <CheckCircleIcon class="h-5 w-5 text-green-500 mt-1 mr-3" />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h4>
                <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-fade-in">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
            <div class="p-2 rounded-full" :class="activity.iconBg">
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
</style>
