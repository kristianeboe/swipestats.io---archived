<template>
  <div class="flex w-full flex-wrap justify-center">
    <InsightsSegment
      class="m-4"
      title="Messages sent"
      data-key="sent"
      :data="messages.messagesByMonth"
    />
    <InsightsSegment
      class="m-4"
      title="Messages recieved"
      data-key="received"
      :data="messages.messagesByMonth"
    />
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