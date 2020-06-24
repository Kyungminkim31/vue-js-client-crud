
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';

import EasyUI from 'vx-easyui';

import VueJsDialog from "vuejs-dialog";

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.config.productionTip = false

Vue.use(EasyUI);
Vue.use(VueJsDialog);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

