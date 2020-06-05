import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MyCart from '../views/MyCart.vue'
import Register from '../views/Register.vue'
import MyTransaction from '../views/MyTransaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mycart',
    name: 'MyCart',
    component: MyCart,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/mytransaction',
    name: 'MyTransaction',
    component: MyTransaction,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
