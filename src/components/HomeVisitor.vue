<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      It's like a personal "todolist" training project transpose
      <br />into a real playable quizz, try it now !
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeVisitor',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
