<template>
  <InsightsSegment
    title="App opens"
    data-key="appOpens"
    :data="appOpens"
    :comparisonData="appOpensComparisonData"
  />
</template>

<script>
import InsightsSegment from "@/components/InsightsSegment";
export default {
  components: {
    InsightsSegment
  },
  props: {
    myProfile: Object,
    comparisonData: Array
  },
  computed: {
    appOpens() {
      return this.myProfile.appOpens;
    },
    appOpensComparisonData() {
      return this.comparisonData.map(profile => profile.appOpens);
    }
  }
};
</script>

<style>
</style>