import { createRouter, createWebHistory } from 'vue-router'
import signupView from '../views/SignupView.vue'
import news from '../views/NewsView.vue'
import loginView from '../views/LoginView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
