<template>
  <section class="shadow-lg rounded px-6 py-4 max-w-5xl">
    <h2 class="text-2xl font-bold">Conversations</h2>
    <div class="flex flex-wrap mx-auto w-full justify-center">
      <Statistic
        v-for="meta in Object.keys(metaTitles)"
        :name="metaTitles[meta]"
        :statistics="
          conversationsMetaArray.map(
            conversationsMeta => conversationsMeta[meta]
          )
        "
        :key="meta"
        class="shadow-md m-4 rounded w-48 text-center"
      />
    </div>
  </section>
</template>

<script>
import Statistic from "@/components/Statistic";

export default {
  components: {
    Statistic
  },
  data() {
    return {
      metaTitles: {
        nrOfConversations: "Nr of conversations with matches",
        longestConversation: "Most messages sent to a match",
        longestConversationInDays: "Longest amount of days spoken to a match", //days
        averageConversationLength: "Average messages sent",
        averageConversationLengthInDays: "Average days pr conversation", //days
        medianConversationLength: "Median messages sent pr conversation",
        medianConversationLengthInDays: "Median days pr conversation", // days
        nrOfOneMessageConversations: "Nr of initiated 1-message conversations",
        percentOfOneMessageConversations: "% of 1-message conversations",
        nrOfGhostingsAfterInitialMessage:
          "Nr of ghostings after initial message"
      }
    };
  },
  props: {
    profiles: {
      type: Array,
      default: () => []
    },
    conversationsMeta: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    conversationsMetaArray() {
      return this.profiles.map(profile => profile.conversationsMeta);
    }
  }
};
</script>

<style></style>
