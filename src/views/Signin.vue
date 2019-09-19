<template>
  <div class="signin">
    <form @submit.prevent="onSubmit">
      <h1>Sign In</h1>
      <div class="input">
        <label for="email">Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      console.log('signin data', formData);
      this.$store.dispatch('auth/login', {
        email: formData.email,
        password: formData.password
      });
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/form.scss';
</style>
