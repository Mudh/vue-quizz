<template>
  <div class="home">
    <HomeVisitor v-if="!isAuthenticated" msg="Welcome to vue.js quizz" />
    <HomeMember v-if="isAuthenticated && !isQuizzStart" msg="Start the quizz !" />
    <Quizz v-if="isAuthenticated && isQuizzStart" msg="Start the quizz !" />
    <Sidebar v-if="isAuthenticated" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import HomeVisitor from '../components/homeVisitor';
import HomeMember from '../components/homeMember';
import Sidebar from '../components/sidebar';
import Quizz from '../components/quizz';

export default {
  name: 'home',
  components: {
    HomeVisitor,
    HomeMember,
    Sidebar,
    Quizz
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isQuizzStart: 'quizz/isQuizzStart'
    })
  }
};
</script>

<style lang="scss" .scoped>
@import '../styles/variables.scss';

.home {
  display: flex;
  justify-content: center;
}
</style>
