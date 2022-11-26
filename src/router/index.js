import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LogInPage from '../views/LogInPage.vue'
import DoTestPage from '../views/DoTestPage.vue'
import CreateTestPage from '../views/CreateTestPage.vue'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [{
    path: '/home',
    name: 'home',
    component: HomePage
  }, {
      path: '/',
      name: 'init',
      component: LogInPage
  }, {
      path: '/do_test',
      name: 'do_test',
      component: DoTestPage
  }, {
      path: '/create_test',
      name: 'create_test',
      component: CreateTestPage
  }
]})

export default router
