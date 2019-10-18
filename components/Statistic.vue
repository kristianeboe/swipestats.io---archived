<template>
  <div class="wrapper p-4">
    <h3 class="name text-base font-light">{{name}}</h3>
    <h2 class="statistic text-xl font-bold">{{statisticString}}</h2>
    <h5 v-for="c in comparison" :key="c">{{c}}</h5>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    statistic: Number,
    comparison: Array
  },
  computed: {
    statisticString() {
      return Number.isInteger(this.statistic)
        ? this.statistic
        : this.statistic.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped >
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>