const startQuizz = (state) => {
  state.isQuizzStart = true;
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

export default {
  startQuizz, nextQuestion,
};
