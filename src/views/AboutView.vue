<!-- Settings page -->

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
            <div class="flex items-center">
              <UserIcon class="settings-icon text-blue-600 dark:text-blue-400" />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <button
                v-if="!isEditingProfile"
                @click="startEditingProfile"
                title="Edit your profile information"
                class="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:px-3 sm:py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-md transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95 min-w-[80px] sm:min-w-0"
              >
                <PencilIcon class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span class="hidden sm:inline">Edit</span>
                <span class="sm:hidden">Edit Profile</span>
              </button>
              <template v-else>
                <button
                  @click="saveProfile"
                  title="Save changes to your profile"
                  class="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:px-3 sm:py-1.5 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-lg sm:rounded-md transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95 min-w-[80px] sm:min-w-0"
                >
                  <CheckIcon class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span>Save</span>
                </button>
                <button
                  @click="cancelEditingProfile"
                  title="Cancel editing and discard changes"
                  class="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:px-3 sm:py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-800/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg sm:rounded-md transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95 min-w-[80px] sm:min-w-0"
                >
                  <XMarkIcon class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span>Cancel</span>
                </button>
              </template>
            </div>
          </div>
          <div class="space-y-4">
            <!-- Display Name -->
            <div class="settings-item">
              <label class="settings-label">Display Name</label>
              <input
                type="text"
                class="settings-input"
                :class="{ 'settings-input-readonly': !isEditingProfile }"
                placeholder="Your display name"
                v-model="profile.displayName"
                :readonly="!isEditingProfile"
              />
            </div>

            <!-- Email -->
            <div class="settings-item">
              <label class="settings-label">Email Address</label>
              <input
                type="email"
                class="settings-input"
                :class="{ 'settings-input-readonly': !isEditingProfile }"
                placeholder="your.email@example.com"
                v-model="profile.email"
                :readonly="!isEditingProfile"
              />
            </div>

            <!-- Username -->
            <div class="settings-item">
              <label class="settings-label">Username</label>
              <input
                type="text"
                class="settings-input"
                :class="{ 'settings-input-readonly': !isEditingProfile }"
                placeholder="Your unique username"
                v-model="profile.username"
                :readonly="!isEditingProfile"
              />
            </div>

            <!-- Bio -->
            <div class="settings-item">
              <label class="settings-label">Bio</label>
              <textarea
                class="settings-input min-h-[80px] resize-none"
                :class="{ 'settings-input-readonly': !isEditingProfile }"
                placeholder="Tell us about yourself..."
                v-model="profile.bio"
                :readonly="!isEditingProfile"
                rows="3"
              ></textarea>
            </div>

            <!-- Location -->
            <div class="settings-item">
              <label class="settings-label">Location</label>
              <input
                type="text"
                class="settings-input"
                :class="{ 'settings-input-readonly': !isEditingProfile }"
                placeholder="Your location"
                v-model="profile.location"
                :readonly="!isEditingProfile"
              />
            </div>
          </div>
        </div>

        <!-- AI Model Settings -->
        <div class="settings-card">
          <div class="settings-header">
            <CpuChipIcon class="settings-icon text-purple-600 dark:text-purple-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">AI Model Preferences</h3>
          </div>
          <div class="space-y-4">
            <div class="settings-item">
              <label class="settings-label">Default AI Model</label>
              <select class="settings-select" v-model="aiSettings.selectedModel">
                <option value="chatgpt-4.1">ChatGPT 5 (Latest)</option>
                <option value="chatgpt-4">ChatGPT 4.1</option>
                <option value="claude-3.5">Claude 4 Sonnet</option>
                <option value="gemini-pro">Gemini 2.5 Pro</option>
              </select>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose your preferred AI model for conversations</p>
            </div>

            <div class="settings-item">
              <label class="settings-label">Response Style</label>
              <select class="settings-select" v-model="aiSettings.responseStyle">
                <option value="balanced">Balanced</option>
                <option value="creative">Creative</option>
                <option value="precise">Precise</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div class="settings-item">
              <label class="settings-label">Max Response Length</label>
              <select class="settings-select" v-model="aiSettings.maxLength">
                <option value="short">Short (1-2 paragraphs)</option>
                <option value="medium">Medium (3-5 paragraphs)</option>
                <option value="long">Long (6+ paragraphs)</option>
              </select>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UserIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CpuChipIcon,
} from '@heroicons/vue/24/outline'

