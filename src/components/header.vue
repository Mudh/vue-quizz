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
import { mapGetters } from 'vuex';
import router from '../router';

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
      router.push('/signin');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/functions.scss';
@import '../styles/variables.scss';

header {
  position: relative;
  background-color: $mainColor1;
  z-index: 1;

  &:after {
    content: '';
    background: url('../assets/main.png') repeat center center/12px 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    z-index: -1;
  }

  ul {
    position: relative;
    display: flex;
    background-color: transparent;
    height: 50px;
    position: relative;
    padding: 0 rem(20px);
    justify-content: flex-end;
    align-items: center;
    margin: 0;

    li {
      display: inline-block;
      margin: 0 0.6em;
      font-weight: 500;

      a {
        position: relative;
        color: $mainColor4;
        text-decoration: none;
        padding: rem(15) 0;

        &:before {
          content: '';
          transform: scaleX(0);
          transition: transform 0.2s ease-out;
        }

        &:hover,
        &.router-link-exact-active {
          &:before {
            content: '';
            background-color: $mainColor2;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            transform: scaleX(1);
          }
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
        color: $mainColor4;
        font-size: 1em;
        font-family: $mainFont;
        font-weight: 500;
        margin-top: 0;

        &:hover {
          color: $mainColor4;
        }
      }
    }
  }
}
</style>
