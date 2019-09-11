import axios from 'axios';
import axiosAuth from '../../../utils/axios-auth';
import router from '../../../router';
import { apiKey } from '../../../../local.config';

const setLogoutTimer = ({ commit }, expirationTime) => {
  setTimeout(() => {
    commit('clearAuthData');
  }, expirationTime);
};

const signup = ({ commit, dispatch }, authData) => {
  axiosAuth
    .post(`/accounts:signUp?key=${apiKey}`, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    })
    .then((res) => {
      commit('authUser', {
        token: res.data.idToken,
        userId: res.data.localId,
      });
      const now = new Date().getTime();
      const expirationDate = now + res.data.expiresIn * 100;

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch('storeUser', authData);
      dispatch('setLogoutTimer', res.data.expiresIn * 100);
      router.push('/');
      console.log('response', res);
    })
    .catch(error => console.log('error', error));
};

const login = ({ commit, dispatch }, authData) => {
  axiosAuth
    .post(
      `/accounts:signInWithPassword?key=${apiKey}`,
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      },
    )
    .then((res) => {
      commit('authUser', {
        token: res.data.idToken,
        userId: res.data.localId,
      });
      const now = new Date().getTime();
      const expirationDate = now + res.data.expiresIn * 100;

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch('setLogoutTimer', res.data.expiresIn * 100);
      router.push('/');
      console.log('response', res);
    })
    .catch(error => console.log('error', error));
};

const storeUser = ({ state }, userData) => {
  if (!state.idToken) {
    return;
  }
  axios
    .post(`/users.json?auth=${state.idToken}`, userData)
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

const stayLogged = ({ commit }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const expirationDate = parseInt(localStorage.getItem('expirationDate'), 10);
  const now = new Date().getTime();
  if (now >= expirationDate) {
    return;
  }
  const userId = localStorage.getItem('userId');
  commit('authUser', {
    token,
    userId,
  });
};

const logout = ({ commit }) => {
  commit('clearAuthData');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  router.push('/signin');
};

const fetchUser = ({ state }) => {
  if (!state.idToken) {
    return;
  }
  axios
    .get(`/users.json?auth=${state.idToken}`)
    .then((res) => {
      console.log('created', res);
    })
    .catch(error => console.log(error));
};

export default {
  setLogoutTimer,
  signup,
  login,
  storeUser,
  stayLogged,
  logout,
  fetchUser,
};
