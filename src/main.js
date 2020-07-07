
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css";

import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';

import EasyUI from 'vx-easyui';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(EasyUI);
Vue.use(Vuetify);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

