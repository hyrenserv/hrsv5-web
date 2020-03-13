import Vue from 'vue'

import router from './router'

import ElementUI from 'element-ui';

import '@/assets/css/common.css';
import '@/assets/css/changeColor.less';

import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import App from './App.vue';
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
Vue.use(ElementUI);
ElementUI.Dialog.props.closeOnClickModal.default = false; //默认点击遮照为不关闭
/**验证引入 */
import filterRule from '@/utils/js/filter_Rules'
Vue.use(filterRule)

//导入charts并使用
import VCharts from 'v-charts'
Vue.use(VCharts);
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)
// Base64
import Base64 from '@/utils/base64.js' 
Vue.prototype.$Base64 = Base64;

/**公用的提示消息框 */
import * as message from '@/utils/js/message.js'
Vue.prototype.$Msg = message;

/** 获取代码项类型 */
import * as codeitems from '@/utils/js/codeitems.js'
Vue.prototype.$Code = codeitems;

Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app')
