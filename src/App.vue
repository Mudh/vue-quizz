<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: { Header },
  created() {
    this.$store.dispatch('auth/stayLogged');
  }
};
</script>

<style lang="scss">
@import 'normalize-scss';
@include normalize();

@import './styles/variables.scss';
@import './styles/button.scss';

html,
body,
#app {
  height: 100%;
}

#app {
  font-family: $mainFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $mainColor2;
  font-size: 1em;
  font-weight: 500;

  h3 {
    margin: 40px 0 0;
  }
}
</style>
