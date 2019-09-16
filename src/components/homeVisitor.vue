<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <p>
      It's like a personal "todolist" training project transpose
      <br />into a real playable quizz, try it now !
    </p>
    <button @click="subscribeQuiz">Sign Up</button>
  </div>
</template>

<script>
export default {
  name: 'HomeVisitor',
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
