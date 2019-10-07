<template>
  <div class="card">
    <span>This will be your unique id, don't lose it:</span>
    <h2>{{userId}}</h2>

    <img class="avatar" src="~/assets/svgs/undraw_superhero_kguv.svg" alt="avatar" />

    <div>Age filter min-max: {{userData.age_filter_min}}-{{userData.age_filter_max}}</div>
    <div>
      <h4>{{userData.city.name}}</h4>
      <h5>{{userData.city.region}}</h5>
    </div>
    <div>Created: {{userData.create_date}}</div>
    <div>Education: {{userData.education}}</div>
    <div>Gender: {{userData.gender}}</div>
    <div>Looking for {{userData.interested_in}}, gender filter {{userData.gender_filter}}</div>
    <div>Instagram: {{!!userData.instagram.username}}</div>
    <div>Spotify: todo</div>
    <section>
      <h2>Jobs data</h2>
      <div>Show company: {{userData.jobs[0].company.displayed}}</div>
      <div>Title: {{userData.jobs[0].title.name}}</div>
    </section>
    <section>
      <h2>School data</h2>
      <div>Education: {{userData.education}}</div>
      <div>Show school: {{userData.schools[0].displayed}}</div>
      <div>School: {{userData.schools[0].name}}</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
    userData: Object
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