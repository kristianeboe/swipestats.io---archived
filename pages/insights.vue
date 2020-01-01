<template>
  <div class="pt-24 container mx-auto">
    <h1 class="text-center text-6xl font-black">Insights</h1>
    <div class="md:flex md:items-center m-6">
      <div class="md:w-1/3 pt-2">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mr-4"
          for="inline-full-name"
        >Compare yourself with another Id</label>
      </div>
      <div class="md:w-1/3 pt-2">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tinder"
          id="inline-full-name"
          type="text"
          v-model="compareId"
        />
      </div>
      <div class="md:w-1/3 pt-2">
        <button
          class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
          type="button"
          @click="getComparisonData(compareId)"
        >Compare</button>
      </div>
    </div>
    <div class="md:flex md:items-center mx-6 justify-center">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 mt-2 md:mb-0"
        for="inline-full-name"
      >or a specific Demographic</label>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          getComparisonData('b98535635fe77db6324d881ac92190e5') &&
            trackDemographics('creator')
        "
      >Creator</button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Global average') &&
            trackDemographics('global-average')
        "
      >Global average</button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Men demographic') && trackDemographics('men')
        "
      >Men</button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Women demographic') && trackDemographics('women')
        "
      >Women</button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Country demographic') &&
            trackDemographics('country')
        "
      >Country</button>
    </div>
    <section v-if="profiles.length > 0" class="insights flex flex-wrap justify-center px-4">
      <InsightsSegment class="m-4" title="Matches" data-key="matches" :profiles="profiles" />
      <InsightsSegment class="m-4" title="App opens" data-key="appOpens" :profiles="profiles" />
      <Conversations :profiles="profiles" />
      <InsightsSegment
        class="m-4"
        title="Messages sent"
        data-key="messagesSent"
        :profiles="profiles"
      />
      <InsightsSegment
        class="m-4"
        title="Messages received"
        data-key="messagesReceived"
        :profiles="profiles"
      />
      <InsightsSegment class="m-4" title="Swipe likes" data-key="swipeLikes" :profiles="profiles" />
      <InsightsSegment
        class="m-4"
        title="Swipe passes"
        data-key="swipePasses"
        :profiles="profiles"
      />
    </section>
  </div>
</template>

<script>
import ky from "ky-universal";
import Matches from "@/components/Matches";
import AppOpens from "@/components/AppOpens";
import Conversations from "@/components/Conversations";
import Messages from "@/components/Messages";
import InsightsSegment from "@/components/InsightsSegment";

import { mapMutations } from "vuex";

export default {
  components: {
    Matches,
    AppOpens,
    Conversations,
    Messages,
    InsightsSegment
    // swipes
  },
  data() {
    return {
      compareId: "",
      comparisonData: [],
      messagesSent: [],
      mySwipeStatsData: {},
      profiles: []
    };
  },
  computed: {},
  methods: {
    async getProfileData(profileId) {
      const res = await fetch(`/api/profileData/${profileId}`);
      if (res.ok) {
        const data = await res.json();

        return data;
      } else {
        return {};
      }
    },

    async getComparisonData(profileId) {
      const profile = await this.getProfileData(profileId);
      this.comparisonData.push(profile);
      this.profiles.push(profile);
      this.compareId = "";
    },
    trackComparisons() {
      this.$ga.event("insights", "comparePerson", this.comparisonData.length);
    },
    trackDemographics(demographic) {
      this.$ga.event("insights", "demographics", demographic);
    },
    showNotImplemented(feature) {
      this.$toast.info(feature + " not implemented yet").goAway(2000);
    }
  },
  async mounted() {
    try {
      const { swipestatsid } = this.$router.history.current.query;
      const profile = await this.getProfileData(swipestatsid);
      // this.$store.commit("setSwipeStats", profile);
      this.profiles.push(profile);
      return;
    } catch (error) {
      console.log("failed fetching from query", error);
    }

    const swipeStatsLocalId = window.localStorage.getItem("swipeStatsId");

    if (swipeStatsLocalId) {
      const myProfile = await this.getProfileData(swipeStatsLocalId);
      this.mySwipeStatsData = myProfile;
      this.profiles.push(myProfile);
    }
  }
};
</script>

<style></style>
