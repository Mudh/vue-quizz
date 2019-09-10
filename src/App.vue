<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: { Header }
};
</script>

<style lang="scss">
@import 'normalize-scss';
@include normalize();
@import './styles/variables.scss';

#app {
  font-family: $mainFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $mainColor2;
  font-size: 1em;
  font-weight: 500;
  // background: rgb(44, 62, 80);
  // background: linear-gradient(
  //   45deg,
  //   rgba(44, 62, 80, 1) 0%,
  //   rgba(36, 68, 101, 1) 100%
  // );
  h3 {
    margin: 40px 0 0;
  }
}
</style>
