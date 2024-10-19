import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '../stores/main'
import { baseUrl } from '../config/constants'
import { message } from 'ant-design-vue';
// import Chat from '../views/ChatView.vue'
// import Nav from '../views/NavView.vue'




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/MainContent.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../components/Chat.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LogIn.vue')
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('../components/ClientsStatus.vue')
    },
    {
      path: '/bots',
      name: 'bots',
      component: () => import('../components/AIBotsSearchComponet.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useMainStore()
  
  // Retrieve the API Key from localStorage
  const apiKey = localStorage.getItem('SJ_API_KEY')
  
  // Construct the device verification URL
  const deviceVerificationUrl = `${baseUrl}/api/v1/device_verification/device/${apiKey}/status`
  
  if (apiKey) {
    try {
      const response = await fetch(deviceVerificationUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      // if (!response.ok) {
      //   // If the response status is not in the range 200-299
      //   // throw new Error(`Network response was not ok: ${response.statusText}`)
      //   message.error("秘钥不存在，请重新登录。")
      //   next({ path: '/status' })

      // }
      
      const data = await response.json()
      const status = data.status
      if (status !== 'verified') {
        message.error("检测到新设备秘钥登录， 请重新登录。")
        // If the device is not verified, clear storage and reset the store
        localStorage.clear()
        store.$reset()
        // Redirect to the status page
        next({ path: '/status' })
      } else {
        // Device is verified, allow navigation
        next()
      }
    } catch (error) {
      console.error('Device status check failed:', error)
              message.error("秘钥不存在，请重新登录。")
      // Optionally, you can redirect to an error page or the status page
      next({ path: '/status' })
    }
  } else {
    // No API Key found; decide whether to allow navigation or redirect to login
    if (to.name !== 'status') {
      // Redirect to login page if not already navigating to it
      next({ name: 'status' })
    } else {
      // Allow navigation to login page
      next()
    }
  }
})

export default router

