<template>
  <section class="process bg-white py-24">
    <div class="container mx-auto flex flex-col text-center">
      <h2 class="text-3xl">Process</h2>
      <div class="flex w-full justify-around flex-wrap">
        <article v-for="step in steps">
          <img :src="step.illustration" :alt="step.step" class="w-48 h-48" />
          <div>
            <h3 class="text-xl">{{step.step}}</h3>
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
        { step: "Parse file", illustration: Step1 },
        { step: "Submit data", illustration: Step2 },
        { step: "Compare", illustration: Step3 }
      ]
    };
  }
};
</script>

<style>
</style>