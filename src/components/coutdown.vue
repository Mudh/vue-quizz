<template>
  <span v-if="totalTime > 0">{{minutes}}:{{seconds}}</span>
</template>


<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Coutdown',
  data() {
    return {
      totalTime: null
    };
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['quizz/totalTime'],
      (newValue, oldValue) => {
        this.totalTime = newValue;
      }
    );
  },
  destroyed() {
    this.$store.dispatch('quizz/resetCountdown');
  },
  computed: {
    ...mapState(['quizz/totalTime']),
    ...mapGetters({
      isQuizzStart: ['quizz/isQuizzStart'],
      minutes: ['quizz/minutes'],
      seconds: ['quizz/seconds']
    })
  }
};
</script>
