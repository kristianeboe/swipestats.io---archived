<template>
  <div
    class="max-w-xs md:max-w-md rounded overflow-hidden shadow-lg bg-white hover:shadow-xl"
  >
    <div class="w-full flex justify-center">
      <img class="w-48 p-4" :src="imgSrc" alt="Sunset in the mountains" />
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl">
        {{ `${userData.gender === "M" ? "Male" : "Female"}` }},
        {{ getAge(userData.birthDate) }}
      </div>
      <p class="text-gray-700 text-base">
        {{ userData.cityName }}, {{ userData.country }}
      </p>
      <div>
        Looking for {{ userData.interestedIn === "F" ? "women" : "men" }} ages
        {{ userData.ageFilterMin }}-{{ userData.ageFilterMax }}
      </div>
      <div>Education: {{ userData.educationLevel }}</div>

      <div>gender filter {{ userData.genderFilter }}</div>
      <div>
        Account created:
        {{ (() => new Date(userData.createDate))().toDateString() }}
      </div>

      <br />
      <p class="text-gray-700 text-base">
        This will be your unique id, don't lose it:
      </p>
      <h2 class="text-xl font-bold" style="overflow-wrap: break-word;">
        {{ userId }}
      </h2>

      <section class="mt-4" v-if="userData.jobs.length > 0">
        <h2 class="font-bold">Jobs data</h2>
        <div v-for="job in userData.jobs" :key="job.title">
          <button
            type="button"
            class="float-right bg-gray-500 rounded p-2"
            @click="removeKeyFromUserData('jobs')"
          >
            Don't share
          </button>
          <div>Title: {{ job.title }}</div>
          <div>Show title: {{ job.titleDisplayed }}</div>
          <div>Show company: {{ job.companyDisplayed }}</div>
        </div>
      </section>
      <section class="mt-4" v-if="userData.schools.length > 0">
        <h2 class="font-bold">School data</h2>
        <div v-for="school in userData.schools" :key="school.name">
          <button
            type="button"
            class="float-right bg-gray-500 rounded p-2"
            @click="removeKeyFromUserData('schools')"
          >
            Don't share
          </button>
          <div>School: {{ school.name }}</div>
          <div>Show school: {{ school.displayed }}</div>
        </div>
      </section>
    </div>
    <div class="px-6 py-4">
      <span
        v-if="userData.instagram"
        class="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >#instagram</span
      >
      <span
        v-if="userData.spotify"
        class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >#spotify</span
      >
    </div>
  </div>
</template>

<script>
import male_avatar from "@/assets/svgs/undraw/male_avatar.svg";
import female_avatar from "@/assets/svgs/undraw/female_avatar.svg";

export default {
  props: {
    userId: String,
    userData: Object,
    removeKeyFromUserData: Function
  },
  computed: {
    imgSrc() {
      return this.userData.gender === "M" ? male_avatar : female_avatar;
    }
  },
  methods: {
    getAge(birthDateString) {
      const birthDate = new Date(birthDateString);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
};
</script>

<style></style>
