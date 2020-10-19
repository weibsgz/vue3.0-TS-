import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import store from './store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectHome: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('store.state.user.isLogin', store.state.user.isLogin)
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  // }
  // //如果已经登录了再进入login就去首页
  // else if (to.meta.redirectHome && store.state.user.isLogin) {
  //   next({ name: 'home' })
  // }
  // else {
  //   next()
  // }

  const { user, token } = store.state
  const { requiredLogin, redirectHome } = to.meta

  if (!user.isLogin) {
    //刷新后 isLogin重置为FALSE 如果TOKEN没过期 就取登录接口 并重新设置登录状态TRUE
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store.dispatch("fetchCurrentUser").then(() => {
        if (redirectHome) {
          next({ name: 'home' })
        }
        else {
          next()
        }
      }).catch((err) => {
        console.log(err)
        store.commit('logout')
        next('login')
      })
    }
    else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  }
  else {
    if (redirectHome) {
      next({ name: 'home' })
    }
    else {
      next()
    }
  }
})

export default router