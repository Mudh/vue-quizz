<template>
  <div class="home">
    <HomeVisitor msg="Welcome to vue.js quizz" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeVisitor from '@/components/HomeVisitor.vue';

export default {
  name: 'home',
  components: {
    HomeVisitor
  }
};
</script>
