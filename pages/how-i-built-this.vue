<template>
  <div>
    <div class="container mx-auto flex pt-40 justify-between flex-wrap">
      <section class="flex flex-col text-center w-full md:w-1/2">
        <h2 class="text-2xl font-bold">How I built this</h2>
        <div>
          <article
            v-for="how in howIBuiltThis"
            :key="how.title"
            class="pt-4 flex flex-col items-center"
          >
            <img :src="how.image" :alt="`${how.title} logo`" class="h-16 " />
            <p>
              {{ how.title }}
            </p>
          </article>
        </div>
      </section>
      <section class="flex flex-col text-center w-full md:w-1/2">
        <h2 class="text-2xl font-bold">Why I built this</h2>
        <div>
          <article
            v-for="why in whyIbuildtThis"
            :key="why.title"
            class="pt-4 flex flex-col items-center"
          >
            <p>
              {{ why.title }}
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      howIBuiltThis: [
        {
          title: "Frontend",
          description: "Nuxt.js",
          image: require("~/assets/logos/nuxt.svg")
        },
        {
          title: "Backend",
          description: "Node & express",
          image: require("~/assets/logos/node-express.png")
        },
        {
          title: "Data layer",
          description: "MongoDB",
          image: require("~/assets/logos/mongodb.svg")
        },
        {
          title: "Server & Deployment",
          description: "Heroku",
          image: require("~/assets/logos/heroku.svg")
        }
      ],
      whyIbuildtThis: [
        {
          title: "Fun",
          description: "",
          image: ""
        },
        {
          title: "Curiosity",
          description: "",
          image: ""
        },
        {
          title: "Learning",
          description: "",
          image: ""
        },
        {
          title: "Profit",
          description: "",
          image: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
