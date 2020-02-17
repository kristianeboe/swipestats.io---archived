<template>
  <div class="wrapper p-4">
    <h3 class="name text-base font-light">{{ name }}</h3>
    <h2 class="statistic text-xl font-bold">{{ statisticString }}</h2>
    <h5 v-for="(c, index) in comparisonStrings" :key="index + c">{{ c }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    statistics: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    statisticString() {
      return this.statisticToString(
        this.statistics.length > 0 ? this.statistics[0] : 0
      );
    },
    comparisonStrings() {
      return this.statistics.slice(1).map(s => this.statisticToString(s));
    }
  },
  methods: {
    statisticToString(s) {
      return Number.isInteger(s) ? s : s.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
