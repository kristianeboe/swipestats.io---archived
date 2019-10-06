<template>
  <section class="matches">
    <h1>Matches</h1>
    <Statistic name="Matches" :statistic="totalMatches" />
    <TimeLineChart :chart-data="datacollection" />
  </section>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";
export default {
  props: {
    matches: Object
  },

  computed: {
    totalMatches() {
      return !this.matches
        ? 0
        : Object.entries(this.matches).reduce(
            (acc, [date, value]) => acc + value,
            0
          );
    },
    datacollection() {
      if (!this.matches) {
        return {};
      }

      const labels = [];
      const data = [];

      Object.entries(this.matches).map(([date, value]) => {
        labels.push(date);
        data.push(value);
      });

      return {
        labels,
        datasets: [
          {
            label: "Matches",
            backgroundColor: "#f87979",
            data
          }
        ]
      };
    }
  },
  components: {
    Statistic,
    TimeLineChart
  }
};
</script>

<style>
.matches {
  display: flex;
}
</style>