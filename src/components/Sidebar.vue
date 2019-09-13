<template>
  <aside class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__top">
        <h2>Hi {{user.nickname}}!</h2>
        <ul class="sidebar__party">
          <li class="sidebar__items">
            <!-- <Credits /> -->
            <span class="logo__commentary">x{{user.nb_games}} Parties</span>
          </li>
          <li class="sidebar__items">
            <!-- <Score /> -->
            <span class="logo__commentary">{{user.nb_points}} Points</span>
          </li>
        </ul>
        <ul class="sidebar__jokers">
          <li class="sidebar__items">
            <!-- <Skip /> -->
            <span class="logo__commentary">x{{user.joker_skip}} Skip</span>
          </li>
          <li class="sidebar__items">
            <!-- <Revive /> -->
            <span class="logo__commentary">x{{user.joker_revive}} Revive</span>
          </li>
          <li class="sidebar__items">
            <!-- <FiftyFifty /> -->
            <span class="logo__commentary">x{{user.joker_5050}} 50/50</span>
          </li>
          <li class="sidebar__items">
            <!-- <Timer /> -->
            <span class="logo__commentary">x{{user.joker_timer}} Timer</span>
          </li>
        </ul>
      </div>
      <div class="sidebar__bottom">
        <!-- <Countdown /> -->
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
};
</script>

<style lang="scss">
@import '../styles/sidebar.scss';
</style>
