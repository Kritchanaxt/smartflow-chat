<template>
  <div class="chat-container">
    <!-- Mobile Header (visible only on mobile) -->
    <div class="mobile-header md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div class="flex items-center justify-between">
        <button
          @click="goBack"
          class="header-button header-button-back"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </button>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">SmartFlow Chat</h1>
        <button
          @click="toggleSidebar"
          class="header-button header-button-menu"
        >
          <Bars3Icon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Sidebar Overlay (mobile only) -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="sidebar-overlay md:hidden"
    ></div>

    <!-- Chat Sidebar -->
    <div 
      class="chat-sidebar"
      :class="{
        'sidebar-open': sidebarOpen,
        'sidebar-closed': !sidebarOpen
      }"
    >
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h2>
          <div class="flex items-center space-x-2">
            <button
              @click="startNewChat"
              class="new-chat-button"
            >
              <PlusIcon class="h-5 w-5" />
            </button>
            <!-- Close button for mobile -->
            <button
              @click="closeSidebar"
              class="md:hidden header-button header-button-close"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Chat List -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-2 space-y-2">
          <div
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat.id)"
            class="chat-item"
            :class="{
              'chat-item-active': selectedChatId === chat.id,
              'chat-item-inactive': selectedChatId !== chat.id
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
    <div class="chat-main">
      <!-- Chat Header (desktop only) -->
      <div class="hidden md:block p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
      <div class="messages-container" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message-wrapper"
          :class="message.isUser ? 'message-user' : 'message-bot'"
        >
          <div class="message-content">
            <!-- Bot Avatar -->
            <div v-if="!message.isUser" class="message-avatar">
              <CpuChipIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>

            <!-- Message Bubble -->
            <div
              class="message-bubble"
              :class="{
                'message-bubble-user': message.isUser,
                'message-bubble-bot': !message.isUser
              }"
            >
              <p class="message-text">{{ message.content }}</p>
              <p class="message-time">{{ message.time }}</p>
            </div>

            <!-- User Avatar -->
            <div v-if="message.isUser" class="message-avatar message-avatar-user">
              <UserIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="message-wrapper message-bot animate-fade-in">
          <div class="message-content">
            <div class="message-avatar">
              <CpuChipIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div class="message-bubble message-bubble-bot">
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
      <div class="input-area">
        <div class="input-container">
          <div class="input-wrapper">
            <input
              v-model="newMessage"
              @keydown.enter="sendMessage"
              :disabled="isTyping"
              placeholder="Type your message..."
              class="message-input"
            />
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim() || isTyping"
              class="send-button"
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
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  UserIcon,
  PlusIcon,
  PaperAirplaneIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftIcon,
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

const router = useRouter()
const selectedChatId = ref(1)
const newMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()
const sidebarOpen = ref(false)

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

const startNewChat = () => {
  const newChat: Chat = {
    id: chats.value.length + 1,
    title: 'New Conversation',
    lastMessage: 'Start a new conversation',
    time: 'now',
  }
  
  chats.value.unshift(newChat)
  selectedChatId.value = newChat.id
  
  // Reset messages for new chat
  messages.value = [
    {
      id: 1,
      content: 'Hello! I\'m your SmartFlow AI assistant. How can I help you today?',
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]
  
  // Close sidebar on mobile after creating new chat
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const goBack = () => {
  router.push('/')
}

// Close sidebar when clicking on a chat (mobile)
const selectChat = (chatId: number) => {
  selectedChatId.value = chatId
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
  // In a real app, you would load messages for the selected chat
}

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  scrollToBottom()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Chat Container - Mobile First Approach */
.chat-container {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile browsers */
  background-color: rgb(249 250 251);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.dark .chat-container {
  background-color: rgb(17 24 39);
}

/* Mobile Header */
.mobile-header {
  flex-shrink: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 20;
}

/* Header Buttons - Base Styles */
.header-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  border-radius: 0.75rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
}

.header-button:focus-visible {
  outline: 2px solid #41b883;
  outline-offset: 2px;
}

/* Back Button */
.header-button-back {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.1), rgba(79, 192, 141, 0.1));
  color: #41b883;
  border: 1px solid rgba(65, 184, 131, 0.2);
}