// Reactive states
const isEditingProfile = ref(false)
const originalProfile = ref({
  displayName: '',
  email: '',
  username: '',
  bio: '',
  location: ''
})

// Profile data with extended fields
const profile = ref({
  displayName: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe123',
  bio: 'AI enthusiast and tech lover. Always excited to explore new possibilities with SmartFlow Chat!',
  location: 'Bangkok, Thailand'
})

// AI Model Settings
const aiSettings = ref({
  selectedModel: 'chatgpt-4.1',
  responseStyle: 'balanced',
  maxLength: 'medium'
})

// Functions
const startEditingProfile = () => {
  originalProfile.value = { ...profile.value }
  isEditingProfile.value = true
}

const saveProfile = () => {
  // Here you would typically save to a backend API
  console.log('Saving profile:', profile.value)
  isEditingProfile.value = false
  // You could add a success notification here
}

const cancelEditingProfile = () => {
  profile.value = { ...originalProfile.value }
  isEditingProfile.value = false
}
</script>

<style scoped>
/* Settings Page Styles with Enhanced Hover Effects */

.settings-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
  transition: all 0.2s ease;
  border: 1px solid rgb(229 231 235);
}

.dark .settings-card {
  background-color: rgb(31 41 55);
  border-color: rgb(75 85 99);
}

.settings-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.dark .settings-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  transform: scale(1.05);
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
  font-size: 0.875rem;
}

/* Enhanced select styling */
.settings-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.dark .settings-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%9ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}

/* Option styling */
.settings-select option {
  padding: 0.5rem 1rem;
  background-color: white;
  color: rgb(17 24 39);
  font-size: 0.875rem;
}

.dark .settings-select option {
  background-color: rgb(55 65 81);
  color: white;
}

.settings-input-readonly {
  background-color: rgb(249 250 251);
  cursor: default;
}

.dark .settings-input-readonly {
  background-color: rgb(31 41 55);
}

.dark .settings-input, .dark .settings-select {
  background-color: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: white;
}

.settings-input:hover:not(.settings-input-readonly), .settings-select:hover {
  border-color: rgb(59 130 246);
  transform: scale(1.01);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.settings-input:focus, .settings-select:focus {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 2px 8px rgba(59, 130, 246, 0.15);
  transform: scale(1.01);
}

/* Enhanced select focus state */
.settings-select:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}

.dark .settings-select:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%3b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}

@media (max-width: 640px) {
  .settings-card {
    padding: 1rem;
  }

  .settings-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .settings-header h3 {
    margin-left: 0;
  }

  .settings-icon {
    margin-right: 0.5rem;
  }

  /* Ensure buttons stack properly on mobile */
  .settings-header > div:last-child {
    width: 100%;
  }

  /* Enhanced mobile select styling */
  .settings-select {
    font-size: 16px;
    padding: 1rem 2.5rem 1rem 1rem;
    background-size: 1.25em 1.25em;
    background-position: right 0.75rem center;
    min-height: 3rem;
    border-width: 2px;
  }

  .settings-select option {
    padding: 0.75rem 1rem;
    font-size: 16px;
    line-height: 1.5;
  }
}

@media (max-width: 480px) {
  .settings-input, .settings-select {
    font-size: 16px;
    padding: 0.875rem 1rem;
  }

  .settings-select {
    padding: 1rem 2.5rem 1rem 1rem;
    min-height: 3.25rem;
    border-radius: 0.75rem;
  }

  /* Larger touch targets on small screens */
  .settings-select option {
    padding: 1rem;
    font-size: 16px;
    min-height: 3rem;
  }
}

/* Extra responsive improvements for tablets */
@media (min-width: 641px) and (max-width: 1024px) {
  .settings-select {
    font-size: 0.9rem;
    padding: 0.8rem 2.25rem 0.8rem 0.9rem;
  }
}
</style>
