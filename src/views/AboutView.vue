<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 lg:py-12 xl:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 lg:mb-12 xl:mb-16">
        <h1 class="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-4">Settings</h1>
        <p class="text-gray-600 dark:text-gray-300 text-base lg:text-lg xl:text-xl">Customize your SmartFlow Chat experience</p>
      </div>

      <!-- Settings Sections -->
      <div class="space-y-6 lg:space-y-8 xl:space-y-10">
        <!-- Profile Settings -->
        <div class="settings-card">
          <div class="settings-header">
            <UserIcon class="settings-icon text-blue-600 dark:text-blue-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
          </div>
          <div class="space-y-4">
            <div class="settings-item">
              <label class="settings-label">Display Name</label>
              <input type="text" class="settings-input" placeholder="Your display name" value="John Doe" />
            </div>
            <div class="settings-item">
              <label class="settings-label">Email</label>
              <input type="email" class="settings-input" placeholder="your.email@example.com" value="john@example.com" />
            </div>
          </div>
        </div>

        <!-- Chat Preferences -->
        <div class="settings-card">
          <div class="settings-header">
            <ChatBubbleOvalLeftEllipsisIcon class="settings-icon text-green-600 dark:text-green-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chat Preferences</h3>
          </div>
          <div class="space-y-4">
            <div class="settings-toggle">
              <div>
                <label class="settings-label">Auto-save Conversations</label>
                <p class="text-sm text-gray-500 dark:text-gray-400">Automatically save your chat history</p>
              </div>
              <button class="toggle-button toggle-active">
                <span class="toggle-switch"></span>
              </button>
            </div>
            <div class="settings-toggle">
              <div>
                <label class="settings-label">Sound Notifications</label>
                <p class="text-sm text-gray-500 dark:text-gray-400">Play sound when receiving messages</p>
              </div>
              <button class="toggle-button">
                <span class="toggle-switch"></span>
              </button>
            </div>
            <div class="settings-item">
              <label class="settings-label">Default AI Model</label>
              <select class="settings-select">
                <option>GPT-4</option>
                <option>GPT-3.5</option>
                <option>Claude</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Appearance -->
        <div class="settings-card">
          <div class="settings-header">
            <SunIcon class="settings-icon text-yellow-600 dark:text-yellow-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
          </div>
          <div class="space-y-4">
            <div class="settings-item">
              <label class="settings-label">Theme</label>
              <div class="theme-options">
                <button class="theme-option theme-option-active">
                  <SunIcon class="h-5 w-5" />
                  Light
                </button>
                <button class="theme-option">
                  <MoonIcon class="h-5 w-5" />
                  Dark
                </button>
                <button class="theme-option">
                  <CogIcon class="h-5 w-5" />
                  Auto
                </button>
              </div>
            </div>
            <div class="settings-item">
              <label class="settings-label">Font Size</label>
              <select class="settings-select">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Privacy & Security -->
        <div class="settings-card">
          <div class="settings-header">
            <ShieldCheckIcon class="settings-icon text-purple-600 dark:text-purple-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>
          </div>
          <div class="space-y-4">
            <div class="settings-toggle">
              <div>
                <label class="settings-label">Data Encryption</label>
                <p class="text-sm text-gray-500 dark:text-gray-400">Encrypt all your conversations</p>
              </div>
              <button class="toggle-button toggle-active">
                <span class="toggle-switch"></span>
              </button>
            </div>
            <div class="settings-toggle">
              <div>
                <label class="settings-label">Analytics Sharing</label>
                <p class="text-sm text-gray-500 dark:text-gray-400">Share anonymous usage data to improve the service</p>
              </div>
              <button class="toggle-button toggle-active">
                <span class="toggle-switch"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="settings-actions">
          <button class="action-button action-button-primary">
            Save Changes
          </button>
          <button class="action-button action-button-secondary">
            Reset to Default
          </button>
          <button class="action-button action-button-danger">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  SunIcon,
  MoonIcon,
  CogIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
</script>

<style scoped>
/* Settings Page Styles with Enhanced Hover Effects */

.settings-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dark .settings-card {
  background-color: rgb(31 41 55);
}

.settings-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(65, 184, 131, 0.05), transparent);
  transition: left 0.5s ease;
}

.settings-card:hover::before {
  left: 100%;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .settings-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.settings-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(229 231 235);
}

.dark .settings-header {
  border-bottom-color: rgb(75 85 99);
}

.settings-icon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
}

.settings-card:hover .settings-icon {
  transform: scale(1.1) rotate(5deg);
}

.settings-item {
  margin-bottom: 1rem;
}

.settings-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(55 65 81);
  margin-bottom: 0.5rem;
}

.dark .settings-label {
  color: rgb(209 213 219);
}

.settings-input, .settings-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  background-color: white;
  color: rgb(17 24 39);
  transition: all 0.2s ease;
  outline: none;
}

.dark .settings-input, .dark .settings-select {
  background-color: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: white;
}

.settings-input:hover, .settings-select:hover {
  border-color: #41b883;
  transform: scale(1.02);
}

.settings-input:focus, .settings-select:focus {
  border-color: #41b883;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.1);
  transform: scale(1.02);
}

.settings-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.settings-toggle:hover {
  background-color: rgb(249 250 251);
  transform: translateX(4px);
}

.dark .settings-toggle:hover {
  background-color: rgb(55 65 81);
}

.toggle-button {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background-color: rgb(209 213 219);
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.toggle-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toggle-active {
  background: linear-gradient(135deg, #41b883, #4fc08d);
}

.toggle-switch {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-active .toggle-switch {
  transform: translateX(1.5rem);
}

.toggle-button:hover .toggle-switch {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.theme-options {
  display: flex;
  gap: 0.5rem;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  background-color: white;
  color: rgb(55 65 81);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.dark .theme-option {
  background-color: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: rgb(209 213 219);
}

.theme-option:hover {
  border-color: #41b883;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.15);
}

.theme-option-active {
  background: linear-gradient(135deg, #41b883, #4fc08d);
  color: white;
  border-color: #41b883;
}

.theme-option-active:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.3);
}

.settings-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 2rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  border: none;
}

.action-button:hover {
  transform: translateY(-2px);
}

.action-button-primary {
  background: linear-gradient(135deg, #41b883, #4fc08d);
  color: white;
}

.action-button-primary:hover {
  box-shadow: 0 8px 25px rgba(65, 184, 131, 0.3);
  filter: brightness(1.1);
}

.action-button-secondary {
  background-color: rgb(229 231 235);
  color: rgb(55 65 81);
}

.dark .action-button-secondary {
  background-color: rgb(75 85 99);
  color: rgb(209 213 219);
}

.action-button-secondary:hover {
  background-color: rgb(209 213 219);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .action-button-secondary:hover {
  background-color: rgb(107 114 128);
}

.action-button-danger {
  background-color: rgb(239 68 68);
  color: white;
}

.action-button-danger:hover {
  background-color: rgb(220 38 38);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
}

@media (max-width: 640px) {
  .settings-actions {
    flex-direction: column;
  }
  
  .theme-options {
    flex-direction: column;
  }
}
</style>