.header-button-back:hover {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.15), rgba(79, 192, 141, 0.15));
  border-color: rgba(65, 184, 131, 0.3);
  transform: translateX(-2px);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.15);
}

.header-button-back:active {
  transform: translateX(-1px) scale(0.98);
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.2), rgba(79, 192, 141, 0.2));
}

.dark .header-button-back {
  color: #4fc08d;
  background: linear-gradient(135deg, rgba(79, 192, 141, 0.1), rgba(65, 184, 131, 0.1));
  border-color: rgba(79, 192, 141, 0.2);
}

.dark .header-button-back:hover {
  background: linear-gradient(135deg, rgba(79, 192, 141, 0.15), rgba(65, 184, 131, 0.15));
  border-color: rgba(79, 192, 141, 0.3);
  box-shadow: 0 4px 12px rgba(79, 192, 141, 0.15);
}

/* Menu Button */
.header-button-menu {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.header-button-menu:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
  border-color: rgba(99, 102, 241, 0.3);
  transform: rotate(90deg) scale(1.05);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.header-button-menu:active {
  transform: rotate(90deg) scale(1.02);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
}

.dark .header-button-menu {
  color: #a5b4fc;
  background: linear-gradient(135deg, rgba(165, 180, 252, 0.1), rgba(196, 181, 253, 0.1));
  border-color: rgba(165, 180, 252, 0.2);
}

.dark .header-button-menu:hover {
  background: linear-gradient(135deg, rgba(165, 180, 252, 0.15), rgba(196, 181, 253, 0.15));
  border-color: rgba(165, 180, 252, 0.3);
  box-shadow: 0 4px 12px rgba(165, 180, 252, 0.15);
}

/* Close Button */
.header-button-close {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(248, 113, 113, 0.1));
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.header-button-close:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(248, 113, 113, 0.15));
  border-color: rgba(239, 68, 68, 0.3);
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
}

.header-button-close:active {
  transform: rotate(90deg) scale(1.05);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(248, 113, 113, 0.2));
}

.dark .header-button-close {
  color: #fca5a5;
  background: linear-gradient(135deg, rgba(252, 165, 165, 0.1), rgba(254, 202, 202, 0.1));
  border-color: rgba(252, 165, 165, 0.2);
}

.dark .header-button-close:hover {
  background: linear-gradient(135deg, rgba(252, 165, 165, 0.15), rgba(254, 202, 202, 0.15));
  border-color: rgba(252, 165, 165, 0.3);
  box-shadow: 0 4px 12px rgba(252, 165, 165, 0.15);
}

/* New Chat Button */
.new-chat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  background: linear-gradient(135deg, #41b883, #4fc08d);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  outline: none;
}

.new-chat-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.new-chat-button:hover::before {
  opacity: 1;
}

.new-chat-button:hover {
  background: linear-gradient(135deg, #369870, #41b883);
  transform: scale(1.05) rotate(90deg);
  box-shadow: 0 6px 20px rgba(65, 184, 131, 0.3);
}

.new-chat-button:active {
  transform: scale(1.02) rotate(90deg);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.4);
}

.new-chat-button:focus-visible {
  outline: 2px solid #41b883;
  outline-offset: 2px;
}

/* Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  transition: opacity 0.3s ease;
}

/* Chat Sidebar */
.chat-sidebar {
  background-color: white;
  border-right: 1px solid rgb(229 231 235);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 40;
  
  /* Mobile styles */
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  height: 100dvh;
  transform: translateX(-100%);
}

