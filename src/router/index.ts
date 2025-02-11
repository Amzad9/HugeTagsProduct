import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = String(to.name)
  const isAuthenticated = !!sessionStorage.getItem('token')
  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
