<template>
  <section class="process bg-white py-24 px-8">
    <div class="container mx-auto flex flex-col text-center">
      <h2 class="text-3xl">Wait, how do I get my Tinder data?</h2>
      <div class="flex w-full justify-around flex-wrap">
        <article v-for="step in steps" class="w-full md:w-auto m-8">
          <img :src="step.illustration" :alt="step.step" class="w-48 mx-auto" />
          <div>
            <p class="text-base max-w-md">{{step.step}}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import Step1 from "@/assets/images/tinderLogin.png";
import Step2 from "@/assets/images/tinderEmail.png";
import Step3 from "@/assets/images/tinderDone.png";

export default {
  data() {
    return {
      steps: [
        {
          step:
            'Go to <a href="https://account.gotinder.com/request-data" >https://account.gotinder.com/request-data</a> and log in',
          illustration: Step1
        },
        { step: "Enter your email address and confirm", illustration: Step2 },
        {
          step:
            "Done! Wait three days for tinder to send your data and come back here.",
          illustration: Step3
        }
      ]
    };
  }
};
</script>

<style>
</style>