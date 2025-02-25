<template>

  <div class="sidebar-container">

    <div v-if="isVisible" class="left-sidebar">
      <div class="header">
        <img src="../assets/poe_logo.svg" alt="Poe Logo" class="logo" @click="goHome" />
        <button class="min-max-toggle" @click.stop="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M4.5 6.5h15a1 1 0 1 0 0-2h-15a1 1 0 0 0 0 2ZM19.5 17.5h-15a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2ZM19.5 11h-15a1 1 0 0 0 0 2h15a1 1 0 1 0 0-2Z">
            </path>
          </svg>
        </button>
      </div>
      <div class="sidebar-content">

        <div class="top-buttons">
          <div class="menu-item" @click="openModal">

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#333" stroke-width="2" />
              <line x1="14.7071" y1="14.2929" x2="18.7071" y2="18.2929" stroke="#333" stroke-width="2"
                stroke-linecap="round" />
            </svg>
            <span><strong> 更多模型</strong></span>
          </div>
          <div class="menu-item" @click="goAccountPool">
            <!-- 添加的 SVG 图标 -->
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
              <path d="M15 18l-6-6 6-6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span><strong> 返回账号池</strong></span>
          </div>
        </div>

        <div class="common-models">
          <div class="section-header">
            <div class="section-title">常用模型</div>
            <button class="expand-button" @click="toggleModelList">
              <svg class="expand-icon" :class="{ 'expanded': isModelListExpanded }" xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <div class="model-list">
            <div v-for="model in displayedModels" :key="model.name" class="model-item"
              @click="startNewChat(model.name)">
              <ModelAvatar :modelName="model.name" class="model-avatar"></ModelAvatar>
              <span class="model-name">{{ model.name }}</span>
            </div>
          </div>
        </div>

        <div class="chat-history-container">
          <div class="section-title">历史对话</div>
          <div class="chat-history">
            <template v-if="chatHistory.length > 0">
              <div v-for="(chat, index) in chatHistory" :key="index" class="chat-item" @click="loadHistory(chat)">
                <ModelAvatar :modelName="chat.name" class="model-avatar"></ModelAvatar>
                <div class="chat-info">
                  <div class="chat-header">
                    <span class="chat-name">{{ chat.name }}</span>
                    <span class="chat-time">{{ chat.time }}</span>
                  </div>
                  <span class="chat-preview">{{ chat.preview }}</span>
                </div>
              </div>
              <div v-if="isLoading" class="loading-spinner">
                <a-spin size="small" />
              </div>
            </template>
            <template v-else>
              <div class="spin-container">
                <a-spin size="large" />
              </div>
            </template>
          </div>
        </div>

      </div>

    </div>
    <button v-show="!isVisible" class="min-max-toggle fixed-toggle" @click="toggleSidebar">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M4.5 6.5h15a1 1 0 1 0 0-2h-15a1 1 0 0 0 0 2ZM19.5 17.5h-15a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2ZM19.5 11h-15a1 1 0 0 0 0 2h15a1 1 0 1 0 0-2Z">
        </path>
      </svg>
    </button>
  </div>

  <AIBotsSearchComponet :isVisible="showModal" @close="closeModal" />


