<template>
  <span v-if="totalTime > 0">{{minutes}}:{{seconds}}</span>
</template>


<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Coutdown',
  updated() {
    if (this.totalTime === 0) {
      this.$store.dispatch('quizz/stopQuizz', this.userPoints);
    }
  },
  beforeDestroy() {
    this.$store.dispatch('quizz/resetCountdown');
  },
  computed: {
    ...mapGetters({
      minutes: ['quizz/minutes'],
      seconds: ['quizz/seconds'],
      totalTime: ['quizz/totalTime'],
      userPoints: ['auth/userPoints']
    })
  }
};
</script>
