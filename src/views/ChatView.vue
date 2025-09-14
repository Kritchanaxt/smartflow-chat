<template>
  <div class="h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Chat Sidebar -->
    <div class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h2>
          <button
            @click="startNewChat"
            class="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <PlusIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Chat List -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-2 space-y-2">
          <div
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat.id)"
            class="p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
              'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800': selectedChatId === chat.id,
              'bg-gray-50 dark:bg-gray-700/50': selectedChatId !== chat.id
            }"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ chat.title }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                  {{ chat.lastMessage }}
                </p>
              </div>
              <div class="text-xs text-gray-400 dark:text-gray-500 ml-2">
                {{ chat.time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Main Area -->
    <div class="flex-1 flex flex-col">
      <!-- Chat Header -->
      <div class="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-vue rounded-full flex items-center justify-center">
              <ChatBubbleLeftRightIcon class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">SmartFlow Assistant</h3>
              <p class="text-sm text-green-600 dark:text-green-400 flex items-center">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <CogIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.isUser ? 'justify-end' : 'justify-start'"
        >
          <div class="flex items-end space-x-2 max-w-xs lg:max-w-md">
            <!-- Bot Avatar -->
            <div v-if="!message.isUser" class="w-8 h-8 bg-gradient-vue rounded-full flex items-center justify-center">
              <CpuChipIcon class="h-5 w-5 text-white" />
            </div>

            <!-- Message Bubble -->
            <div
              class="px-4 py-2 rounded-lg shadow-sm animate-slide-up"
              :class="{
                'bg-primary-600 text-white': message.isUser,
                'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600': !message.isUser
              }"
            >
              <p class="text-sm">{{ message.content }}</p>
              <p class="text-xs opacity-75 mt-1">{{ message.time }}</p>
            </div>

            <!-- User Avatar -->
            <div v-if="message.isUser" class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <UserIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start animate-fade-in">
          <div class="flex items-end space-x-2">
            <div class="w-8 h-8 bg-gradient-vue rounded-full flex items-center justify-center">
              <CpuChipIcon class="h-5 w-5 text-white" />
            </div>
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg">
              <div class="typing-dots text-gray-500 dark:text-gray-400">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="flex-1 relative">
            <input
              v-model="newMessage"
              @keydown.enter="sendMessage"
              :disabled="isTyping"
              placeholder="Type your message..."
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border-0 focus:ring-2 focus:ring-primary-600 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
            />
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim() || isTyping"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <PaperAirplaneIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import {
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'

interface Message {
  id: number
  content: string
  isUser: boolean
  time: string
}

interface Chat {
  id: number
  title: string
  lastMessage: string
  time: string
}

const selectedChatId = ref(1)
const newMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()

const chats = ref<Chat[]>([
  {
    id: 1,
    title: 'General Assistance',
    lastMessage: 'How can I help you today?',
    time: '2m ago',
  },
  {
    id: 2,
    title: 'API Integration',
    lastMessage: 'Here\'s the documentation for our API...',
    time: '1h ago',
  },
  {
    id: 3,
    title: 'Workflow Setup',
    lastMessage: 'Your workflow has been configured successfully',
    time: '3h ago',
  },
])

const messages = ref<Message[]>([
  {
    id: 1,
    content: 'Hello! I\'m your SmartFlow AI assistant. How can I help you today?',
    isUser: false,
    time: '10:00 AM',
  },
  {
    id: 2,
    content: 'Hi! I need help setting up a new workflow for customer onboarding.',
    isUser: true,
    time: '10:01 AM',
  },
  {
    id: 3,
    content: 'I\'d be happy to help you set up a customer onboarding workflow! Let me guide you through the process. First, let\'s define what steps you want to include in your onboarding process.',
    isUser: false,
    time: '10:01 AM',
  },
])

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return

  // Add user message
  const userMessage: Message = {
    id: messages.value.length + 1,
    content: newMessage.value,
    isUser: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }

  messages.value.push(userMessage)
  const messageContent = newMessage.value
  newMessage.value = ''

  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Show typing indicator
  isTyping.value = true

  // Simulate AI response
  setTimeout(() => {
    const botMessage: Message = {
      id: messages.value.length + 1,
      content: generateBotResponse(messageContent),
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    messages.value.push(botMessage)
    isTyping.value = false

    nextTick(() => {
      scrollToBottom()
    })
  }, 1500)
}

const generateBotResponse = (userMessage: string): string => {
  const responses = [
    'I understand your request. Let me help you with that step by step.',
    'That\'s a great question! Here\'s what I recommend...',
    'Based on your needs, I suggest we start by configuring the workflow triggers.',
    'I can help you integrate that with our API. Let me show you the documentation.',
    'That sounds like a perfect use case for our automation features!',
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const selectChat = (chatId: number) => {
  selectedChatId.value = chatId
  // In a real app, you would load messages for the selected chat
}

const startNewChat = () => {
  const newChat: Chat = {
    id: chats.value.length + 1,
    title: `New Chat ${chats.value.length + 1}`,
    lastMessage: 'Start a conversation...',
    time: 'now',
  }
  
  chats.value.unshift(newChat)
  selectedChatId.value = newChat.id
  
  // Reset messages for new chat
  messages.value = [
    {
      id: 1,
      content: 'Hello! I\'m ready to help you. What would you like to know?',
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]
}

onMounted(() => {
  scrollToBottom()
})
</script>