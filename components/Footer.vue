<template>
  <section class="w-full bg-blue-500">
    <div class="container mx-auto">
      <!-- <h2>Master plan</h2>
      <div class="flex text-white flex-wrap">
        <p class="p-2 w-64" v-for="step in masterPlan">
          {{ step.step }}
        </p>
      </div> -->
      <div class="py-4">
        <h1 class="text-xl font-bold text-white pl-8">
          Made with 🔥 in Norway
        </h1>
        <h2 class="text-base text-white pl-8">By Kristian Elset Bø</h2>
        <h2 class="text-sm font-thin text-white pl-8">
          Full stack developer / Product Manager @ boe.ventures
        </h2>
        <SocialIcons />
      </div>
    </div>
  </section>
</template>

<script>
import SocialIcons from "./SocialIcons";
export default {
  name: "Footer",
  components: {
    SocialIcons
  },
  data() {
    return {
      masterPlan: [
        {
          step:
            "1. Individuals use swipestats.io to visualize their Tinder data for fun"
        },
        {
          step:
            "2. Friends and groups can engage in friendly competition and bets among each other, causing the userbase / dataset to increase"
        },
        {
          step:
            "3. With sufficient users, entire demographics can be constructed and compared with"
        },
        {
          step:
            "4. Long term, the goal is to provide anonymized datasets to research inistitutions"
        }
      ]
    };
  },
  head() {
    return {
      script: [
        {
          hid: "bmc",
          "data-name": "BMC-Widget",
          src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
          "data-id": "CXVUmPd",
          "data-description": "Support Swipestats.io",
          "data-message": "Help democratize dating data",
          "data-color": "#FE3C72",
          "data-position": "right",
          "data-x_margin": "18",
          "data-y_margin": "18",
          defer: true,
          ssr: false,
          async: true,
          callback() {
            console.log("bmc loaded");
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
