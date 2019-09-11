<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <button @click="subscribeQuiz">Start</button>
  </div>
</template>

<script>
export default {
  name: 'HomeMember',
  props: {
    msg: String
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
@import '../styles/variables.scss';

.welcome {
  margin-top: 15%;
}
</style>
