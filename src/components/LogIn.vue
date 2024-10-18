<template>
  <a-modal v-model:open="open" :footer="null" centered :closable="false" :keyboard="false" :maskClosable="false"
    width="400px">
    <div class="login-container">
      <div class="icon-container">
        <img class="app-icon" :src="imgUrl" alt="AI Login" />
      </div>
      <h2 class="login-title">{{ loginTitle }}</h2>
      <a-input v-model:value="displayVlaue" size="large" :placeholder="inputPlaceholder" @pressEnter="isValidKey"
        autocomplete="off" class="login-input" />
      <a-button :disabled="disabled" @click="isValidKey" type="primary" size="large" class="login-button">
        登录
      </a-button>
      <p class="login-hint">请输入有效的登录密钥以继续</p>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import imgUrl from '@/assets/claude-ai-icon.png'
import { message } from 'ant-design-vue'
import { baseUrl } from '../config/constants'
import { ref, computed, onBeforeMount, onMounted } from 'vue'
import {
  getQueryParam,

} from '../api/chat'

const router = useRouter();
const disabled = ref(false)
const inputValue = ref('')
const open = ref(false)
const isSessionKeyLogin = ref(false)
const loginTitle = computed(() => (isSessionKeyLogin.value ? '登录SessionKey' : '登录秘钥'))
const displayVlaue = computed(() => {
  if (inputValue.value.length <= 4) return inputValue.value
  else {
    const intputSize = inputValue.value.length
    return inputValue.value.slice(0, 4) + "****" + inputValue.value.slice(intputSize - 8, intputSize)
  }

})
const inputPlaceholder = computed(() =>
  isSessionKeyLogin.value ? '输入SessionKey(sk-ant-xxxx)' : '输入登录秘钥(sj-xxxxxx)'
)


function loginWithAPIKey() {
  const clientIdx = Number(getQueryParam('client_idx'))
  const clientType = getQueryParam('client_type') ?? "plus"

  const apiKey = inputValue.value
  const url = `${baseUrl}/api/v1/api_key/validate_key/${apiKey}`
  if (apiKey == '') {
    return
  }
  disabled.value = true
  // Use the Fetch API to make the GET request
  fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.is_valid) {
        message.success('登录成功')
        localStorage.setItem('SJ_API_KEY', apiKey)
        router.push({
          path: '/',
          query: {
            api_key: apiKey,
            client_idx: clientIdx,
            client_type: clientType,
          }
        })
      } else {
        message.error('该密码已过期或不存在，请重新购买。')
        localStorage.removeItem('SJ_API_KEY')
      }
    })
    .catch((error) => {
      console.log(`登录发生错误${error}`)
      message.error('登录发生错误')
      localStorage.removeItem('SJ_API_KEY')
    })
    .finally(() => {
      disabled.value = false
    })
}


function isValidKey() {

  loginWithAPIKey()
}

const hasKey = ref(false)

onBeforeMount(async () => {
  const apiKey = localStorage.getItem('SJ_API_KEY')
  if (apiKey) {
    inputValue.value = apiKey
  }
})

onMounted(() => {
  open.value = !hasKey.value
})
</script>


<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}

.icon-container {
  background-color: #f0f2f5;
  border-radius: 50%;
  padding: 15px;
  margin-bottom: 20px;
}

.app-icon {
  width: 60px;
  height: auto;
}

.login-title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
}

.login-input {
  width: 100%;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;

  &:hover {
    opacity: 0.9;
  }
}

.login-hint {
  margin-top: 15px;
  font-size: 14px;
  color: #888;
  text-align: center;
}
</style>
