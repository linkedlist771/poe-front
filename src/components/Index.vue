<template>
  <div class="account-pool" :class="{ 'dark-theme': isDarkTheme }">
    <div class="content-wrapper">
      <div class="header">
        <div class="theme-toggle-container">
          <a-switch v-model:checked="isDarkTheme">
            <template #checkedChildren>🌙</template>
            <template #unCheckedChildren>☀️</template>
          </a-switch>
        </div>
        <div class="notice" :class="{ 'dark': isDarkTheme }">
          <div v-html="notice"></div>
        </div>
      </div>

      <a-spin v-if="isLoading" />

      <div class="account-list" v-else>
        <a-card v-for="item in accounts" :key="item.id" hoverable :bordered="false" class="account-card"
          :class="{ 'dark': isDarkTheme, 'card-plus': item.type === 'plus', 'card-normal': item.type === 'normal', 'card-cd': item.status === 'cd' }"
          @click="handleCardClick(item)">
          <template #extra>
            <!-- <a-tag :color="getTagColor(item)" v-if="item.is_session_login">官网1:1</a-tag> -->
            <a-tag :color="item.type === 'normal' ? '#2db7f5' : '#f50'">
              {{ item.type }}
            </a-tag>
          </template>
          {{ item.id }}
          <!-- <a-statistic :title="item.id" :value="item.usage" :value-style="{ color: '#3f8600' }" /> -->
          <a-statistic :title="'该账号剩余可用积分'" :value="item.usage" :value-style="{ color: '#3f8600' }" />

          <a-statistic :title="'状态'" :value="item.status === 'cd' ? '冷却' : '可用'"
            :value-style="{ color: item.status === 'cd' ? '#cf1322' : '#3f8600' }" />
        </a-card>
      </div>

      <a-divider v-if="hasMoreAccounts" dashed style="font-size: 14px; margin-top: 20px">
        上拉加载更多
      </a-divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { sendRequest } from '@/api/status';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);

interface DataItem {
  id: string;
  status: string;
  type: string;
  idx: number;
  message: string;
  is_session_login: boolean;
  usage: number;
  remaining: number;
  meta_data: Record<string, any>;
}

const isDarkTheme = ref(false);

const notice = ref(`
  <p>
    1、POE账号是积分制，不存在速率限制，在该账号积分使用完毕之前均可使用，<span class="highlight">请注意您的积分消耗速度</span>，即使在有效期内，<strong>积分消耗完后也将无法使用，需要重新续费增加积分</strong>。<br><br>
    2、<span class="highlight">请注意您的秘钥有效期</span>，<strong>秘钥过期后将无法使用</strong>，续费会重置积分，不会累积。
  </p>
`);
const accounts = ref<DataItem[]>([]);
const hasMoreAccounts = ref(false);

// const toggleTheme = () => {
//   isDarkTheme.value = !isDarkTheme.value;
// };
watch(isDarkTheme, (newValue) => {
  console.log('Theme changed:', newValue ? 'Dark' : 'Light');
});

const handleCardClick = (item: DataItem) => {
  // Implement redirection logic here
  // console.log(`Clicked account: ${item.id}`);
  const idx = item.idx
  const type = item.type
  router.push({
    path: '/login',
    query: {
      client_idx: String(idx),
      client_type: type,
    }
  })
};

const getTagColor = computed(() => (item: DataItem) => {
  if (item.is_session_login) return '#87d068';
  if (item.type === 'normal') return '#2db7f5';
  if (item.usage < 10 && item.status !== 'cd') return '#ffff00';
  return '#f50';
});

onMounted(async () => {
  const fetchData = async () => {
    try {
      const res = await sendRequest('/clients_status', 'GET');
      if (res && res.length > 0) {
        accounts.value = res;
        hasMoreAccounts.value = res.length >= 10; // Assuming 10 is the page size
        isLoading.value = false;
        return true; // 数据获取成功，返回 true
      }
      return false; // 数据为空，返回 false
    } catch (error) {
      console.error('Error loading data:', error);
      return false; // 发生错误，返回 false
    }
  };

  const retryInterval = 2000; // 重试间隔，单位毫秒
  const maxRetries = 10; // 最大重试次数
  let retryCount = 0;

  const retryFetch = async () => {
    const success = await fetchData();
    if (success) {
      // 数据获取成功，终止重试
      return;
    }

    retryCount++;
    if (retryCount < maxRetries) {
      // 如果还没达到最大重试次数，继续重试
      setTimeout(retryFetch, retryInterval);
    } else {
      // 达到最大重试次数，显示错误消息
      isLoading.value = false;
      message.error('加载数据失败，请刷新页面重试');
    }
  };

  retryFetch(); // 开始尝试获取数据
});
</script>

<style scoped>
.account-pool {
  min-width: 70vw;
  height: 100%;
  /* 修改为 height: 100% */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 添加 overflow: hidden */
  background-color: #ffffff;
  /* Light theme background */
  color: #000000;
  /* Light theme text color */
  transition: background-color 0.3s, color 0.3s;
}

.account-pool.dark-theme {
  background-color: #121212;
  /* Dark theme background */
  color: #ffffff;
  /* Dark theme text color */
}


.content-wrapper {
  flex: 1 1 auto;
  /* 修改 flex 属性 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  /* 确保内容可以垂直滚动 */
}

.dark-theme {
  background-color: #121212;
  color: #ffffff;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.notice p {
  margin: 0;
  line-height: 1.6;
}

.highlight {
  color: #d9534f;
  font-weight: bold;
}

.theme-toggle-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.notice {
  background-color: #eff4f9;
  padding: 20px;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
}


.notice.dark {
  background-color: #252529;
  color: #ffffff;
}

.account-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.account-card {
  border-radius: 10px !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;

}

.account-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.account-card.dark {
  background-color: #1e1e1e;
  color: #ffffff;
}

.card-plus {
  border: 2px solid #ff69b4;
  animation: rainbow-border 2s linear infinite;
}

.card-normal {
  border: 2px solid #2db7f5;
}

.card-cd {
  background-color: #e0f7fa;
}

@keyframes rainbow-border {
  0% {
    border-color: #ff69b4;
  }

  14% {
    border-color: #ff1493;
  }

  28% {
    border-color: #ff4500;
  }

  42% {
    border-color: #ff8c00;
  }

  56% {
    border-color: #ffd700;
  }

  70% {
    border-color: #adff2f;
  }

  84% {
    border-color: #00ff7f;
  }

  100% {
    border-color: #1e90ff;
  }
}
</style>
