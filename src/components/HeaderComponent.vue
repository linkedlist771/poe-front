<template>
  <a-layout-header class="header">
    <div class="header-content">
      <div class="value-display">
        <template v-if="storedValue">
          <a-spin v-if="isLoading" />
          <span v-else class="stored-value">存储秘钥: {{ maskedStoredValue }}</span>
        </template>
        <div class="button-container">
          <a-button class="custom-button" size="small" @click="handleButtonClick">
            {{ buttonText }}
          </a-button>
        </div>
      </div>
    </div>

    <a-modal v-model:visible="showModal" title="输入新秘钥" @ok="saveValue" @cancel="closeModal">
      <a-input v-model:value="inputValue" placeholder="请输入秘钥" />
    </a-modal>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import {
  LayoutHeader as ALayoutHeader,
  Button as AButton,
  Modal as AModal,
  Input as AInput,
  Spin as ASpin,
} from 'ant-design-vue';


import { sendRequest, getQueryParam, baseSendRequest } from '../api/status'



const KEY = "SJ_API_KEY";
const storedValue = ref("");
const inputValue = ref("");
const showModal = ref(false);
const isLoading = ref(false);

const maskedStoredValue = computed(() => {
  const value = storedValue.value;
  if (value.length <= 4) return value;
  if (value.length <= 8) return value.slice(0, 4) + "*".repeat(value.length - 4);
  return value.slice(0, 4) + "****" + "...";
});

const buttonText = computed(() => storedValue.value ? '重置秘钥' : '输入秘钥');

const loadStoredValue = () => {
  const value = localStorage.getItem(KEY);
  if (value) {
    storedValue.value = value;
    fetchInfoAsync();
  } else {
    showInputModal();
  }
};

const showInputModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  inputValue.value = "";
};

const saveValue = () => {
  if (inputValue.value.trim()) {
    localStorage.setItem(KEY, inputValue.value);
    storedValue.value = inputValue.value;
    inputValue.value = "";
    showModal.value = false;
    message.success("秘钥保存成功");
    fetchInfoAsync();
  } else {
    message.error("请输入秘钥");
  }
};

const resetValue = () => {
  localStorage.removeItem(KEY);
  storedValue.value = "";
  message.success("秘钥重置成功");
};

const handleButtonClick = () => {
  if (storedValue.value) {
    resetValue();
  } else {
    showInputModal();
  }
};

const getValidityPeriod = (expireTime: string): string => {
  const now = new Date();
  const expireDate = new Date(expireTime);

  // 检查是否为有效日期
  if (isNaN(expireDate.getTime())) {
    return "无效的过期时间";
  }

  const timeDiff = expireDate.getTime() - now.getTime();

  if (timeDiff < 0) return "已经过期";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  let result = "";
  if (days > 0) result += `${days}天`;
  if (hours > 0 || days > 0) result += `${hours}小时`;
  result += `${minutes}分钟`;

  return result;
};

const fetchInfoAsync = async () => {
  isLoading.value = true;
  try {
    const result = await sendRequest('/api_key/get_information/' + storedValue.value, 'GET')
    const isKeyValid = result.is_key_valid
    if (isKeyValid) {
      const expireTime = String(result.expire_time); // 确保 expireTime 是字符串类型
      const usage_limit = result.usage_limit;
      const current_usage = result.current_usage;
      const remaining_usage = usage_limit - current_usage;

      if ("Never expire" == expireTime) {
        message.success(`秘钥未激活， 等待激活后显示过期时间。`);

      }
      else {
        const validityPeriod = getValidityPeriod(expireTime);

        const expireDate = new Date(expireTime.replace(' ', 'T'));
        const daysUntilExpire = Math.ceil((expireDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilExpire <= 7) {
          message.warning(`秘钥即将过期，剩余${daysUntilExpire}天`);
        }
        message.success(`剩余有效期：${validityPeriod}`);
      }
      message.info(`剩余使用积分：${remaining_usage}`);

    }
  } catch (error) {
    // 处理错误
    console.error(error);
    message.error('获取信息失败');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadStoredValue();
});
</script>

<style scoped>
.header {
  top: 10px;
  margin: 0 20rem;
  position: fixed;
  background: #fff;
  padding: 0 20px;
  width: calc(100% - 40rem);
}

.header-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
}

.value-display {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
}

.stored-value {
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: inline-flex;
  align-items: center;
}

.button-container {
  flex-shrink: 0;
}

.custom-button {
  padding: 4px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.custom-button:hover {
  background-color: #45a049;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.custom-button:active {
  background-color: #3e8e41;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  .header {
    margin: 0;
    width: 100%;
  }

  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }

  .value-display {
    width: 100%;
    justify-content: space-between;
  }

  .stored-value {
    max-width: 150px;
  }
}
</style>