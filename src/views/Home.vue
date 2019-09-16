<template>
  <div class="home">
    <HomeVisitor v-if="!isAuthenticated" msg="Welcome to vue.js quizz" />
    <HomeMember v-if="isAuthenticated" msg="Start the quizz !" />
    <Sidebar v-if="isAuthenticated" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeVisitor from '@/components/homeVisitor.vue';
import HomeMember from '@/components/homeMember.vue';
import Sidebar from '@/components/sidebar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    HomeVisitor,
    HomeMember,
    Sidebar
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
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
