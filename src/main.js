import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from "element-ui"
Vue.use(ElementUI)
const $message = options => {
  return Message({
    ...options,
    offset: 200
  });
};
 
//重写方法,将offset写入options
['success', 'warning', 'info', 'error'].forEach(type => {
  $message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        offset: 100
      };
    }
    options.type = type;
    return Message(options);
  };
});
//将$message挂载到this上
Vue.prototype.$message = $message;
//如果用要使用 `this.$message.closeAll()`则加上下面
Vue.prototype.$message.closeAll =Message.closeAll;

import * as echarts from 'echarts';
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts

// 动态背景
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
//公共css文件
import '@/assets/comm.css';

Vue.config.productionTip = false

// 路由守卫
import './permission.js'
// loco监听
import tool from "./utils/tool";
Vue.use(tool);

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
