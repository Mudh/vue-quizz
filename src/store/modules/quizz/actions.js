import axios from 'axios';

// QUIZZ HANDLERS //////////////////////////////////////

const startQuizz = ({ commit, dispatch }, level) => {
  commit('startQuizz');
  dispatch('fetchQuestions', level);
};

const stopQuizz = ({ commit, rootState }) => {
  commit('stopQuizz', rootState.auth.user.nb_points);
};

const nextQuestion = ({ commit, rootState }, playerAnswer) => {
  const playerTextValue = rootState.quizz.answerValue;
  const userPoints = rootState.auth.user.nb_points;

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

const skipQuestion = ({ commit }) => {
  commit('incrementQuestion', 0);
  commit('disableJoker', 'skip');
};

const addExtraRun = ({ commit }) => {
  commit('reviveQuizz');
  commit('disableJoker', 'revive');
};

const fiftyFifty = ({ commit }) => {
  commit('disableJoker', 'fiftyFifty');
  commit('fiftyFifty');
};

const addExtraTime = ({ commit }) => {
  commit('disableJoker', 'extraTime');
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
    })
    .catch(error => console.log(error));
};

export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue,
  fetchQuestions,
  fetchLevel,
  stopQuizz,
  skipQuestion,
  addExtraRun,
  fiftyFifty,
  addExtraTime
};
