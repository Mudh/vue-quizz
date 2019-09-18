const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
};

const nextQuestion = (state) => {
  switch (state.questionNumber) {
    case 4:
      state.stepNumber += 1;
      state.questionNumber = 0;
      break;

    default:
      state.questionNumber += 1;
  }
};

const updateAnswerValue = (state, payload) => {
  state.answerValue = payload;
};

export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue
};
