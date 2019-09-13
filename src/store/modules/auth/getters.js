const user = (state) => {
  if (!state.user) {
    return false;
  } return state.user;
};
const isAuthenticated = state => state.idToken !== null;

export default {
  user,
  isAuthenticated,
};
