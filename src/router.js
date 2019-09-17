import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      beforeEnter(to, from, next) {
        if (store.state.auth.idToken) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter(to, from, next) {
        if (store.state.auth.idToken) {
          next('/');
        } else {
          next();
        }
      }
    },
  ],
});
