import HomeView from '@/views/HomeView.vue'
import { RouteName, MenuPaths } from '@/types/menu/menu'

export const routes = [
  {
    path: '/',
    name: RouteName.Home,
    component: HomeView,
    children: [
      {
        path: MenuPaths.Category,
        name: RouteName.Category,
        component: () => import('@/views/Category.vue'),
      },
      {
        path: MenuPaths.SubCategory,
        name: RouteName.SubCategory,
        component: () => import('@/views/SubCategory.vue'),
      },
      {
        path: MenuPaths.Brand,
        name: RouteName.Brand,
        component: () => import('@/views/Brand.vue'),
      },
      {
        path: MenuPaths.Product,
        name: RouteName.Product,
        component: () => import('@/views/ProductView.vue'),
      },
      {
        path: MenuPaths.Order,
        name: RouteName.Order,
        component: () => import('@/views/OrderView.vue'),
      },
      {
        path: MenuPaths.Setting,
        name: RouteName.Setting,
        component: () => import('@/views/SettingView.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]
