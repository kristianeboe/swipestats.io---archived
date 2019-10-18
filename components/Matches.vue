<template>
  <InsightsSegment title="Matches" :data="matches" />
</template>

<script>
import InsightsSegment from "@/components/InsightsSegment";

export default {
  props: {
    matches: Object
  },
  data() {
    return {
      totalComparisonMatches: []
    };
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
        data.push({ x: date, y: value });
      });

      const datasets = [
        {
          label: "Matches",
          backgroundColor: "#f87979",
          data
        }
      ];

      if (this.comparisonData.userId) {
        // const comparisonData = data.map(
        //   x => x + Math.abs(Math.floor(Math.random() * (5 - -3) + -3))
        // );

        const comparisonLabels = [];
        const comparisonData1 = [];

        Object.entries(this.comparisonData.matches).map(([date, value]) => {
          comparisonLabels.push(date);
          comparisonData1.push({
            x: date,
            y: value + Math.abs(Math.floor(Math.random() * (5 - -3) + -3))
          });
        });

        datasets.push({
          label: "Comparison matches",
          backgroundColor: "#000",
          data: comparisonData1
        });

        const totalMatches = Object.entries(this.comparisonData.matches).reduce(
          (acc, [date, value]) =>
            acc + value + Math.abs(Math.floor(Math.random() * (5 - -3) + -3)),
          0
        );
        this.totalComparisonMatches.push(totalMatches);
      }

      return {
        labels,
        datasets
      };
    }
  },
  components: {
    InsightsSegment
  }
};
</script>

<style>
.matches {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visualizations {
  display: flex;
}
</style>