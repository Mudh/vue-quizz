import axios from 'axios';

// QUIZZ HANDLERS //////////////////////////////////////

const startQuizz = ({ commit, dispatch }, level) => {
  commit('startQuizz');
  dispatch('fetchQuestions', level);
};

const nextQuestion = ({ commit, state, rootState }, isCorrectAnswer) => {
  // Check answer type (step 1/2 boolean, step 3 string) to commit differents mutations
  if (typeof isCorrectAnswer === 'boolean') {
    commit('nextQuestion', isCorrectAnswer);
  } else {
    commit('nextQuestion', rootState.quizz.answerValue);
  }
  state.updatedPoints = rootState.auth.user.nb_points + rootState.quizz.currentPoints;
};

const updateAnswerValue = ({ commit }, payload) => {
  commit('updateAnswerValue', payload);
};

// JOKERS HANDLERS //////////////////////////////////////

const skipQuestion = ({ commit }) => {
  commit('incrementQuestion', 0);
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
  skipQuestion
};
