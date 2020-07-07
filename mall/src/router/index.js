import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')

// 安装插件
Vue.use(VueRouter)

// 创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/Category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  }
]
  


const router = new VueRouter({
    routes,
    mode: "history"
})

// 导出
export default router
