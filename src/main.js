import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
// 引入组件
import ElementUI from 'element-ui'
// 引入组件样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './common.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
