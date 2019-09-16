<template>
  <div class="quizz">
    <h2 class="quizz__question">{{question}}</h2>
    <span
      class="quizz__breadcrumb"
    >Step {{step}} - Question {{questionNumber}} / {{questionsLengthByStep}}</span>
    <ul class="quizz__answerList">
      <li :key="answerItem.id" v-for="answerItem in answers" class="quizz__answerItem">
        <input
          type="radio"
          :id="answerItem.answer"
          :value="answerItem.answer"
          :name="answerItem.answer"
          @change="handleNextQuestion"
          v-model="checkedAnswer"
        />
        <label class="task-label" :for="answerItem.answer">{{answerItem.answer}}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
      answers: 'quizz/answers'
    })
  },
  methods: {
    handleNextQuestion() {
      setTimeout(() => {
        this.$store.dispatch('quizz/nextQuestion');
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
