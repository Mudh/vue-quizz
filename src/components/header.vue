<template>
  <header>
    <ul>
      <li>
        <router-link to="/" exact>Home</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/signup">Sign Up</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/signin">Sign In</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
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

      button {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: none;
        border-radius: 0;
        background-color: transparent;
        padding: 0;
        color: $mainColor2;
        font-size: 1em;
        font-family: $mainFont;
        font-weight: 500;

        &:hover {
          color: $mainColor1;
        }
      }
    }
  }
}
</style>
