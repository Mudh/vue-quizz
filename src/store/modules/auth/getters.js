const user = (state) => {
  if (!state.user) {
    return false;
  } return state.user;
};
const isAuthenticated = state => state.idToken !== null;
const userPoints = (state) => {
  if (!state.user) {
    return false;
  } return state.user.nb_points;
};

export default {
  user,
  isAuthenticated,
  userPoints,
};
