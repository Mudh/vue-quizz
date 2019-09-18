<template>
  <span>{{minutes}}:{{ seconds }}</span>
</template>


<script>
import twoDigits from '../utils/tools';

export default {
  name: 'Coutdown',
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  props: {
    date: {
      type: String
    }
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000)
    };
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000);
    },
    seconds() {
      return twoDigits((this.dateInMilliseconds - this.now) % 60);
    },
    minutes() {
      return twoDigits(
        Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
      );
    }
  }
};
</script>
