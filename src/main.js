import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
//注册全局组件
Vue.component('tree-table', TreeTable)

//注册全局过滤器
Vue.filter('dateFormat', function (originVal) {
    const dt = new Date(originVal);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + '').padStart(2, '0');
    const d = (dt.getDay() + '').padStart(2, '0');

    const hh = (dt.getHours() + '').padStart(2, '0');
    const mm = (dt.getMinutes() + '').padStart(2, '0');
    const ss = (dt.getSeconds() + '').padStart(2, '0');
    return  `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
})
//注册富文本编辑器
Vue.use(VueQuillEditor)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
