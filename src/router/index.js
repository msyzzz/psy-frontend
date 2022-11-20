import {createRouter, createWebHashHistory} from 'vue-router'
import TestPage from '../views/TestPage.vue'
import HomePage from '../views/HomePage.vue'


const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [{
    path: '/test',
    name: 'test',
    component: TestPage
  },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
]})

export default router
