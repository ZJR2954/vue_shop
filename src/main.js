import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = '127.0.0.1:8081'
//请求拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

//引入全局样式表
import '@/assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
