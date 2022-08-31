import Vue from 'vue'
import VueRouter from 'vue-router'

import signupView from '../views/SignupView.vue'
import news from '../views/NewsView.vue'
import loginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/auth/signup',
    name: 'signup-form',
    component: signupView
  },
  {
    path: '/login',
    name: 'login-form',
    component : loginView
  },
  {
    path: '/news',
    name: 'news-page',
    component: news
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