</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, Ref, watch, nextTick, computed } from 'vue';
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'
import { HomeIcon } from 'lucide-vue-next';
import AIBotsSearchComponet from './AIBotsSearchComponet.vue';
import {
  fetchConversation,
  getQueryParam,
} from '../api/chat'
import { Spin as ASpin, message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import ModelAvatar from './ModelAvatar.vue';
import svg from '../plugins/svg';


const router = useRouter();
const route = useRoute();
const chatHistory: Ref<MessageItem[]> = ref([])
const conversationHistories: Ref<MessageItem[]> = ref([])
const store = useMainStore()

// Add pagination state
const currentPage = ref(1);
const pageSize = ref(20);
const isLoading = ref(false);
const hasMoreData = ref(true);

type Message = {
  role: string
  content: string
  loading?: boolean
  file?: { type: string; url: string; name: string; loading: boolean }
  timestamp?: string
}



type MessageItem = {
  messages: Message[]
  conversation_id: string
  model: string,
  name: string,
  time: string,
  preview?: string,
}

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

let conversationInterval: any = null;

const commonModels = [
  { name: 'Claude-3.5-Sonnet-June', icon: '../assets/claude-icon.svg' },
  { name: 'Claude-3.7-Sonnet', icon: '🌟', description: 'Anthropic\'s most powerful model. Excels in complex...' },
  { name: 'Claude-3.7-Sonnet-Reasoning', icon: '🌟', description: 'Anthropic\'s most powerful model. Excels in complex...' },

  { name: 'DeepSeek-V3-fw', icon: '../assets/deepseekai.png' },
  { name: 'GPT-4o', icon: "../assets/avatars/gpt4o.jepg" },
  { name: 'Claude-3.5-Sonnet', icon: '../assets/claude-icon.svg' },

  // { name: 'gemini-2.0-flash', icon: '../assets/gemini.jepg' },
]

const loadHistory = async (chatItem: MessageItem) => {
  store.setModel(chatItem.model);
  store.setCurrentChatHistory(chatItem);
  const query = {
    client_idx: String(store.client_idx),
    client_type: store.client_type,
    conversation_id: chatItem.conversation_id
  }

  await router.replace({ path: '/chat', query })
  window.location.reload() // 强制刷新页面
}

const goAccountPool = async () => {


  router.push('/status')
}

const goHome = async () => {
  // localStorage.clear();
  const store = useMainStore()

  const { api_key, client_idx, client_type, inputMessage, model } = storeToRefs(store)

  router.push({
    path: '/',
    query: {
      client_idx: String(client_idx.value),
      client_type: client_type.value,
    }
  })  // 清空localstorag

}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const month = date.getMonth() + 1; // getMonth() 返回 0-11，所以加1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // 转换为12小时制
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // 检查是否是当天
  const isToday = date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  } else {
    return `${month}月${day}日`;
  }
}
const fetchConversationData = async (page = 1) => {
  if (isVisible.value && !isLoading.value) {
    const store = useMainStore()
    const { client_idx, client_type } = storeToRefs(store)
    const clientIdx = client_idx.value
    const clientType = client_type.value
    const apiKey = getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string)

    try {
      isLoading.value = true;

      // Add a small delay to prevent rapid consecutive requests
      if (page > 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const res = await fetchConversation(
        clientIdx,
        clientType,
        apiKey,
        {
          page,
          page_size: pageSize.value
        }
      );

      if (res && res.length > 0) {
        // Update conversationHistories
        if (page === 1) {
          conversationHistories.value = res;
        } else {
          conversationHistories.value = [...conversationHistories.value, ...res];
        }

        // Update hasMoreData based on received items count
        hasMoreData.value = res.length === pageSize.value;

        // Update chatHistory
        const newHistory = res.map((item: MessageItem) => ({
          name: item.model,
          time: formatDate(item.messages[item.messages.length - 1]?.timestamp ?? new Date().toISOString()),
          preview: item.preview || item.messages[item.messages.length - 1]?.content.substring(0, 30) + '...',
          model: item.model,
          conversation_id: item.conversation_id,
          messages: item.messages
        }));

        if (page === 1) {
          chatHistory.value = newHistory;
        } else {
          chatHistory.value = [...chatHistory.value, ...newHistory];
        }
      } else if (page === 1) {
        // If it's the first page and no data, show default message
        chatHistory.value = [{
          name: 'Assistant',
          time: formatDate(new Date().toISOString()),
          preview: '目前还没有对话，赶快来开启一个吧。',
          model: 'Assistant',
          conversation_id: 'default_conversation',
          messages: [{
            role: 'assistant',
            content: '目前还没有对话，赶快来开启一个吧。',
            timestamp: new Date().toISOString()
          }]
        }];
        hasMoreData.value = false;
      } else {
        hasMoreData.value = false;
      }
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
      hasMoreData.value = false;
    } finally {
      isLoading.value = false;
    }
  }
};

// Modify scroll handler to be less aggressive
const handleScroll = async (e: Event) => {
  const target = e.target as HTMLElement;
  const scrollPosition = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;

  // When user scrolls to 90% of the container height
  if (scrollPosition + clientHeight >= scrollHeight * 0.9 && hasMoreData.value && !isLoading.value) {
    currentPage.value++;
    await fetchConversationData(currentPage.value);
  }
};

onMounted(() => {
  // Initial fetch
  fetchConversationData(1);

  // Set up scroll listener with a slight delay to ensure DOM is ready
  nextTick(() => {
    const chatHistoryElement = document.querySelector('.chat-history');
    if (chatHistoryElement) {
      chatHistoryElement.addEventListener('scroll', handleScroll);
    }
  });

  // Clear existing interval if any
  if (conversationInterval) {
    clearInterval(conversationInterval);
  }

  // Set new interval for first page only
  conversationInterval = setInterval(() => fetchConversationData(1), 10 * 1000);
});

