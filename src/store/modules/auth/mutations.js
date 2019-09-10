const authUser = (state, userData) => {
  state.idToken = userData.token;
  state.userId = userData.userid;
};

const storeUser = (state, user) => {
  state.user = user;
};

const clearAuthData = (state) => {
  state.idToken = null;
  state.userId = null;
};

export default {
  authUser, storeUser, clearAuthData,
};
