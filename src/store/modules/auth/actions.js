import axios from 'axios';
import jwtDecode from 'jwt-decode';
import axiosAuth from '../../../utils/axios-auth';
import { apiKey } from '../../../../local.config';

// REGISTER NEW USER //////////////////////////////////////

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
      const expirationDate = now + res.data.expiresIn * 1000;

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch('storeSignupUser', authData);
      dispatch('setLogoutTimer', res.data.expiresIn * 1000);
      console.log('response', res, new Date());
    })
    .catch(error => console.log('error', error));
};

const storeSignupUser = ({ dispatch, state }, userData) => {
  if (!state.idToken) {
    return;
  }
  const userBirth = new Date();
  const user = {
    created_at: userBirth,
    updated_time: userBirth,
    email: userData.email,
    nickname: userData.nickname,
    firstname: '',
    lastname: '',
    description: '',
    joker_5050: 2,
    joker_revive: 2,
    joker_skip: 2,
    joker_timer: 2,
    nb_games: 2,
    nb_points: 0,
  };
  axios
    .post(`/users.json?auth=${state.idToken}`, user)
    .then(() => {
      dispatch('storeUser', user);
    })
    .catch(error => console.log(error));
};

// LOGIN USER ////////////////////////////////////////////

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
      const expirationDate = now + res.data.expiresIn * 1000;

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch('setLogoutTimer', res.data.expiresIn * 1000);
      dispatch('fetchUser', authData.email);
    })
    .catch(error => console.log('error', error));
};

const storeUser = ({ commit, state }, userData) => {
  if (!state.idToken) {
    return;
  }
  commit('storeUser', userData);
};

const fetchUser = ({ state, dispatch }, val) => {
  if (!state.idToken) {
    return;
  }
  axios
    .get(`/users.json?orderBy="email"&equalTo="${val}"`)
    .then((res) => {
      const user = Object.values(res.data)[0];
      const userKey = Object.keys(res.data)[0];
      dispatch('storeUser', { user, userKey });
    });
};

// AUTO LOGIN AND LOGOUT /////////////////////////////////////

const stayLogged = ({ commit, dispatch }) => {
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

  const decodedToken = jwtDecode(token);
  dispatch('fetchUser', decodedToken.email);
};

const setLogoutTimer = ({ commit }, expirationTime) => {
  setTimeout(() => {
    commit('clearAuthData');
  }, expirationTime);
};

// LOGOUT ////////////////////////////////////////////////////

const logout = ({ commit }) => {
  commit('clearAuthData');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

// UPDATE PLAYER DATA //////////////////////////////////////

const updatePartyCount = ({ state, commit }) => {
  commit('updatePartyCount');
  const tokenEmail = jwtDecode(localStorage.getItem('token'));
  console.log(tokenEmail, state.userKey);
  axios
    .put(`/users/${state.userKey}/nb_games.json?auth=${state.idToken}`, state.user.nb_games)
    .then((res) => {
      console.log(res.data);
    });
};

export default {
  setLogoutTimer,
  signup,
  login,
  storeUser,
  storeSignupUser,
  stayLogged,
  logout,
  fetchUser,
  updatePartyCount,
};
