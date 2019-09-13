<template>
  <div class="home">
    <HomeVisitor v-if="!isAuthenticated" msg="Welcome to vue.js quizz" />
    <HomeMember v-if="isAuthenticated" msg="Start the quizz !" />
    <Sidebar></Sidebar>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeVisitor from '@/components/HomeVisitor.vue';
import HomeMember from '@/components/HomeMember.vue';
import Sidebar from '@/components/Sidebar.vue';
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

<style lang="scss">
@import '../styles/variables.scss';

.home {
  display: flex;
}
</style>
