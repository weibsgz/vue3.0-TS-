import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'


axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use((config) => {

  const Token = localStorage.getItem('token')
  if (Token) {
    config.headers.common.Authorization = `Bearer ${Token}`
  }

  config.params = { ...config.params, icode: '325DEE90E25A32A4' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '325DEE90E25A32A4')
  } else {
    config.data = { ...config.data, icode: '325DEE90E25A32A4' }
  }
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  store.commit('setError', { status: false, message: '' })
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})


//替代 2.0 中 的 mode
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
