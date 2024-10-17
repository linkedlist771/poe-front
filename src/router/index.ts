import { createRouter, createWebHistory } from 'vue-router'
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

export default router
