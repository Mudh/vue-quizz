import axios from 'axios';

// QUIZZ MISCELLANEOUS //////////////////////////////////////

const setUserScore = ({ commit, rootState }) => {
  commit('setUserScore', rootState.auth.user.score);
};

// QUIZZ HANDLERS //////////////////////////////////////

const startQuizz = ({ commit, dispatch }, level) => {
  commit('startQuizz');
  dispatch('fetchQuestions', level);
  dispatch('auth/updatePartyCount', null, { root: true });
};

const stopQuizz = ({ commit, rootState }) => {
  commit('stopQuizz', rootState.auth.user.score);
};

const resetCountdown = ({ commit }) => {
  commit('resetCountdown');
};

const nextQuestion = ({ commit, rootState }, playerAnswer) => {
  const playerTextValue = rootState.quizz.answerValue;
  const userPoints = rootState.auth.user.score;

  // Check answer type (step 1/2 boolean, step 3 string) to commit differents mutations
  if (typeof playerAnswer === 'boolean') {
    commit('nextQuestion', { playerAnswer, userPoints });
  } else {
    commit('nextQuestion', { playerTextValue, userPoints });
  }
};

const updateAnswerValue = ({ commit }, payload) => {
  commit('updateAnswerValue', payload);
};

// JOKERS HANDLERS //////////////////////////////////////

const skipQuestion = ({ commit, dispatch }, evt) => {
  commit('incrementQuestion', 0);
  commit('disableJoker', 'skip');
  dispatch('auth/updateJokerCount', evt.target.name, { root: true });
};

const addExtraRun = ({ commit, dispatch }, evt) => {
  commit('reviveQuizz');
  commit('disableJoker', 'revive');
  dispatch('auth/updateJokerCount', evt.target.name, { root: true });
};

const fiftyFifty = ({ commit, dispatch }, evt) => {
  commit('fiftyFifty');
  commit('disableJoker', 'fiftyFifty');
  dispatch('auth/updateJokerCount', evt.target.name, { root: true });
};

const addExtraTime = ({ commit, dispatch }, evt) => {
  commit('addExtraTime');
  commit('disableJoker', 'extraTime');
  dispatch('auth/updateJokerCount', evt.target.name, { root: true });
};

// FETCH QUESTIONS //////////////////////////////////////

const fetchQuestions = ({ rootState, state, dispatch }, level) => {
  if (!rootState.auth.idToken) {
    return;
  }
  axios
    .get(`/questionsList.json?auth=${rootState.auth.idToken}`)
    .then((res) => {
      state.quizzQuestions = res.data;
      dispatch('fetchLevel', level);
      console.log('questions', res.data);
    })
    .catch(error => console.log(error));
};

const fetchLevel = ({ rootState, state }, level) => {
  if (!rootState.auth.idToken) {
    return;
  }
  axios
    .get(`/level.json?auth=${rootState.auth.idToken}`)
    .then((res) => {
    // From the chosen level set coefficient answer and countdown duration
      state.answerCoeff = res.data.find(el => el.alias === level).coeff;
      state.totalTime = res.data.find(el => el.alias === level).duration;
    // state.totalTime = 10;
    })
    .catch(error => console.log(error));
};

export default {
  setUserScore,
  startQuizz,
  stopQuizz,
  resetCountdown,
  nextQuestion,
  updateAnswerValue,
  fetchQuestions,
  fetchLevel,
  skipQuestion,
  addExtraRun,
  fiftyFifty,
  addExtraTime
};
