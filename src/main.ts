import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFile, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileArchive } from '@fortawesome/free-solid-svg-icons'

import './style.css'
import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
import '//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js'


library.add(faFile, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileArchive)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(antd)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')