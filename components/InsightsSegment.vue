<template>
  <section class="segment shadow-lg rounded px-6 py-4">
    <div class="flex w-full justify-start">
      <h2 class="text-2xl font-bold">{{title}}</h2>
    </div>
    <div class="visualizations">
      <Statistic :name="title" :statistic="total" />
    </div>
    <div class="chart-container" style="position: relative; height:auto; width:100%">
      <TimeLineChart :chart-data="datacollection" />
    </div>
    <div class="inline-flex">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Year</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">Month</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">Week</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Day</button>
    </div>
  </section>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";
export default {
  props: {
    title: String,
    data: Object
    // comparisonData: Object
  },
  data() {
    return {
      // totalComparisonData: []
    };
  },

  computed: {
    total() {
      return !this.data
        ? 0
        : Object.entries(this.data).reduce(
            (acc, [date, value]) => acc + value,
            0
          );
    },
    datacollection() {
      if (!this.data) {
        return {};
      }

      const labels = [];
      const data = [];

      Object.entries(this.data).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
      });

      const datasets = [
        {
          label: this.title,
          backgroundColor: "#f87979",
          data
        }
      ];

      //   if (this.comparisonData.userId) {
      //     // const comparisonData = data.map(
      //     //   x => x + Math.abs(Math.floor(Math.random() * (5 - -3) + -3))
      //     // );

      //     const comparisonLabels = [];
      //     const comparisonData1 = [];

      //     Object.entries(this.comparisonData.matches).map(([date, value]) => {
      //       comparisonLabels.push(date);
      //       comparisonData1.push({
      //         x: date,
      //         y: value + Math.abs(Math.floor(Math.random() * (5 - -3) + -3))
      //       });
      //     });

      //     datasets.push({
      //       label: "Comparison matches",
      //       backgroundColor: "#000",
      //       data: comparisonData1
      //     });

      //     const totalMatches = Object.entries(this.comparisonData.matches).reduce(
      //       (acc, [date, value]) =>
      //         acc + value + Math.abs(Math.floor(Math.random() * (5 - -3) + -3)),
      //       0
      //     );
      //     this.totalComparisonData.push(totalMatches);
      //   }

      return {
        labels,
        datasets
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
.segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.visualizations {
  display: flex;
}
</style>