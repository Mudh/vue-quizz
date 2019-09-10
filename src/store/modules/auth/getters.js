const user = state => state.user;
const isAuthenticated = state => state.idToken !== null;

export default {
  user,
  isAuthenticated,
};
