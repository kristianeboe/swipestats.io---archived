<template>
  <section
    class="segment shadow-lg rounded px-6 py-4 relative"
    :class="{ 'w-full': fullWidth, 'w-full md:w-2/5': !fullWidth }"
  >
    <div class="flex w-full justify-start">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </div>
    <button
      class="hidden bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded absolute items-center right-0 top-0 m-4"
      @click="fullWidth = !fullWidth"
    >
      <svg
        id="Layer_1"
        class="w-4 h-4"
        viewBox="0 0 352.054 352.054"
        style="enable-background:new 0 0 352.054 352.054"
        xml:space="preserve"
      >
        <g>
          <polygon
            points="144.206,186.634 30,300.84 30,238.059 0,238.059 0,352.054 113.995,352.054 113.995,322.054 51.212,322.054 
		165.419,207.847 	"
          />
          <polygon
            points="238.059,0 238.059,30 300.84,30 186.633,144.208 207.846,165.42 322.054,51.213 322.054,113.995 352.054,113.995 
		352.054,0 	"
          />
        </g>
      </svg>
    </button>
    <div class="visualizations">
      <Statistic :name="title" :statistics="totals" />
    </div>
    <div class="chart-container" style="position: relative; width:100%">
      <TimeLineChart :chart-data="dataCollection" />
    </div>
    <div class="inline-flex pt-4">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        :class="{ 'bg-gray-400': aggregateBy === 'year' }"
        @click="aggregateDataByYear"
      >
        Year
      </button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
        :class="{ 'bg-gray-400': aggregateBy === 'month' }"
        @click="aggregateDataByMonth"
      >
        Month
      </button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        :class="{ 'bg-gray-400': aggregateBy === 'day' }"
        @click="aggregateDataByDay"
      >
        Day
      </button>
    </div>
  </section>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";

import {
  aggregateByYear,
  aggregateByMonth,
  aggregateTotal
} from "@/utils/timeLineUtils";

export default {
  components: {
    Statistic,
    TimeLineChart
  },
  props: {
    title: { type: String, default: "" },
    dataKey: { type: String, default: "" },
    profiles: { type: Array, default: () => [] }
  },
  data() {
    return {
      aggregateBy: "month",
      fullWidth: false,
      localData: {},
      dataCollection: {},
      myTotal: 0,
      totals: [],
      localComparisonData: [],
      totalComparisonData: [],
      categoryData: []
    };
  },

  computed: {
    total() {
      return !this.data.userId
        ? 0
        : Object.entries(this.data[this.dataKey]).reduce(
            (acc, [_date, value]) => acc + value,
            0
          );
    }
  },
  watch: {
    profiles() {
      this.categoryData = this.profiles.map(profile => profile[this.dataKey]);
      // this.categoryData.push(
      //   this.profiles[this.profiles.length - 1][this.dataKey]
      // );
      this.aggregateDataByMonth();
    }
  },
  mounted() {
    this.categoryData = this.profiles.map(profile => profile[this.dataKey]);
    this.totals = this.categoryData.map(data => aggregateTotal(data));
    this.aggregateBy = "month";
    const aggregatedTimelines = this.categoryData.map(data =>
      aggregateByMonth(data)
    );
    this.updateDataCollection(aggregatedTimelines);
  },
  methods: {
    aggregateDataByYear() {
      this.aggregateBy = "year";
      const aggregatedTimelines = this.categoryData.map(data =>
        aggregateByYear(data)
      );
      this.updateDataCollection(aggregatedTimelines);
      this.$ga.event("insights", "aggregateByYear", this.title);
    },
    aggregateDataByMonth() {
      this.aggregateBy = "month";
      const aggregatedTimelines = this.categoryData.map(data =>
        aggregateByMonth(data)
      );
      this.updateDataCollection(aggregatedTimelines);
      this.$ga.event("insights", "aggregateByMonth", this.title);
    },
    aggregateDataByDay() {
      this.aggregateBy = "day";
      this.updateDataCollection(this.categoryData);
      this.$ga.event("insights", "aggregateByDay", this.title);
    },
    updateDataCollection(timeLines) {
      if (timeLines.length === 0) return;

      const datasets = [];

      const borderColors = {
        0: "#f87979",
        1: "#0080FF",
        2: "green",
        3: "yellow"
      };

      const [labels, myDataset] = this.createDataset(
        `profile 1`,
        "transparent",
        borderColors[0],
        timeLines[0]
      );

      datasets.push(myDataset);

      timeLines.slice(1).forEach((timeLine, i) => {
        const [, dataset] = this.createDataset(
          "profile " + (i + 2),
          "transparent",
          borderColors[i + 1],
          timeLine
        );
        datasets.push(dataset);
      });

      this.dataCollection = {
        labels,
        datasets
      };
    },
    createDataset(title, backgroundColor, borderColor, timeLine) {
      const labels = [];
      const data = [];

      Object.entries(timeLine).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
      });

      const dataset = {
        label: `${title}`,
        backgroundColor, // "transparent", //"#f87979",
        borderColor, // "#f87979",
        data
      };

      return [labels, dataset];
    }
  }
};
</script>

<style>
.segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-container {
}

.visualizations {
  display: flex;
}
</style>
