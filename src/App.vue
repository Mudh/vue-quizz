<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/header';

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

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

html,
body,
#app {
  box-sizing: border-box;
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

  ul {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .home,
  .signup,
  .signin {
    height: calc(100% - 61px);
  }
}
</style>
