<template>
  <section class="segment shadow-lg rounded px-6 py-4 relative" :class="{'w-4/5': fullWidth}">
    <div class="flex w-full justify-start">
      <h2 class="text-2xl font-bold">{{title}}</h2>
    </div>
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded absolute items-center right-0 top-0 m-4"
      @click="fullWidth = !fullWidth"
    >
      <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4">
        <path
          d="M2.8 15.8L0 13v7h7l-2.8-2.8 4.34-4.32-1.42-1.42L2.8 15.8zM17.2 4.2L20 7V0h-7l2.8 2.8-4.34 4.32 1.42 1.42L17.2 4.2zm-1.4 13L13 20h7v-7l-2.8 2.8-4.32-4.34-1.42 1.42 4.33 4.33zM4.2 2.8L7 0H0v7l2.8-2.8 4.32 4.34 1.42-1.42L4.2 2.8z"
        />
      </svg>-->

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
      <Statistic :name="title" :statistic="myTotal" :comparisonStatistics="comparisonTotals" />
    </div>
    <div class="chart-container" style="position: relative; height:auto; width:100%">
      <TimeLineChart :chart-data="localDataCollection" />
    </div>
    <div class="inline-flex">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        @click="aggregateDataByYear"
      >Year</button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
        @click="aggregateDataByMonth"
      >Month</button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
        @click="aggregateDataByWeek"
      >Week</button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        @click="aggregateDataByDay"
      >Day</button>
    </div>
  </section>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";

import { aggregateByYear, aggregateByMonth } from "@/utils/timeLineUtils";

export default {
  props: {
    title: String,
    dataKey: String,
    data: Object,
    comparisonData: Array
  },
  data() {
    return {
      fullWidth: false,
      localData: {},
      myTotal: 0,
      comparisonTotals: [],
      localComparisonData: [],
      totalComparisonData: [],
      localDataCollection: {}
    };
  },
  mounted() {
    this.aggregateDataByMonth();
  },
  methods: {
    aggregateDataByYear() {
      this.localData = aggregateByYear(this.data);
      this.localComparisonData = this.comparisonData.map(data =>
        aggregateByYear(data)
      );
      this.updateLocalDataCollection(this.localData, this.localComparisonData);
    },
    aggregateDataByMonth() {
      this.localData = aggregateByMonth(this.data);
      this.localComparisonData = this.comparisonData.map(data =>
        aggregateByMonth(data)
      );
      this.updateLocalDataCollection(this.localData, this.localComparisonData);
    },
    aggregateDataByWeek() {},
    aggregateDataByDay() {
      this.updateLocalDataCollection(this.data, this.comparisonData);
    },
    updateLocalDataCollection(myTimeLine, comparisonData = []) {
      const labels = [];
      const data = [];
      this.comparisonTotals = [];

      let myTotal = 0;

      Object.entries(myTimeLine).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
        myTotal += value;
      });

      this.myTotal = myTotal;

      const datasets = [
        {
          label: `${this.title}`,
          backgroundColor: "transparent", //"#f87979",
          borderColor: "#f87979",
          data
        }
      ];

      const borderColors = {
        0: "blue",
        1: "green",
        2: "yellow"
      };

      if (comparisonData) {
        comparisonData.forEach((timeLine, i) => {
          const dataset = this.createDataset(
            i,
            "transparent",
            borderColors[i],
            timeLine
          );
          datasets.push(dataset);
        });
      }

      this.localDataCollection = {
        labels,
        datasets
      };
    },
    createDataset(title, backgroundColor, borderColor, timeLine) {
      const labels = [];
      const data = [];

      let total = 0;

      Object.entries(timeLine).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
        total += value;
      });

      this.comparisonTotals.push(total);
      const dataset = {
        label: `Your ${title}`,
        backgroundColor, // "transparent", //"#f87979",
        borderColor, // "#f87979",
        data
      };

      return dataset;
    }
  },
  watch: {
    comparisonData() {
      // const datasets = [];
      // console.log("watching comparisonData", timeLines);
      // timeLines.forEach(timeLine => {
      //   console.log("creating dataset");
      //   const dataset = this.createDataset(
      //     "lol",
      //     "transparent",
      //     "blue",
      //     timeLine
      //   );

      //   console.log("pushing dataset", dataset);
      //   datasets.push(dataset);
      // });

      // const myData = this.createDataset(
      //   "Me",
      //   "transparent",
      //   "#f87979",
      //   this.localData
      // );
      // this.localDataCollection = {
      //   labels: this.localDataCollection.labels,
      //   datasets: [myData, ...datasets]
      // };

      this.updateLocalDataCollection(this.data, this.comparisonData);
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
    },
    datacollection1() {
      if (!this.data.userId) {
        return {};
      }

      // console.log("key", this.dataKey);
      // if (this.dataKey) {
      //   this.data = this.data[this.dataKey];
      //   console.log("key data", this.data);
      //   this.comparisonData = this.comparisonData.map(
      //     profile => profile[this.dataKey]
      //   );
      // }

      console.log(this.data);
      console.log(this.dataKey);

      const objectData = this.data[this.dataKey];
      console.log(objectData);
      const objectComparisonData = this.comparisonData.map(
        profile => profile[this.dataKey]
      );

      const labels = [];
      const data = [];

      Object.entries(objectData).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
      });

      const datasets = [
        {
          label: `Your ${this.title}`,
          backgroundColor: "transparent", //"#f87979",
          borderColor: "#f87979",
          data
        }
      ];

      const borderColors = {
        1: "blue",
        2: "green",
        3: "yellow"
      };

      if (this.comparisonData) {
        objectComparisonData.forEach((p, index) => {
          const comparisonData = [];

          Object.entries(p).map(([date, value]) => {
            labels.push(date);
            comparisonData.push({ x: date, y: value });
          });

          datasets.push({
            label: index,
            backgroundColor: "transparent",
            borderColor: borderColors[index],
            comparisonData
          });
        });
      }

      return {
        labels,
        datasets
      };
    },
    datacollection() {
      const labels = [];
      const data = [];

      Object.entries(this.data).map(([date, value]) => {
        labels.push(date);
        data.push({ x: date, y: value });
      });

      const datasets = [
        {
          label: `${this.title}`,
          backgroundColor: "transparent", //"#f87979",
          borderColor: "#f87979",
          data
        }
      ];

      const borderColors = {
        0: "blue",
        1: "green",
        2: "yellow"
      };

      if (this.comparisonData) {
        this.comparisonData.forEach((timeLine, i) => {
          const dataset = this.createDataset(
            i,
            "transparent",
            borderColors[i],
            timeLine
          );
          datasets.push(dataset);
        });
      }

      return {
        labels,
        datasets
      };
    }

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