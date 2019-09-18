import axios from 'axios';

// QUIZZ HANDLERS //////////////////////////////////////

const startQuizz = ({ commit, dispatch }, level) => {
  commit('startQuizz');
  dispatch('fetchQuestions', level);
};

const nextQuestion = ({ commit }) => {
  commit('nextQuestion');
};

const updateAnswerValue = ({ commit }, payload) => {
  commit('updateAnswerValue', payload);
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
      state.answerCoeff = res.data.find(el => el.alias === level).coeff;
    })
    .catch(error => console.log(error));
};

export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue,
  fetchQuestions,
  fetchLevel
};
