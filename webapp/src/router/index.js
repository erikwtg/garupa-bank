import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import { useAuthStore } from '@/stores/auth'
import { getActivePinia } from 'pinia'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    props: {
      errorCode: '404',
      errorMessage: 'Página não encontrada'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!getActivePinia()) {
    console.warn('[Pinia]: Pinia ainda não foi inicializado!')
    return next()
  }

  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
