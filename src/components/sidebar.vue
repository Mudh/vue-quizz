<template>
  <aside class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__top">
        <h2>Hi {{user.nickname}}!</h2>
        <ul class="sidebar__party">
          <li class="sidebar__items">
            <Credits />
            <span class="item">
              x{{user.nb_games}}
              <span>Parties</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Score />
            <span class="item">
              {{points}}
              <span>Points</span>
            </span>
          </li>
        </ul>
        <ul class="sidebar__jokers">
          <li class="sidebar__items">
            <Skip />
            <span class="item">
              x{{user.joker_skip}}
              <span>Skip</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Revive />
            <span class="item">
              x{{user.joker_revive}}
              <span>Revive</span>
            </span>
          </li>
          <li class="sidebar__items">
            <FiftyFifty />
            <span class="item">
              x{{user.joker_5050}}
              <span>50/50</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Timer />
            <span class="item">
              x{{user.joker_timer}}
              <span>Timer</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="sidebar__bottom">
        <div class="sidebar__countdown">
          <Countdown v-if="isQuizzStart" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Credits from './icons/credits';
import Score from './icons/score';
import Skip from './icons/skip';
import Revive from './icons/revive';
import FiftyFifty from './icons/fiftyFifty';
import Timer from './icons/timer';
import Countdown from './coutdown';

export default {
  name: 'Sidebar',
  data() {
    return {
      points: 0
    };
  },
  components: {
    Credits,
    Score,
    Skip,
    Revive,
    FiftyFifty,
    Timer,
    Countdown
  },
  mounted() {
    this.points = this.updatedPoints;
    this.$store.watch(
      (state, getters) => getters['quizz/currentPoints'],
      (newValue, oldValue) => {
        this.points = newValue;
      }
    );
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isQuizzStart: 'quizz/isQuizzStart',
      updatedPoints: 'quizz/updatedPoints'
    }),
    ...mapState(['quizz/currentPoints'])
  }
};
</script>

<style lang="scss">
@import '../styles/sidebar.scss';
</style>
