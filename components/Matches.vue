<template>
  <InsightsSegment
    title="Matches"
    :data="matches"
    :comparison-data="matchesComparisonData"
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
    matches() {
      return this.myProfile.matches;
    },
    matchesComparisonData() {
      return this.comparisonData.map(profile => profile.matches);
    }
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
