const startQuizz = (state) => {
  state.isQuizzStart = true;
};

const nextQuestion = (state) => {
  state.questionNumber += 1;
};

export default {
  startQuizz, nextQuestion,
};
