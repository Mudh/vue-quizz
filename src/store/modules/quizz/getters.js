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
  return state.quizzQuestions[`step${state.stepNumber}`][state.questionNumber].answer;
};
const answerValue = state => state.answervalue;

const totalTime = state => state.totalTime;

const updatedPoints = state => state.updatedPoints;

export default {
  isQuizzStart,
  stepNumber,
  questionNumber,
  questionsLengthByStep,
  question,
  answers,
  answerValue,
  totalTime,
  updatedPoints
};
