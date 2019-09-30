const authUser = (state, userData) => {
  state.idToken = userData.token;
  state.userId = userData.userid;
};

const storeUser = (state, { user, userKey }) => {
  state.user = user;
  state.userKey = userKey;
};

const updatePartyCount = (state) => {
  state.user.nb_games -= 1;
  console.log(state.user);
};


const clearAuthData = (state) => {
  state.idToken = null;
  state.userId = null;
};

export default {
  authUser,
  storeUser,
  updatePartyCount,
  clearAuthData,
};
