const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
};

const nextQuestion = (state, isCorrectAnswer) => {
  const { points } = state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber];
  const togglePoints = isCorrectAnswer ? points * state.answerCoeff : 0;

  switch (state.questionNumber) {
    case 4:
      state.stepNumber += 1;
      state.questionNumber = 0;
      state.currentPoints += togglePoints;
      break;

    default:
      state.questionNumber += 1;
      state.currentPoints += togglePoints;
  }
};

const updateAnswerValue = (state, payload) => {
  state.answerValue = payload;
};

export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue,
};
