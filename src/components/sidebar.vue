<template>
  <aside class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__top">
        <h2>Hi {{user.nickname}}!</h2>
        <ul class="sidebar__party">
          <li class="sidebar__items">
            <Credits />
            <span class="item">
              x{{user.parties}}
              <span>Parties</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Score />
            <span class="item">
              {{updatedScore}}
              <span>Points</span>
            </span>
          </li>
        </ul>
        <ul class="sidebar__jokers">
          <li class="sidebar__items">
            <Skip />
            <span class="item">
              x{{jokers.skip}}
              <span>Skip</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Revive />
            <span class="item">
              x{{jokers.revive}}
              <span>Revive</span>
            </span>
          </li>
          <li class="sidebar__items">
            <FiftyFifty />
            <span class="item">
              x{{jokers.fiftyFifty}}
              <span>50/50</span>
            </span>
          </li>
          <li class="sidebar__items">
            <Timer />
            <span class="item">
              x{{jokers.timer}}
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
  components: {
    Credits,
    Score,
    Skip,
    Revive,
    FiftyFifty,
    Timer,
    Countdown
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      jokers: 'auth/jokers',
      isQuizzStart: 'quizz/isQuizzStart',
      updatedScore: 'quizz/updatedScore'
    })
  }
};
</script>

<style lang="scss">
@import '../styles/sidebar.scss';
</style>
