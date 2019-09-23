import shuffle from '../../../utils/utils';

// QUIZZ AND JOKERS MUTATIONS //////////////////////////////////////////

const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
};

// Joker revive restart quizz from the last current step
// on a wrong answer
const reviveQuizz = (state) => {
  state.isReviveActive = true;
};

// Remove 2 wrong answers
const fiftyFifty = (state) => {
  const { answer } = state.quizzQuestions.step2[state.questionNumber];

  const filteredAnswers = shuffle([
    ...answer.filter(item => item.is_correct === true),
    answer.filter(
      item => item.is_correct === false,
    )[0],
  ]);
  state.filteredAnswers = [...filteredAnswers];
};

const stopQuizz = (state, resetPoints) => {
  if (state.isReviveActive) {
    state.currentPoints = state.stepPoints;
    state.questionNumber = 0;
    state.isReviveActive = false;
    // When you answer incorrectly at the first question of one of the 3 steps
    // the radio input stays checked if you use revive joker
    // The random key enable component re rendering and unchecked it
    // https://michaelnthiessen.com/force-re-render/
    state.radioKey = Math.random().toString(36).replace('0.', '');
  } else {
    state.isQuizzStart = false;
    state.stepNumber = 1;
    state.questionNumber = 0;
    state.totalTime = null;
    state.updatedPoints = resetPoints;
  }
};

const incrementQuestion = (state, points) => {
  if (state.questionNumber === 4) {
    state.stepNumber += 1;
    state.questionNumber = 0;
    state.currentPoints += points;
    state.stepPoints = state.currentPoints;
    state.disabledJoker.fiftyFifty = !(state.stepNumber === 2);
  } else {
    state.questionNumber += 1;
    state.currentPoints += points;
  }
};

const nextQuestion = (state, { playerAnswer, playerTextValue, userPoints }) => {
  const { points, answer } = state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber];

  // Return on regular answers after fiftyFifty joker
  if (state.filteredAnswers.length > 0) {
    state.filteredAnswers = [];
  }

  // Switch answer from steps 1/2 (input radio) and step 3 (input text)
  // and compare string answers on the last step
  const isCorrectAnswer = typeof playerAnswer === 'boolean'
    ? playerAnswer
    : answer[0].answer.toLowerCase() === playerTextValue.toLowerCase();
  const togglePoints = isCorrectAnswer ? points * state.answerCoeff : 0;

  if (togglePoints === 0) {
    stopQuizz(state, userPoints);
  } else {
    incrementQuestion(state, togglePoints);
    state.updatedPoints = userPoints + state.currentPoints;
  }
};


// Step 3 answer input
const updateAnswerValue = (state, value) => {
  state.answerValue = value;
};

// Global mutation for all jokers buttons
const disableJoker = (state, jokerName) => {
  state.disabledJoker[jokerName] = true;
};

export default {
  startQuizz,
  nextQuestion,
  updateAnswerValue,
  stopQuizz,
  incrementQuestion,
  reviveQuizz,
  fiftyFifty,
  disableJoker
};
