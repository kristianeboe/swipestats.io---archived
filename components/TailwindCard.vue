<template>
  <div class="max-w-md rounded overflow-hidden shadow-lg bg-white hover:shadow-xl">
    <div class="w-full flex justify-center">
      <img class="w-48 p-4" :src="imgSrc" alt="Sunset in the mountains" />
    </div>
    <div class="px-6 py-4">
      <div
        class="font-bold text-xl"
      >{{`${userData.gender === 'M' ? 'Male' : 'Female'}`}}, {{getAge(userData.birthDate)}}</div>
      <p class="text-gray-700 text-base">{{userData.cityName}}, {{userData.country}}</p>
      <div>Looking for {{userData.interestedIn === 'F' ? "women" : "men"}} ages {{userData.ageFilterMin}}-{{userData.ageFilterMax}}</div>
      <div>Education: {{userData.educationLevel}}</div>

      <div>gender filter {{userData.genderFilter}}</div>
      <p class="text-gray-700 text-base">This will be your unique id, don't lose it:</p>
      <h2>{{userId}}</h2>

      <div>Created: {{(() => new Date(userData.createDate))().toDateString()}}</div>
      <section class="mt-4">
        <h2 class="font-bold">Jobs data</h2>
        <button type="button" class="float-right">Don't share</button>
        <div>Show company: {{userData.jobDisplayed}}</div>
        <div>Title: {{userData.jobTitle}}</div>
      </section>
      <section class="mt-4">
        <h2 class="font-bold">School data</h2>
        <button type="button" class="float-right">Don't share</button>
        <div>Show school: {{userData.schoolDisplayed}}</div>
        <div>School: {{userData.schoolName}}</div>
      </section>
    </div>
    <div class="px-6 py-4">
      <span
        v-if="!!userData.instagram"
        class="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >#instagram</span>
      <span
        v-if="!userData.spotify"
        class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
      >#spotify</span>
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
      >#winter</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
    imgSrc: String,
    userData: Object
  },
  methods: {
    getAge(birthDateString) {
      birthDateString = "1992-11-01T00:00:00.000Z";
      const birthDate = new Date(birthDateString);

      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
};
</script>

<style>
</style>