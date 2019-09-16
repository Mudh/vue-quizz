import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth/index';
import quizzModule from './modules/quizz/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    quizz: quizzModule,
  },
});
