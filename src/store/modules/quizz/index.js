import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  isQuizzStart: false,
  quizzQuestions: [],
  filteredAnswers: [],
  stepNumber: 1,
  questionNumber: 0,
  answerValue: '',
  answerCoeff: null,
  totalTime: null,
  currentScore: 0,
  stepPoints: 0,
  updatedScore: 0,
  isReviveActive: false,
  radioKey: 0,
  disabledJoker: {
    skip: false,
    revive: false,
    fiftyFifty: true,
    extraTime: false
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
