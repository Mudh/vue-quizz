<template>
  <div class="quizz">
    <h2 class="quizz__question">{{question}}</h2>
    <span
      class="quizz__breadcrumb"
    >Step {{step}} - Question {{questionNumber}} / {{questionsLengthByStep}}</span>
    <form @submit.prevent="handleNextQuestion">
      <ul class="quizz__answerList" v-if="step < 3">
        <li :key="answerItem.id" v-for="answerItem in answers" class="quizz__answerItem">
          <input
            type="radio"
            :id="answerItem.answer"
            :value="answerItem.answer"
            :name="answerItem.answer"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      checkedAnswer: false
    };
  },
  name: 'Quizz',
  computed: {
    ...mapGetters({
      step: 'quizz/stepNumber',
      questionNumber: 'quizz/questionNumber',
      questionsLengthByStep: 'quizz/questionsLengthByStep',
      question: 'quizz/question',
      answers: 'quizz/answers',
      answerValue: 'quizz/answerValue'
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
      setTimeout(() => {
        this.$store.dispatch('quizz/nextQuestion', isCorrectAnswer);
      }, 150);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/variables.scss';
@import '../styles/quizz.scss';
</style>
