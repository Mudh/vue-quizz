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

const nextQuestion = ({ commit, rootState }, { playerAnswer, isQuizzEnding }) => {
  const playerTextValue = rootState.quizz.answerValue;
  const userScore = rootState.auth.user.score;

  // Check answer type (step 1/2 boolean, step 3 string) to commit differents mutations
  if (typeof playerAnswer === 'boolean') {
    commit('nextQuestion', { playerAnswer, userScore, isQuizzEnding });
  } else {
    commit('nextQuestion', { playerTextValue, userScore, isQuizzEnding });
  }
};

const updateAnswerValue = ({ commit }, payload) => {
  commit('updateAnswerValue', payload);
};

// JOKERS HANDLERS //////////////////////////////////////

const handleJoker = ({ commit, dispatch }, evt) => {
  commit(evt.target.name);
  commit('disableJoker', evt.target.name);
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
  handleJoker,
  fetchQuestions,
  fetchLevel,
};
