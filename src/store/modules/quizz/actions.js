import axios from 'axios';

// QUIZZ HANDLERS //////////////////////////////////////

const startQuizz = ({ commit, dispatch }) => {
  commit('startQuizz');
  dispatch('fetchQuestions');
};

const nextQuestion = ({ commit }) => {
  commit('nextQuestion');
};

// FETCH QUESTIONS //////////////////////////////////////

const fetchQuestions = ({ rootState, state }) => {
  if (!rootState.auth.idToken) {
    return;
  }
  axios
    .get(`/questionsList.json?auth=${rootState.auth.idToken}`)
    .then((res) => {
      state.quizzQuestions = res.data;
      console.log('created', res.data);
    })
    .catch(error => console.log(error));
};

export default {
  startQuizz, nextQuestion, fetchQuestions
};
