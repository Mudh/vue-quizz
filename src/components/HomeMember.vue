<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <button @click="subscribeQuiz">Start</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from './Sidebar';

export default {
  name: 'HomeMember',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    subscribeQuiz() {
      this.$router.push('signup');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome {
  flex: 1;
  margin-top: 15%;
}
</style>
