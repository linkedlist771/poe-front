<template>
  <div class="main-container">
    <div class="main-content">
      <div class="header">
        <!-- Header Logo -->
        <div class="header-logo">
          <img src="../assets/poe_logo.svg" alt="Poe Logo" class="header-logo" />
        </div>

        <!-- Model Selection Buttons -->
        <div class="model-selection">
          <button v-for="(model, index) in models" :key="model.name" class="model-button"
            :class="{ 'selected': selectedModel === index }" @click="selectModel(index)">
            <!-- <img :src="model.icon" :alt="model.name + ' icon'" class="model-icon" />
            {{ model.name }} -->
            <!-- <a-avatar :src="getImageUrl('gpt3_5.jpeg')"></a-avatar> -->
            <!-- <img :src="'@/assets/avatars/gpt3_5.jpeg'" :alt="model.name + ' icon'" class="model-icon" /> -->
            <!-- {{ model.name }} -->
            <!-- "@/assets/avatars/gpt4o.jepg" -->
            <ModelAvatar :modelName="model.name" :showName="true"></ModelAvatar>

          </button>
          <button class="model-button more-button" @click="openModal">更多模型</button>
        </div>

        <!-- Send Message Button -->
        <SendMessageButton @sendMessage="sendMessage" :placeholder="'开始一个新的对话'"> </SendMessageButton>
      </div>

      <!-- Bot Sections -->
      <div class="bot-sections">
        <!-- Official Bots Section -->
        <div class="section">
          <div class="section-header">
            <h2>官方模型</h2>
            <a href="#" class="see-all" @click="openModal">See all</a>
          </div>
          <div class="bot-grid">
            <div v-for="bot in officialBots" :key="bot.name" class="bot-item" @click="chatWithBot(bot.name)">
              <!-- <img :src="bot.icon" :alt="bot.name" class="bot-icon" /> -->
              <ModelAvatar :modelName="bot.name" :showName="false"></ModelAvatar>

              <div class="bot-info">
                <h3>{{ bot.name }}</h3>
                <p>{{ getModelInformation(bot.name).desc.substring(0, 30) + "..." }}</p>
              </div>
              <!-- <ModelItem v-for="bot in officialBots" :key="bot.name" :modelName="bot.name"
                :modelInfo="getModelInformation(bot.name)" @click="chatWithBot"></ModelItem> -->
            </div>
          </div>
        </div>


        <!-- Random Bots Section -->
        <div class="section">
          <div class="section-header">
            <h2>为你准备的模型 </h2>
            <a href="#" class="see-all" @click="openModal">See all</a>
          </div>
          <div class="bot-grid">
            <div v-for="bot in randomBots" :key="bot.name" class="bot-item" @click="chatWithBot(bot.name)">
              <ModelAvatar :modelName="bot.name" :showName="false"></ModelAvatar>
              <div class="bot-info">
                <h3>{{ bot.name }}</h3>
                <p>{{ getModelInformation(bot.name).desc.substring(0, 30) + "..." }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <AIBotsSearchComponet :isVisible="showModal" @close="closeModal" />

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getModelInformation, getRandomModels } from '../api/model_utils'
import SendMessageButton from './SendMessageButton.vue';
import { useMainStore } from '../stores/main'
import ModelAvatar from './ModelAvatar.vue';
import { storeToRefs } from 'pinia'
import {
  fetchConversation,
  getQueryParam,
  documentConversionUrl,
  chat,
  deleteAllConversation,
  imageUploadUrl
} from '../api/chat'
import AIBotsSearchComponet from './AIBotsSearchComponet.vue';

import { useRouter, useRoute } from 'vue-router';
// import claudeImage from "@/assets/avatars/gpt3_5.jpeg";
const showModal = ref(false);
const randomBots = ref([]);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};


const router = useRouter();

const store = useMainStore()
const { api_key, client_idx, client_type, inputMessage, model } = storeToRefs(store)

const clientIdx = Number(getQueryParam('client_idx')) ?? client_idx.value
const clientType = getQueryParam('client_type') ?? client_type.value
const apiKey = getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string)


// 使用 actions 设置状态
store.setClientIdx(clientIdx)
store.setApiKey(apiKey)
store.setClientType(clientType)


onMounted(async () => {
  const temptApiKey = getQueryParam('api_key') || (localStorage.getItem('SJ_API_KEY') as string)

  if (!temptApiKey || !client_idx.value || client_idx.value == 0) {


    router.push('/status')
  }
  randomBots.value = getRandomModels(12);  // Get 12 random bots

}
)

const route = useRoute();

const chatWithBot = async (modelName: string) => {
  store.setModel(modelName);
  store.clearCurrentChatHistory();
  const query = {}
  // 判断当前是否在 /chat 路由
  if (route.path === '/chat') {
    await router.replace({ path: '/chat', query })
    window.location.reload()
  } else {
    await router.push({ path: '/chat', query })
  }

  closeModal();
};


