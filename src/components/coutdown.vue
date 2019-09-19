<template>
  <span v-if="totalTime > 0">{{minutes}}:{{seconds}}</span>
</template>


<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Coutdown',
  data() {
    return {
      timer: null,
      totalTime: null
    };
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['quizz/totalTime'],
      (newValue, oldValue) => {
        this.totalTime = newValue;
        this.startTimer();
      }
    );
  },
  destroyed() {
    this.resetTimer();
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
    ...mapState(['quizz/totalTime']),
    ...mapGetters({
      isQuizzStart: ['quizz/isQuizzStart']
    })
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime -= 1;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
    }
  }
};
</script>