onBeforeUnmount(() => {
  if (conversationInterval) {
    clearInterval(conversationInterval);
  }

  // Remove scroll listener
  const chatHistoryElement = document.querySelector('.chat-history');
  if (chatHistoryElement) {
    chatHistoryElement.removeEventListener('scroll', handleScroll);
  }
});


const isVisible = ref(true);


function routeContainsKeyWrods() {
  if (route.path.includes('login') || route.path.includes('status')) {
    return true
  }
  else {
    return false
  }

}


function handleRouterAndResize() {

  const windowWidth = window.innerWidth;
  // const screenWidth = window.screen.width;
  if (windowWidth <= 768 || routeContainsKeyWrods()) {
    isVisible.value = false;
  } else {

    isVisible.value = true;
  }
}

onMounted(() => {
  window.addEventListener('resize', handleRouterAndResize);
  // Call once to set initial visibility
  handleRouterAndResize();
  // Add route watcher
  watch(() => route.path, handleRouterAndResize, { immediate: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleRouterAndResize);
});

const toggleSidebar = () => {
  isVisible.value = !isVisible.value;
};

const startNewChat = async (modelName: string) => {
  store.setModel(modelName);
  store.clearCurrentChatHistory(); // 使用 clearCurrentChatHistory 替代 setCurrentChatHistory

  const query = {
    client_idx: String(store.client_idx),
    client_type: store.client_type,
  }

  if (route.path === '/chat') {
    await router.replace({ path: '/chat', query })
    window.location.reload()
  } else {
    await router.push({ path: '/chat', query })
  }
}

const isModelListExpanded = ref(false);

const toggleModelList = () => {
  isModelListExpanded.value = !isModelListExpanded.value;
};

// 计算要显示的模型列表
const displayedModels = computed(() => {
  return isModelListExpanded.value ? commonModels : [commonModels[0]];
});
</script>

<style scoped>
.sidebar-container {
  position: relative;
}

.left-sidebar {
  width: 250px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  position: relative;

}

.header {
  position: absolute;
  /* Change to absolute */
  width: 100%;
  /* Full width of parent */
  display: flex;
  z-index: 1000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 23px 10px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  /* Include padding in width calculation */

  border-bottom: 1px solid #e0e0e0;
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding-top: 80px;
  /* Adjust this value based on your header height */
  display: flex;
  flex-direction: column;
}

.header-spacer {

  /* margin-right: 0.5rem; */
  /* height: 1rem; */
  /* width: 1rem; */
  /* flex-direction: row; */
  font-size: 10px;
}

.header-spacer .icon {
  height: 1rem;

}

.logo:hover {
  cursor: pointer;
}

.chat-item:hover {
  background-color: #e0e0e0;
  cursor: pointer;
  /* Change background color on hover */

}

.model-avatar {
  transform: scale(0.8);
  /* 缩小到原来的 80% */


}

.chat-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
  /* Add smooth transition for hover effect */
}

.min-max-toggle {
  margin-left: auto;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.logo {
  width: 96px;
  height: auto;
}

.top-buttons {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  gap: 8px;
}

.fixed-toggle {
  position: fixed;
  bottom: 6rem;
  left: 20px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.fixed-toggle:hover {
  background-color: #f0f0f0;
}

.menu-item {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.menu-item span {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 500;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.chat-history {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 1rem;
  height: calc(100vh - 250px);
  position: relative;
  /* Add this for loading spinner positioning */
}

.chat-history-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  /* Important for enabling scroll */
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
}

/* .chat-item {
display: flex;
align-items: center;
padding: 8px 0;
border-bottom: 1px solid #e0e0e0;
} */

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
  font-size: 14px;
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

.section-title {
  padding: 12px 16px;
  font-weight: bold;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

.common-models {
  border-bottom: 1px solid #e0e0e0;
}

.model-list {
  padding: 8px;
  transition: max-height 0.3s ease;
}

.model-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.model-item:hover {
  background-color: #f0f0f0;
}

.model-avatar {
  transform: scale(0.8);
  margin-right: 8px;
}

.model-name {
  font-size: 14px;
  color: #333;
}

.chat-history {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chat-history .chat-item {
  margin: 4px 8px;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
}

.expand-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.expand-button:hover {
  color: #333;
}

.expand-icon {
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>