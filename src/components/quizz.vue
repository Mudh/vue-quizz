<template>
  <div class="quizz">
    <header>
      <h2 class="quizz__question">{{question}}</h2>
      <span
        class="quizz__breadcrumb"
      >Step {{step}} - Question {{questionNumber}} / {{questionsLengthByStep}}</span>
    </header>
    <form @submit.prevent="handleNextQuestion">
      <ul class="quizz__answerList" v-if="step < 3">
        <li :key="answerItem.id" v-for="answerItem in answers" class="quizz__answerItem">
          <input
            type="radio"
            :id="answerItem.answer"
            :value="answerItem.answer"
            :name="answerItem.answer"
            :key="radioKey"
            @change="handleNextQuestion(answerItem.is_correct)"
            v-model="checkedAnswer"
          />
          <label class="task-label" :for="answerItem.answer">{{answerItem.answer}}</label>
        </li>
      </ul>
      <fieldset class="quizz__answerItem quizz__answerItem--text" v-if="step === 3">
        <input
          type="text"
          autocomplete="off"
          placeholder="Write the answer and hit 'Enter' tab"
          v-model="answerValue"
        />
      </fieldset>
    </form>
    <footer class="quizz__footer">
      <button class="joker" :disabled="isSkipDisabled" @click="skipQuestion">
        <Skip />
      </button>
      <button class="joker" :disabled="isReviveDisabled" @click="addExtraRun">
        <Revive />
      </button>
      <button class="stop" btnText="STOP" @click="stopQuizz">STOP</button>
      <button class="joker" :disabled="isFiftyfiftyDisabled" @click="fiftyFifty">
        <FiftyFifty />
      </button>
      <button class="joker" :disabled="isTimerDisabled" @click="addExtraTime">
        <Timer />
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Skip from './icons/skip';
import Revive from './icons/revive';
import FiftyFifty from './icons/fiftyFifty';
import Timer from './icons/timer';

export default {
  data() {
    return {
      checkedAnswer: false,
      disabled: true
    };
  },
  components: {
    Skip,
    Revive,
    FiftyFifty,
    Timer
  },
  name: 'Quizz',
  computed: {
    ...mapGetters({
      step: 'quizz/stepNumber',
      questionNumber: 'quizz/questionNumber',
      questionsLengthByStep: 'quizz/questionsLengthByStep',
      question: 'quizz/question',
      answers: 'quizz/answers',
      answerValue: 'quizz/answerValue',
      radioKey: 'quizz/radioKey',
      isSkipDisabled: 'quizz/isSkipDisabled',
      isReviveDisabled: 'quizz/isReviveDisabled',
      isFiftyfiftyDisabled: 'quizz/isFiftyfiftyDisabled',
      isTimerDisabled: 'quizz/isTimerDisabled'
    }),
    answerValue: {
      get() {
        return this.$store.getters['quiz/answerValue'];
      },
      set(value) {
        this.$store.dispatch('quizz/updateAnswerValue', value);
      }
    }
  },
  methods: {
    handleNextQuestion(isCorrectAnswer) {
      // The time out helps the user to notice the checked answer
      // in order to improve ux/ui experience
      setTimeout(() => {
        this.$store.dispatch('quizz/nextQuestion', isCorrectAnswer);
      }, 150);
      console.log(this.isSkipDisabled);
    },
    ...mapActions({
      stopQuizz: 'quizz/stopQuizz',
      skipQuestion: 'quizz/skipQuestion',
      addExtraRun: 'quizz/addExtraRun',
      fiftyFifty: 'quizz/fiftyFifty',
      addExtraTime: 'quizz/addExtraTime'
    })
  }
};
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
@import '../styles/quizz.scss';
</style>
