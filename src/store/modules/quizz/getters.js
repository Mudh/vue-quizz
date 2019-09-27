const isQuizzStart = state => state.isQuizzStart;
const stepNumber = state => state.stepNumber;
const questionNumber = state => state.questionNumber + 1;
const questionsLengthByStep = (state) => {
  if (!state.quizzQuestions[`step${state.stepNumber}`]) {
    return false;
  }
  return state.quizzQuestions[`step${state.stepNumber}`].length;
};
const question = (state) => {
  if (!state.quizzQuestions[`step${state.stepNumber}`]) {
    return false;
  }
  return state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber].question;
};
const answers = (state) => {
  if (!state.quizzQuestions[`step${state.stepNumber}`]) {
    return false;
  }
  const filteredAnswers = state.filteredAnswers.length !== 0
    ? state.filteredAnswers
    : state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber].answer;
  return filteredAnswers;
};
const answerValue = state => state.answervalue;
const totalTime = state => state.totalTime;
const currentPoints = state => state.currentPoints;
const updatedPoints = state => state.updatedPoints;
const isSkipDisabled = state => state.disabledJoker.skip;
const isReviveDisabled = state => state.disabledJoker.revive;
const isFiftyfiftyDisabled = state => state.disabledJoker.fiftyFifty;
const isTimerDisabled = state => state.disabledJoker.extraTime;

export default {
  isQuizzStart,
  stepNumber,
  questionNumber,
  questionsLengthByStep,
  question,
  answers,
  answerValue,
  totalTime,
  currentPoints,
  updatedPoints,
  isSkipDisabled,
  isReviveDisabled,
  isFiftyfiftyDisabled,
  isTimerDisabled,
};
