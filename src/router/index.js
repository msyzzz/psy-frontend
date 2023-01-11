import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LogInPage from '../views/LogInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import DoTestPage from '../views/DoTestPage.vue'
import ShowTestPage from '../views/ShowTestPage.vue'
import ChangeTestPage from '../views/ChangeTestPage.vue'
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
    path: '/show_test',
    name: 'show_test',
    component: ShowTestPage
  }, {
    path: '/change_test',
    name: 'change_test',
    component: ChangeTestPage
  }, {
      path: '/create_test',
      name: 'create_test',
      component: CreateTestPage
  },{
      path: '/signup',
      name: 'signup',
      component: SignUpPage
  }
]})

export default router
