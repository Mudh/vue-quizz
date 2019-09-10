<template>
  <header>
    <ul>
      <li>
        <router-link to="/" exact>Home</router-link>
      </li>
      <li>
        <router-link to="/signup">Sign Up</router-link>
      </li>
      <li>
        <router-link to="/signin">Sign In</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

header {
  border-bottom: 1px solid $headerBorder;
  ul {
    display: flex;
    background-color: #ffffff;
    height: 40px;
    position: relative;
    padding: 10px 20px;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    li {
      display: inline-block;
      margin: 0 0.6em;
      font-weight: 500;
      a {
        color: $mainColor2;
        text-decoration: none;

        &:hover,
        &.router-link-exact-active {
          border-bottom: 3px solid $mainColor1;
          padding-bottom: 3px;
        }
      }
    }
  }
}
</style>
