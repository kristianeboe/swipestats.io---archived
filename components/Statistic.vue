<template>
  <div class="wrapper">
    <h3 class="name">Total {{name}}</h3>
    <h2 class="statistic">{{statistic}}</h2>
    <h5 v-for="c in comparison" :key="c">{{c}}</h5>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    statistic: Number,
    comparison: Array
  }
};
</script>

<style lang="scss" scoped >
.wrapper {
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>