<template>
  <div class="home--member">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <p>
      The difficulty stands in the remaining time,
      <br />choose it wisely!!
    </p>
    <button @click="startQuizz('slow')">Slow</button>
    <button @click="startQuizz('medium')">Medium</button>
    <button @click="startQuizz('fast')">Fast</button>
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
    startQuizz(level) {
      this.$store.dispatch('quizz/startQuizz', level);
    }
  }
};
</script>

<style scoped lang="scss">
.home--member {
  flex: 1;
  margin-top: 15%;
  button {
    margin: 2.5em 0.25em;
    padding: 0.5rem 1.2rem;
  }
}
</style>
