<template>
  <section
    class="segment shadow-lg rounded px-6 py-4 relative"
    :class="{ 'w-4/5': fullWidth }"
  >
    <div class="flex w-full justify-start">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </div>
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded absolute items-center right-0 top-0 m-4"
      @click="fullWidth = !fullWidth"
    >
      <svg
        class="w-4 h-4"
        id="Layer_1"
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
    <div
      class="chart-container"
      style="position: relative; height:auto; width:100%"
    >
      <TimeLineChart :chart-data="dataCollection" />
    </div>
    <div class="inline-flex">
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
  props: {
    title: String,
    dataKey: String,
    profileData: Array,
    profiles: Array
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
  mounted() {
    this.categoryData = this.profiles.map(profile => profile[this.dataKey]);
    this.totals = this.categoryData.map(data => aggregateTotal(data));
    this.aggregateDataByMonth();
  },
  methods: {
    aggregateDataByYear() {
      this.aggregateBy = "year";
      const aggregatedTimelines = this.categoryData.map(data =>
        aggregateByYear(data)
      );
      this.updateDataCollection(aggregatedTimelines);
    },
    aggregateDataByMonth() {
      this.aggregateBy = "month";
      const aggregatedTimelines = this.categoryData.map(data =>
        aggregateByMonth(data)
      );
      this.updateDataCollection(aggregatedTimelines);
    },
    aggregateDataByWeek() {
      this.aggregateBy = "week";
    },
    aggregateDataByDay() {
      this.aggregateBy = "day";
      this.updateDataCollection(this.categoryData);
    },
    updateDataCollection(timeLines) {
      if (timeLines.length === 0) return;

      const datasets = [];

      const titles = {
        0: "You"
      };

      const borderColors = {
        0: "#f87979",
        1: "green",
        2: "yellow",
        3: "blue"
      };

      const [labels, myDataset] = this.createDataset(
        `you`,
        "transparent",
        borderColors[0],
        timeLines[0]
      );

      datasets.push(myDataset);

      timeLines.slice(1).forEach((timeLine, i) => {
        const [_, dataset] = this.createDataset(
          "user" + i,
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
  },
  watch: {
    comparisonData() {
      this.updateDataCollection(this.data, this.comparisonData);
      this.aggregateDataByMonth();
    },
    profiles() {
      // const diff = this.profiles.length - this.categoryData.length
      this.categoryData.push(
        this.profiles[this.profiles.length - 1][this.dataKey]
      );
      this.aggregateDataByMonth();
    }
  },

  computed: {
    total() {
      return !this.data.userId
        ? 0
        : Object.entries(this.data[this.dataKey]).reduce(
            (acc, [date, value]) => acc + value,
            0
          );
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