.dark .chat-sidebar {
  background-color: rgb(31 41 55);
  border-right-color: rgb(75 85 99);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-closed {
  transform: translateX(-100%);
}

/* Desktop styles */
@media (min-width: 768px) {
  .chat-container {
    flex-direction: row;
  }
  
  .chat-sidebar {
    position: relative;
    width: 320px;
    transform: translateX(0);
    z-index: auto;
  }
  
  .sidebar-open,
  .sidebar-closed {
    transform: translateX(0);
  }
}

/* Large screen adjustments */
@media (min-width: 1024px) {
  .chat-sidebar {
    width: 360px;
  }
}

@media (min-width: 1280px) {
  .chat-sidebar {
    width: 400px;
  }
  
  .message-content {
    max-width: 65%;
  }
}

@media (min-width: 1536px) {
  .chat-sidebar {
    width: 450px;
  }
  
  .message-content {
    max-width: 70%;
  }
  
  .messages-container {
    padding: 2rem;
  }
  
  .input-area {
    padding: 1.5rem;
  }
}

/* Chat Main Area */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0; /* Prevent flex item from overflowing */
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scroll-behavior: smooth;
}

/* Message Wrapper */
.message-wrapper {
  display: flex;
  margin-bottom: 1rem;
  animation: messageSlideUp 0.3s ease-out;
}

.message-user {
  justify-content: flex-end;
}

.message-bot {
  justify-content: flex-start;
}

/* Message Content */
.message-content {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 85%;
}

@media (min-width: 640px) {
  .message-content {
    max-width: 75%;
  }
}

@media (min-width: 1024px) {
  .message-content {
    max-width: 60%;
  }
}

/* Message Avatar */
.message-avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #41b883, #4fc08d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .message-avatar {
    width: 2.25rem;
    height: 2.25rem;
  }
}

.message-avatar-user {
  background: rgb(156 163 175);
}

/* Message Bubble */
.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-bubble-user {
  background: linear-gradient(135deg, #41b883, #4fc08d);
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.message-bubble-bot {
  background-color: white;
  color: rgb(17 24 39);
  border: 1px solid rgb(229 231 235);
  border-bottom-left-radius: 0.25rem;
}

.dark .message-bubble-bot {
  background-color: rgb(55 65 81);
  color: white;
  border-color: rgb(75 85 99);
}

/* Message Text */
.message-text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

@media (min-width: 640px) {
  .message-text {
    font-size: 0.9rem;
  }
}

/* Message Time */
.message-time {
  font-size: 0.75rem;
  opacity: 0.75;
  margin-top: 0.25rem;
}

/* Input Area */
.input-area {
  flex-shrink: 0;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid rgb(229 231 235);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.dark .input-area {
  background-color: rgb(31 41 55);
  border-top-color: rgb(75 85 99);
}

/* Input Container */
.input-container {
  max-width: 100%;
}

/* Input Wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* Message Input */
.message-input {
  width: 100%;
  padding: 0.875rem 3.5rem 0.875rem 1rem;
  background-color: rgb(243 244 246);
  color: rgb(17 24 39);
  border: 1px solid transparent;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.2s ease;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.message-input::placeholder {
  color: rgb(107 114 128);
}

.message-input:focus {
  background-color: white;
  border-color: #41b883;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.1);
}

.dark .message-input {
  background-color: rgb(55 65 81);
  color: white;
}

.dark .message-input::placeholder {
  color: rgb(156 163 175);
}

.dark .message-input:focus {
  background-color: rgb(75 85 99);
  border-color: #4fc08d;
  box-shadow: 0 0 0 3px rgba(79, 192, 141, 0.1);
}

/* Send Button */
.send-button {
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.625rem;
  background: linear-gradient(135deg, #41b883, #4fc08d);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #369870, #41b883);
  transform: translateY(-50%) scale(1.05);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%) scale(1);
}

/* Animations */
@keyframes messageSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typing Dots Animation */
.typing-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
}

.typing-dots span {
  width: 0.375rem;
  height: 0.375rem;
  background-color: currentColor;
  border-radius: 50%;
  animation: typingPulse 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }
.typing-dots span:nth-child(3) { animation-delay: 0s; }

@keyframes typingPulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Safari-specific fixes */
@supports (-webkit-touch-callout: none) {
  .message-input {
    -webkit-appearance: none;
    border-radius: 1.5rem;
  }
  
  .messages-container {
    -webkit-overflow-scrolling: touch;
  }
}

/* Scrollbar Styling */
.messages-container::-webkit-scrollbar {
  width: 0.375rem;
}

.messages-container::-webkit-scrollbar-track {
  background-color: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 9999px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.7);
}

.dark .messages-container::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

.dark .messages-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .message-bubble {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

/* Focus management for accessibility */
.send-button:focus-visible {
  outline: 2px solid #41b883;
  outline-offset: 2px;
}

.message-input:focus-visible {
  outline: 2px solid #41b883;
  outline-offset: 2px;
}

/* Safe area insets for notched devices */
@supports (padding: env(safe-area-inset-bottom)) {
  .input-area {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}

/* Enhanced Chat Item Hover Effects */
.chat-item {
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.chat-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(65, 184, 131, 0.1), rgba(79, 192, 141, 0.1));
  transition: width 0.3s ease;
  border-radius: 0.75rem;
}

.chat-item:hover::before {
  width: 100%;
}

.chat-item-active {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.1), rgba(79, 192, 141, 0.05));
  border: 1px solid rgba(65, 184, 131, 0.3);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.15);
}

