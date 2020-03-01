<template>
  <section id="process" class="process bg-white py-24">
    <div class="container mx-auto flex flex-col text-center">
      <h2 class="text-3xl">How does this work?</h2>
      <div class="flex w-full justify-around flex-wrap">
        <article
          v-for="step in steps"
          :key="step.step"
          class="w-full md:w-auto m-8"
        >
          <img
            :src="step.illustration"
            :alt="step.step"
            class="h-64 w-64 mx-auto"
          />
          <div>
            <h3 class="text-xl">{{ step.step }}</h3>
          </div>
        </article>
      </div>
      <div class="flex w-full justify-around flex-wrap">
        <a href="https://github.com/kristianeboe/swipestats.io" target="blank">
          <article
            class="md:w-auto m-8 shadow-lg hover:shadow-xl cursor-pointer rounded p-8"
          >
            <div class="flex flex-col items-center h-64">
              <svg
                class="h-40"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <div class="flex flex-wrap justify-around w-full">
                <svg
                  class="h-12"
                  viewBox="0 0 16 16"
                  version="1.1"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
                  />
                </svg>

                <svg
                  class="h-12"
                  viewBox="0 0 14 16"
                  version="1.1"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-xl pt-4">View the source code on GitHub</h3>
          </article>
        </a>
        <a
          href="/insights?swipestatsid=b98535635fe77db6324d881ac92190e5&demo=true"
          target="blank"
        >
          <article
            class="md:w-auto m-8 shadow-lg hover:shadow-xl cursor-pointer rounded p-8"
          >
            <div>
              <div class="flex flex-wrap justify-around">
                <img
                  class="h-64"
                  src="~assets/images/demoInsights_copy.png"
                  alt="Insights demo"
                />
              </div>
              <h3 class="text-xl pt-4">Live demo</h3>
            </div>
          </article>
        </a>
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
