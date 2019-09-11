<template>
  <div class="home">
    <HomeVisitor v-if="!isAuthenticated" msg="Welcome to vue.js quizz" />
    <HomeMember v-if="isAuthenticated" msg="Start the quizz !" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeVisitor from '@/components/HomeVisitor.vue';
import HomeMember from '@/components/HomeMember.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    HomeVisitor,
    HomeMember
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
};
</script>
