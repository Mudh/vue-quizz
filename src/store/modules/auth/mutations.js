const authUser = (state, userData) => {
  state.idToken = userData.token;
  state.userId = userData.userid;
};

const storeUser = (state, { user, userKey }) => {
  state.user = user;
  state.userKey = userKey;
};

const updatePartyCount = (state) => {
  state.user.parties -= 1;
};

const updateJokerCount = (state, joker) => {
  state.user[`joker_${joker}`] -= 1;
};


const clearAuthData = (state) => {
  state.idToken = null;
  state.userId = null;
};

export default {
  authUser,
  storeUser,
  updatePartyCount,
  updateJokerCount,
  clearAuthData,
};
