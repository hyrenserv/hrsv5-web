import Vue from 'vue'

import router from './router'

import ElementUI from 'element-ui';

import '@/assets/css/common.css';

import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import App from './App.vue';
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
Vue.use(ElementUI);

/**验证引入 */
import filterRule from '@/utils/js/filter_Rules'
Vue.use(filterRule)
//导入charts并使用
import VCharts from 'v-charts'
Vue.use(VCharts);
// Base64
import Base64 from '@/utils/base64.js' 
Vue.prototype.$Base64 = Base64;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app')
