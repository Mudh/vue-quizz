import { shuffle } from '../../../utils/utils';

// MISCELLANEOUS MUTATIONS //////////////////////////////////////////

const setUserScore = (state, score) => {
  state.updatedScore = score;
};

// QUIZZ MUTATIONS //////////////////////////////////////////

const resetQuizz = (state, score) => {
  state.isQuizzStart = false;
  state.stepNumber = 1;
  state.questionNumber = 0;
  state.totalTime = null;
  state.updatedScore = score;
  state.currentScore = 0;
};

const stopQuizz = (state, resetScore) => {
  if (state.isReviveActive && state.totalTime >= 1) {
    state.currentScore = state.stepScore;
    state.updatedScore = resetScore + state.currentScore;
    state.questionNumber = 0;
    state.isReviveActive = false;
  } else {
    resetQuizz(state, resetScore);
  }
};

const startCountdown = (state) => {
  const countdown = setInterval(() => {
    if (state.totalTime >= 1) {
      state.totalTime -= 1;
    } else {
      state.totalTime = 0;
      clearInterval(countdown);
    }
  }, 1000);
};

const resetCountdown = (state) => {
  state.isQuizzStart = false;
  state.totalTime = null;
  clearInterval(startCountdown(state));
};

const startQuizz = (state, level) => {
  state.isQuizzStart = true;
  state.level = level;
  startCountdown(state);
};

const incrementQuestion = (state, points) => {
  if (state.questionNumber === 4) {
    state.stepNumber += 1;
    state.questionNumber = 0;
    state.currentScore += points;
    state.stepScore = state.currentScore;
    state.disabledJoker.fiftyFifty = !(state.stepNumber === 2);
  } else {
    state.questionNumber += 1;
    state.currentScore += points;
  }
};

const endingQuizz = (state, finalScore) => {
  resetQuizz(state, finalScore);
};

const nextQuestion = (state, {
  playerAnswer,
  playerTextValue,
  userScore,
  isQuizzEnding
}) => {
  const { points, answer } = state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber];

  // Return on regular answers after fiftyFifty joker
  if (state.filteredAnswers.length > 0) state.filteredAnswers = [];

  // Switch answer from steps 1/2 (input radio) and step 3 (input text)
  // and compare string answers on the last step
  const isCorrectAnswer = typeof playerAnswer === 'boolean'
    ? playerAnswer
    : answer[0].answer.toLowerCase() === playerTextValue.toLowerCase();
  const togglePoints = isCorrectAnswer ? points * state.answerCoeff : 0;

  if (togglePoints === 0) stopQuizz(state, userScore);

  if (isQuizzEnding) {
    endingQuizz(state, userScore + state.currentScore);
  } else {
    incrementQuestion(state, togglePoints);
  }
  state.updatedScore = userScore + state.currentScore;
};

// Step 3 answer input
const updateAnswerValue = (state, value) => {
  state.answerValue = value;
};

// JOKERS MUTATIONS //////////////////////////////////////////

// Skip question
const skip = (state) => {
  incrementQuestion(state, 0);
};

// Restart quizz from the last current step on a wrong answer
const extraRun = (state) => {
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

const extraTime = (state) => {
  state.totalTime += 30;
};

// Global mutation for all jokers buttons
const disableJoker = (state, jokerName) => {
  state.disabledJoker[jokerName] = true;
};

export default {
  setUserScore,
  startQuizz,
  nextQuestion,
  updateAnswerValue,
  stopQuizz,
  resetCountdown,
  incrementQuestion,
  skip,
  extraRun,
  fiftyFifty,
  extraTime,
  disableJoker
};
