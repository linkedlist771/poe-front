import { defineStore } from 'pinia'
const ENABLE_PERSISTENCE = true


interface Message {
  role: string
  content: string
  loading?: boolean
  file?: { type: string; url: string; name: string; loading: boolean }
  timestamp?: string
}

interface ChatHistoryItem {
  messages: Message[]
  conversation_id: string
  model: string
  name: string
  time: string
  preview?: string
}

interface MainState {
  api_key: string
  client_idx: number
  client_type: string
  inputMessage: string
  model: string
  currentChatHistory: ChatHistoryItem | null
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    api_key: '',
    client_idx: 0,
    client_type: '',
    inputMessage: '',
    model: '',
    currentChatHistory: null,

  }),
  actions: {
    setApiKey(key: string) {
      this.api_key = key
    },
    setClientIdx(idx: number) {
      this.client_idx = idx
    },
    setClientType(type: string) {
      this.client_type = type
    },
    setInputMessage(msg: string) {
      this.inputMessage = msg
    },
    setModel(model: string) {
      this.model = model
    },
    setCurrentChatHistory(chatHistory: ChatHistoryItem) {
      this.currentChatHistory = chatHistory
    },
    clearCurrentChatHistory() {
      this.currentChatHistory = null
    },
  },
  persist: ENABLE_PERSISTENCE ? {
    key: 'main-store',
    storage: localStorage,
    // 您可以选择只持久化某些字段，如果需要的话
    // paths: ['api_key', 'client_idx', 'client_type', 'model']
  } : false
})