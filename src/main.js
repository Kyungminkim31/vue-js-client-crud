
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import store from './store';
import VeeValidate from 'vee-validate';

import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css";

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VeeValidate);

Vue.use(Vuetify);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

