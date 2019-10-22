<template>
  <div class="pt-24 container mx-auto">
    <h1 class="text-center text-6xl font-black">Insights</h1>
    <div class="md:flex md:items-center m-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mr-4"
          for="inline-full-name"
        >Compare yourself with</label>
      </div>
      <div class="md:w-1/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tinder"
          id="inline-full-name"
          type="text"
          v-model="compareId"
        />
      </div>
      <div class="md:w-1/3">
        <button
          class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
          type="button"
          @click="getComparisonData(compareId)"
        >Compare</button>
      </div>
    </div>
    <div class="md:flex md:items-center m-6 justify-center">
      <button
        class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="getComparisonData(cloneId)"
      >Clone</button>
      <button
        class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="getComparisonData(compareId)"
      >Boys</button>
      <button
        class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="getComparisonData(compareId)"
      >Girl</button>
    </div>
    <section v-if="mySwipeStatsData.userId" class="insights flex flex-wrap justify-center">
      <AppOpens class="m-4" :myProfile="mySwipeStatsData" :comparisonData="comparisonData" />
      <!-- <Matches
        class="m-4"
        :matches="mySwipeStatsData.matchesByMonth"
        :comparisonData="comparisonData"
      />
      <Conversations :conversationsMeta="mySwipeStatsData.conversationsMeta" />
      
      <Messages :messages="mySwipeStatsData" />
      -->
    </section>
    <script
      data-name="BMC-Widget"
      src="https://cdn.buymeacoffee.com/widget/1.0.0/prod/widget.prod.min.js"
      data-id="CXVUmPd"
      data-description="Help democratize data!"
      data-message="Thank you for visiting. You can now buy me a coffee!"
      data-color="#5F7FFF"
      data-position="right"
      data-x_margin="18"
      data-y_margin="18"
    ></script>
  </div>
</template>

<script>
import Matches from "@/components/Matches";
import AppOpens from "@/components/AppOpens";
import Conversations from "@/components/Conversations";
import Messages from "@/components/Messages";

import { mapMutations } from "vuex";

export default {
  components: {
    Matches,
    AppOpens,
    Conversations,
    Messages
    // swipes
  },
  data() {
    return {
      compareId: "",
      cloneId: "336eb591eef99bf7ee13efc27fd387b4",
      comparisonData: [],
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
      } else {
        return {};
      }
    },

    async getComparisonData(profileId) {
      console.log("getting comparison data from", profileId);
      const profile = await this.getProfileData(profileId);
      this.comparisonData.push(profile);
    }
  },
  async mounted() {
    const swipeStatsId = window.localStorage.getItem("swipeStatsId");

    if (swipeStatsId) {
      const myProfile = await this.getProfileData(swipeStatsId);
      this.mySwipeStatsData = myProfile;
    }
  }
};
</script>

<style>
</style>