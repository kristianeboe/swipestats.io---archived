<template>
  <div class="pt-24 container mx-auto">
    <h1 class="text-center text-6xl font-black">Insights</h1>
    <h3>Compare yourself with</h3>
    <input type="text" v-model="compareId" />
    <button @click="setComparisonData(compareId)">Compare yourself</button>
    <div>Matches</div>
    <div>Messages</div>
    <div>Total conversations</div>
    <Matches :matches="mySwipeStatsData.matches" :comparisonData="comparisonData" />
    <Matches :matches="mySwipeStatsData.matchesByMonth" :comparisonData="comparisonData" />
  </div>
</template>

<script>
import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";
import Matches from "@/components/Matches";
import { mapMutations } from "vuex";

export default {
  components: {
    TimeLineChart,
    Statistic,
    Matches
  },
  data() {
    return {
      compareId: "",
      comparisonData: {},
      mySwipeStatsData: {}
    };
  },
  computed: {},
  methods: {
    async getProfileData(profileId) {
      const res = await fetch(`/api/profileData/${profileId}`);
      if (res.ok) {
        console.log("res ok");
        const data = await res.json();

        console.log("api data", data);
        return data;
      }
    },
    async setComparisonData(profileId) {
      const cData = await this.getProfileData(profileId);
      this.comparisonData = cData;
    }
  },
  async asyncData() {},
  async mounted() {
    if (!this.mySwipeStatsData.userId) {
      this.mySwipeStatsData = await this.getProfileData(
        "b98535635fe77db6324d881ac92190e5"
      );
    } else {
      this.mySwipeStatsData = this.$store.state.swipeStats;
    }
  }
};
</script>

<style>
</style>