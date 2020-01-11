<template>
  <article
    class="shadow-lg rounded max-w-md w-full flex items-center flex-wrap p-4"
  >
    <!-- <div class="p-4">
      Avatar
    </div> -->
    <div class="p-4 flex flex-col">
      <h2 class="font-bold text-xl">
        {{ `${user.gender === "M" ? "Male" : "Female"}` }},
        {{ getAgeFromBirthdate(user.birthDate) }}
      </h2>
      <div v-for="job in user.jobs" :key="job.title" class="flex items-center">
        <img
          class="h-6 w-6 pr-2"
          src="~assets/svgs/icons/suitcase.svg"
          alt="job icon"
        />
        <p class="font-thin text-gray-500 text-sm">{{ job.title }}</p>
      </div>
      <div
        v-for="school in user.schools"
        :key="school.name"
        class="flex items-center"
      >
        <img
          class="h-6 w-6 pr-2"
          src="~assets/svgs/icons/graduation-cap.svg"
          alt="university icon"
        />
        <p class="font-thin text-gray-500 text-sm">{{ school.name }}</p>
      </div>
      <div class="flex items-center">
        <img
          class="h-6 w-6 pr-2"
          src="~assets/svgs/icons/v-card.svg"
          alt="id icon"
        />
        <p class="text-xs text-gray-500">{{ profile.userId }}</p>
      </div>
    </div>
  </article>
</template>

<script>
import { getAgeFromBirthdate } from "@/utils/profileUtils";
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    console.log(this.profile);
    return {
      user: {
        schoos: [],
        jobs: [],
        ...this.profile.user
      }
    };
  },
  methods: {
    getAgeFromBirthdate
  }
};
</script>

<style></style>