const officialBots = ref([
  // { name: 'Assistant', icon: '🤖', description: 'General-purpose assistant bot. For queries requiring u...' },
  { name: 'Claude-3.5-Sonnet', icon: '🌟', description: 'Anthropic\'s most powerful model. Excels in complex...' },
  { name: 'Claude-3.5-Sonnet-200k', icon: '🌟', description: 'Anthropic\'s most powerful model. Excels in complex...' },

  { name: 'Flux-Pro-1.1-t', icon: '🖼️', description: 'State-of-the-art image generation with top-of-the-line...' },
  { name: 'stablediffusion3.5-l', icon: '🌐', description: 'Web-enabled assistant bot that searches the intern...' },
  { name: 'o1-mini', icon: '🔮', description: 'This OpenAI model is a faster, cheaper version of o1 that is...' },
  // { name: 'Ideogram-v2', icon: '🧠', description: 'Latest image model from Ideogram, with industry leading...' },
  { name: 'GPT-4o', icon: '🤖', description: 'OpenAI\'s latest model. This intelligent small...' },
]);


const botsForYou = ref([
  { name: 'PythonAIChat', icon: '🐍', description: 'Python programming how know everythin...' },
  { name: 'Wolfram-math-1', icon: '🧮', description: 'Wolfram-math is and advanced math...' },
  { name: 'einstein-chatgpt', icon: '👨‍🔬', description: 'Meet the founder of the theory of...' },
  { name: 'Python_Expert', icon: '🐍', description: 'I am an expert in python programmin...' },
]);

const models = ref([
  { name: 'Claude-3.5-Sonnet', icon: '../assets/claude-icon.svg' },
  { name: 'GPT-4o', icon: "../assets/avatars/gpt4o.jepg" },
  { name: 'photo_createe', icon: '../assets/gpt-turbo-icon.svg' },
]);

const sendMessage = async (messageText: string) => {
  store.setInputMessage(messageText)
  router.push('/chat');
}
const selectedModel = ref(0);  // Default to the first model
store.setModel(models.value[0].name);

const selectModel = (index: number) => {
  selectedModel.value = index;
  store.setModel(models.value[index].name);

};
// store.setModel(models.value[selectedModel.value].name);


</script>


<style scoped>
/* 全局样式 */
.main-container {
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}

.main-content {
  padding: 20px;
  overflow-y: auto;
}

/* 头部样式 */
.header {
  margin-bottom: 20px;
  margin-top: 10rem;
}

.header-logo {
  margin: 0 auto;
  width: 12rem;
  height: auto;
}

/* 模型选择按钮 */
.model-selection {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.model-button {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-bottom: 10px;
  /* Add some space between buttons */

}

.model-button:hover {
  background-color: #e8e8e8;
}

.model-button.selected {
  background-color: #d2d2fb;
  color: white;
  border-color: #d2d2fb;
}

.model-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

/* 机器人部分 */
.bot-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.see-all {
  color: #007bff;
  text-decoration: none;
}

.bot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.bot-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
}

.bot-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}


.bot-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.bot-info h3 {
  margin: 0;
  font-size: 16px;
  text-align: center;
}

.bot-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* 响应式调整 */

@media (max-width: 767px) {
  .model-selection {
    flex-direction: column;
    align-items: stretch;
  }

  .model-button {
    padding: 10px 16px;
    /* Increase padding for better touch targets */
    font-size: 14px;
    /* Slightly larger font size */
    margin-bottom: 10px;
    /* Add space between buttons */
  }


  .bot-grid {
    grid-template-columns: 1fr;
  }

  .header-logo {
    width: 8rem;
  }

  .main-content {
    padding: 10px;
  }

  .header {
    margin-top: 5rem;
  }

  .more-button {
    margin-top: 10px;
    /* Add extra space above the "More Models" button */
    /* background-color: #e8e8e8; */
    /* Slightly darker background to stand out */
    font-weight: bold;
    /* Make the text bold */
  }

}

@media (max-width: 480px) {
  .model-button {
    padding: 8px 14px;
    /* Slightly reduce padding for very small screens */
    font-size: 13px;
    /* Slightly smaller font size */
  }

  .header-logo {
    width: 6rem;
  }

  .more-button {
    padding: 10px 16px;
    /* Keep the "More Models" button slightly larger */
  }

}

@media (min-width: 768px) {
  .main-container {
    width: 80%;
  }

  .bot-item {
    flex-direction: row;
    align-items: flex-start;
  }

  .bot-icon {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .bot-info h3,
  .bot-info p {
    text-align: left;
  }
}
</style>