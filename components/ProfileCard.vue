<template>
  <div class="card bg-white">
    <span>This will be your unique id, don't lose it:</span>
    <h2>{{userId}}</h2>

    <img class="avatar" :src="imgSrc" alt="avatar" />
    <div>Age: {{getAge(userData.birthDate)}}</div>
    <div>Age filter min-max: {{userData.ageFilterMin}}-{{userData.ageFilterMax}}</div>
    <div>
      <h4>{{userData.cityName}}</h4>
      <h5>{{userData.country}}</h5>
    </div>
    <div>Created: {{userData.create_date}}</div>
    <div>Education: {{userData.education}}</div>
    <div>Gender: {{userData.gender}}</div>
    <div>Looking for {{userData.interestedIn}}, gender filter {{userData.genderFilter}}</div>
    <div>Instagram: {{!!userData.instagram}}</div>
    <div>Spotify: todo</div>
    <section>
      <h2>Jobs data</h2>
      <div>Show company: {{userData.jobDisplayed}}</div>
      <div>Title: {{userData.jobTitle}}</div>
    </section>
    <section>
      <h2>School data</h2>
      <div>Education: {{userData.educationLevel}}</div>
      <div>Show school: {{userData.schoolDisplayed}}</div>
      <div>School: {{userData.schoolName}}</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
    userData: Object,
    imgSrc: String
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

<style scoped lang="scss" >
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 2rem 4rem;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.avatar {
  width: 10rem;
}
</style> >

</style>