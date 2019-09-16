<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <p>
      The difficulty stands in the remaining time,
      <br />choose it wisely!!
    </p>
    <button @click="startQuizz">Slow</button>
    <button @click="startQuizz">Medium</button>
    <button @click="startQuizz">Fast</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    startQuizz() {
      this.$router.push('quizz');
    }
  }
};
</script>

<style scoped lang="scss">
.welcome {
  flex: 1;
  margin-top: 15%;
  button {
    margin: 2.5em 0.25em;
    padding: 0.5rem 1.2rem;
  }
}
</style>
