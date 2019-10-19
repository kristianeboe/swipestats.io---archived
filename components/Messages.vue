<template>
  <div class="flex w-full flex-wrap">
    <InsightsSegment class="m-4" title="Messages sent" :data="messages.sent" />
    <InsightsSegment class="m-4" title="Messages recieved" :data="messages.received" />
  </div>
</template>

<script>
import InsightsSegment from "@/components/InsightsSegment";
export default {
  components: {
    InsightsSegment
  },
  props: {
    messages: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
</style>