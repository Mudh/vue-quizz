<template>
  <div class="signup">
    <form @submit.prevent="onSubmit">
      <h1>Sign Up</h1>
      <div class="input">
        <label for="nickname">Nickname</label>
        <input type="text" id="nickname" v-model="nickname" />
      </div>
      <div class="input">
        <label for="email">Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="input">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" />
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
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      console.log('sign up data', formData);
      // this.$store.dispatch('signup', formData);
    }
  }
};
</script>

<style lang='scss'>
@import '../styles/variables.scss';
@import '../styles/form.scss';
</style>
