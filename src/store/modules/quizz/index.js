import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  isQuizzStart: false,
  quizzQuestions: [],
  stepNumber: 1,
  questionNumber: 0,
  answerValue: ''
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
