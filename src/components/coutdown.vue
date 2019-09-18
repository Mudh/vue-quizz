<template>
  <span>{{minutes}}:{{seconds}}</span>
</template>


<script>
import { mapGetters } from 'vuex';
import twoDigits from '../utils/tools';

export default {
  name: 'Coutdown',
  data() {
    return {
      timer: null,
      resetButton: false,
      totalTime: null
    };
  },
  mounted() {
    if (this.isQuizzStart) {
      this.totalTime = this.totalTimeState;
      this.startTimer();
      console.log('mounted');
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime: time => {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
    }
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
    ...mapGetters({
      isQuizzStart: ['quizz/isQuizzStart'],
      totalTimeState: ['quizz/totalTime']
    })
  }
};
</script>
