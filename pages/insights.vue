<template>
  <div class="pt-24 container mx-auto">
    <h1 class="text-center text-6xl font-black">Insights</h1>
    <div class="md:flex md:items-center m-6">
      <div class="md:w-1/3 pt-2">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mr-4"
          for="inline-full-name"
          >Compare yourself with another Id</label
        >
      </div>
      <div class="md:w-1/3 pt-2">
        <input
          id="inline-full-name"
          v-model="compareId"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tinder"
          type="text"
        />
      </div>
      <div class="md:w-1/3 pt-2">
        <button
          class="shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
          type="button"
          @click="getComparisonData(compareId)"
        >
          Compare
        </button>
      </div>
    </div>
    <div class="md:flex md:items-center mx-6 justify-center">
      <label
        class="block text-gray-500 font-bold md:text-right mb-1 mt-2 md:mb-0"
        for="inline-full-name"
        >or a specific Demographic</label
      >
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          getComparisonData('b98535635fe77db6324d881ac92190e5') &&
            trackDemographics('creator')
        "
      >
        Creator
      </button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="getRandomComparison() && trackDemographics('random')"
      >
        Random
      </button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Global average') &&
            trackDemographics('global-average')
        "
      >
        Global average
      </button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Men demographic') && trackDemographics('men')
        "
      >
        Men
      </button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Women demographic') && trackDemographics('women')
        "
      >
        Women
      </button>
      <button
        class="mt-2 shadow bg-tinder hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded md:ml-4"
        type="button"
        @click="
          showNotImplemented('Country demographic') &&
            trackDemographics('country')
        "
      >
        Country
      </button>
    </div>
    <section
      v-if="profiles.length > 0"
      class="insights flex flex-wrap justify-center px-4"
    >
      <InsightsSegment
        class="m-4"
        title="Matches"
        data-key="matches"
        :profiles="profiles"
      />
      <InsightsSegment
        class="m-4"
        title="App opens"
        data-key="appOpens"
        :profiles="profiles"
      />
      <Conversations :profiles="profiles" />
      <!-- <TinderProfileCard
        v-for="profile in profiles"
        id="profile-card"
        :key="profile.userId"
        ref="profileCard"
        class="mx-4 profile-card"
        :user-id="profile.userId"
        :user-data="profile.user"
        :remove-key-from-user-data="() => {}"
        read-only
      /> -->
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
      <InsightsSegment
        class="m-4"
        title="Swipe likes"
        data-key="swipeLikes"
        :profiles="profiles"
      />
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
import Conversations from "@/components/Conversations";
import InsightsSegment from "@/components/InsightsSegment";
// import TinderProfileCard from "@/components/TinderProfileCard";

export default {
  components: {
    Conversations,
    InsightsSegment
    //TinderProfileCard
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
  },
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
    trimProfileData(profile) {
      if (this.profiles.length === 0) return profile;

      const userProfile = this.profiles[0];

      const userProfileStartDate = Object.keys(userProfile.matches)[0];

      console.log("matches length", Object.keys(profile.matches).length);

      const trimmedMatches = Object.entries(profile.matches)
        .filter(([k]) => k > userProfileStartDate)
        .reduce((acc, [k, v]) => {
          return {
            ...acc,
            [k]: v
          };
        }, {});

      return {
        ...profile,
        matches: trimmedMatches
      };
    },
    async getComparisonData(profileId) {
      const profileData = await this.getProfileData(profileId);
      // this.comparisonData.push(profile);

      const profile = this.trimProfileData(profileData);
      this.profiles.push(profile);
      this.compareId = "";
      return {};
    },
    async getRandomComparison() {
      const res = await fetch(`/api/get-all`);
      if (res.ok) {
        const data = await res.json();

        const profileId = data[Math.floor(Math.random() * data.length)];

        return this.getComparisonData(profileId);
      } else {
        return {};
      }
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
  }
};
</script>

<style></style>
