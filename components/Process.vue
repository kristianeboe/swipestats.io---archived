<template>
  <section class="process bg-white py-24" id="process">
    <div class="container mx-auto flex flex-col text-center">
      <h2 class="text-3xl">How does this work?</h2>
      <div class="flex w-full justify-around flex-wrap">
        <article v-for="step in steps" class="w-full md:w-auto m-8">
          <img
            :src="step.illustration"
            :alt="step.step"
            class="w-48 h-48 mx-auto"
          />
          <div>
            <h3 class="text-xl">{{ step.step }}</h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import Step1 from "@/assets/svgs/undraw/process/undraw_file_searching.svg";
import Step2 from "@/assets/svgs/undraw/process/undraw_going_up.svg";
import Step3 from "@/assets/svgs/undraw/process/undraw_growth_analytics.svg";

export default {
  data() {
    return {
      steps: [
        { step: "Parse the tinder data file", illustration: Step1 },
        { step: "Submit your anonymized data", illustration: Step2 },
        { step: "Compare with others", illustration: Step3 }
      ]
    };
  }
};
</script>

<style></style>
