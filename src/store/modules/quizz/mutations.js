const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
};

const nextQuestion = (state, playerAnswer) => {
  const { points, answer } = state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber];

  // Switch answer from steps 1/2 (input radio) and step 3 (input text)
  // and compare string answers on the last step
  const isCorrectAnswer = typeof playerAnswer === 'boolean'
    ? playerAnswer
    : answer[0].answer.toLowerCase() === playerAnswer.toLowerCase();
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
