import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store/store'
import router from './router/router'

const icode = 'BD02521ABDA36B8C' // 项目接口校验码

// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: icode }
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    config.data = { ...config.data, icode: icode }
  }
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: false, message: '' })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
