<template>
  <div>
    <h1>Insights</h1>
    <div>Matches</div>
    <div>Messages</div>
    <div>Total conversations</div>
    <Matches :matches="mySwipeStatsData.matches" />
  </div>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";
import Matches from "@/components/Matches";

export default {
  components: {
    TimeLineChart,
    Statistic,
    Matches
  },
  data() {
    return {};
  },
  computed: {},
  async asyncData() {
    try {
      const res = await fetch("http://localhost:3000/api/get-kristian");
      if (res.ok) {
        const data = await res.json();
        return {
          mySwipeStatsData: data
        };
      } else {
        throw res;
      }
    } catch (error) {
      console.log(error);
      return {
        mySwipeStatsData: {}
      };
    }
  }
};
</script>

<style>
</style>