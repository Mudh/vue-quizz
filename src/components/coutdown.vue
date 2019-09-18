<template>
  <div class="sidebar__countdown">
    <span>{{ display }}</span>
  </div>
</template>


<script>
import { DateTime, Duration } from 'luxon';

export default {
  name: 'Coutdown',
  data() {
    return {
      now: DateTime.local(),
      end: DateTime.local().plus({ seconds: 10 }),
      tick: null
    };
  },
  watch: {
    now() {
      if (this.finished) {
        clearInterval(this.tick);
      }
    }
  },
  computed: {
    remaining() {
      return this.end.diff(this.now).toObject();
    },
    display() {
      return Duration.fromObject(this.remaining).toFormat('mm:ss');
    },
    finished() {
      return this.now >= this.end.minus({ seconds: 1 });
    }
  },
  mounted() {
    this.tick = setInterval(() => {
      this.now = DateTime.local();
    }, 100);
  }
};
</script>
