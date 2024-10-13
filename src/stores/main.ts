import { defineStore } from 'pinia'
const ENABLE_PERSISTENCE = true

interface MainState {
  api_key: string
  client_idx: number
  client_type: string
  inputMessage: string
  model: string
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    api_key: '',
    client_idx: 0,
    client_type: '',
    inputMessage: '',
    model: ''
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
    }
  },
  persist: ENABLE_PERSISTENCE ? {
    key: 'main-store',
    storage: localStorage,
    // 您可以选择只持久化某些字段，如果需要的话
    // paths: ['api_key', 'client_idx', 'client_type', 'model']
  } : false
})