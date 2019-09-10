import Vue from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://vue-quizz-be217.firebaseio.com/';
axios.defaults.headers.get.Accepts = 'application/json';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
