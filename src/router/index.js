import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../main'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/imprimir',
    name: 'Imprimir',
    component: () => import('../views/Imprimir.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/detalles',
    name: 'Detalles',
    component: () => import('../views/Detalles.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = auth.currentUser
  if(reqAuth && !isAuth) {
    next('/')
  } else if(reqAuth===false && isAuth) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