.dark .chat-item-active {
  background: linear-gradient(135deg, rgba(79, 192, 141, 0.1), rgba(65, 184, 131, 0.05));
  border-color: rgba(79, 192, 141, 0.3);
  box-shadow: 0 4px 12px rgba(79, 192, 141, 0.15);
}

.chat-item-inactive {
  background-color: rgb(249 250 251);
}

.dark .chat-item-inactive {
  background-color: rgba(55, 65, 81, 0.5);
}

.chat-item:hover {
  transform: translateX(8px) scale(1.02);
  background-color: rgb(243 244 246);
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.1);
}

.dark .chat-item:hover {
  background-color: rgb(75 85 99);
  box-shadow: 0 8px 25px rgba(79, 192, 141, 0.1);
}

.chat-item-active:hover {
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(65, 184, 131, 0.2);
  border-color: rgba(65, 184, 131, 0.4);
}

.dark .chat-item-active:hover {
  box-shadow: 0 12px 30px rgba(79, 192, 141, 0.2);
  border-color: rgba(79, 192, 141, 0.4);
}

/* Message Bubble Enhanced Hover */
.message-bubble:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.message-bubble-user:hover {
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.3);
  filter: brightness(1.05);
}

.message-bubble-bot:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.dark .message-bubble-bot:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

/* Message Avatar Hover */
.message-avatar:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.3);
}

.message-avatar-user:hover {
  box-shadow: 0 4px 12px rgba(156, 163, 175, 0.3);
}

/* Input Area Enhancements */
.message-input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.1), 0 8px 25px rgba(65, 184, 131, 0.15);
}

.dark .message-input:focus {
  box-shadow: 0 0 0 3px rgba(79, 192, 141, 0.1), 0 8px 25px rgba(79, 192, 141, 0.15);
}

/* Send Button Enhanced */
.send-button:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.4);
}

/* Sidebar Enhanced */
.chat-sidebar:hover {
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
}

.dark .chat-sidebar:hover {
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
}

/* Mobile Header Enhancements */
.mobile-header:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.dark .mobile-header:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Chat List Title Hover */
.chat-sidebar h2:hover {
  color: #41b883;
  transform: scale(1.05);
  transition: all 0.2s ease;
}

.dark .chat-sidebar h2:hover {
  color: #4fc08d;
}

/* Time Badge Hover */
.chat-item:hover .text-xs {
  color: #41b883;
  font-weight: 500;
}

.dark .chat-item:hover .text-xs {
  color: #4fc08d;
}
</style>