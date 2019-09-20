// QUIZZ MUTATIONS //////////////////////////////////////////

const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
};

const stopQuizz = (state) => {
  state.isQuizzStart = false;
  state.stepNumber = 1;
  state.questionNumber = 0;
  state.totalTime = null;
};

const incrementQuestion = (state, points) => {
  if (state.questionNumber === 4) {
    state.stepNumber += 1;
    state.questionNumber = 0;
    state.currentPoints += points;
  } else {
    state.questionNumber += 1;
    state.currentPoints += points;
  }
};

const nextQuestion = (state, playerAnswer) => {
  const { points, answer } = state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber];

  // Switch answer from steps 1/2 (input radio) and step 3 (input text)
  // and compare string answers on the last step
  const isCorrectAnswer = typeof playerAnswer === 'boolean'
    ? playerAnswer
    : answer[0].answer.toLowerCase() === playerAnswer.toLowerCase();
  const togglePoints = isCorrectAnswer ? points * state.answerCoeff : 0;

  if (togglePoints === 0) {
    stopQuizz(state);
  } else {
    incrementQuestion(state, togglePoints);
  }
};

// Step 3 answer input
const updateAnswerValue = (state, payload) => {
  state.answerValue = payload;
};

// JOKERS MUTATIONS //////////////////////////////////////////


export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue,
  incrementQuestion
};
