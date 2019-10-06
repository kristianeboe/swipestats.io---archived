<template>
  <div class="wrapper">
    <h3 class="name">Total {{name}}</h3>
    <h2 class="statistic">{{statistic}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    statistic: Number
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