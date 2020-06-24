
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';

import EasyUI from 'vx-easyui';

Vue.config.productionTip = false

Vue.use(EasyUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

