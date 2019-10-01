const user = (state) => {
  console.log(state.user);
  if (!state.user) {
    return false;
  } return state.user;
};
const jokers = (state) => {
  if (state.user.jokers === null || state.user.jokers === undefined) {
    return false;
  } return state.user.jokers;
};
const isAuthenticated = state => state.idToken !== null;
const userPoints = (state) => {
  if (!state.user) {
    return false;
  } return state.user.score;
};

export default {
  user,
  jokers,
  isAuthenticated,
  userPoints,
};
