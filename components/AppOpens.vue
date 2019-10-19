<template>
  <InsightsSegment title="App opens" :data="appOpens" />
</template>

<script>
import InsightsSegment from "@/components/InsightsSegment";
export default {
  components: {
    InsightsSegment
  },
  props: {
    appOpens: Object
  }
};
</script>

<style>
</style>