<template>
    <div v-if="isVisible" class="left-sidebar">
      <div class="header">
        <img src="../assets/poe_logo.svg" alt="Poe Logo" class="logo" />
      </div>
  
      <div class="top-buttons">
        <div class="menu-item">
          <span><strong> Explore</strong></span>
        </div>
        <div class="menu-item">
          <span><strong> Create bot</strong></span>
        </div>
      </div>
  
      <div class="chat-history">
        <div v-for="(chat, index) in chatHistory" :key="index" class="chat-item">
          <img :src="chat.icon" :alt="chat.name" class="chat-icon" />
          <div class="chat-info">
            <span class="chat-name">{{ chat.name }}</span>
            <span class="chat-preview">{{ chat.preview }}</span>
          </div>
          <span class="chat-time">{{ chat.time }}</span>
        </div>
      </div>
      <div class="bottom-menu">
        <div class="menu-item">
          <i class="icon-all-chats"></i>
          <span>All chats</span>
        </div>
        <div class="menu-item">
          <i class="icon-your-bots"></i>
          <span>Your bots</span>
        </div>
        <div class="menu-item">
          <i class="icon-creators"></i>
          <span>Creators</span>
        </div>
        <div class="menu-item">
          <i class="icon-profile"></i>
          <span>Profile</span>
        </div>
        <div class="menu-item">
          <i class="icon-settings"></i>
          <span>Settings</span>
        </div>
        <div class="menu-item">
          <i class="icon-feedback"></i>
          <span>Send feedback</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const chatHistory = ref([
    { icon: '@/assets/sun_icon.svg', name: 'Claude-3.5-Sonnet', time: '15:59', preview: 'SVG使用' },
    { icon: '@/assets/sun_icon.svg', name: 'Claude-3.5-Sonnet', time: '15:58', preview: 'Macro Placement Drawbacks' },
    { icon: '@/assets/sun_icon.svg', name: 'Claude-3.5-Sonnet', time: '15:50', preview: '布局设计' },
    { icon: '@/assets/sun_icon.svg', name: 'Claude-3.5-Sonnet', time: '14:52', preview: '登录系统' },
    { icon: '@/assets/sun_icon.svg', name: 'Claude-3.5-Sonnet', time: '14:17', preview: 'WebSocket代理' },
  ]);
  
  const isVisible = ref(true);
  
  function handleResize() {
    const windowWidth = window.innerWidth;
    const screenWidth = window.screen.width;
  
    if (windowWidth <= screenWidth * 0.5) {
      isVisible.value = false;
    } else {
      isVisible.value = true;
    }
  }
  
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    // Call once to set initial visibility
    handleResize();
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style scoped>
  .left-sidebar {
    width: 250px;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
    border-right: 1px solid #e0e0e0;
    overflow-y: auto;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 10px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .logo {
    width: 96px;
    height: auto;
  }
  
  .top-buttons {
    display: flex;
    justify-content: space-between;
    padding: 0px;
    border-bottom: 1px solid #e0e0e0;
    flex-direction: row;
    gap: 12px;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .menu-item span {
    flex-grow: 1;
    font-weight: bold;
    font-size: 14px;
    font-weight: 500;
  }
  
  .chat-history {
    flex-grow: 1;
    min-height: 50vh;
    overflow-y: auto;
  }
  
  .chat-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .chat-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  
  .chat-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .chat-name {
    font-weight: bold;
  }
  
  .chat-preview {
    font-size: 12px;
    color: #666;
  }
  
  .chat-time {
    font-size: 12px;
    color: #666;
  }
  
  .bottom-menu {
    margin-top: auto;
  }
  
  [class^="icon-"] {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  </style>