<template>
  <section class="process bg-white py-24 px-8" id="how-do-i-get-my-data">
    <div class="container mx-auto flex flex-col text-center">
      <h2 class="text-3xl">Wait, how do I get my Tinder data?</h2>
      <div class="flex w-full justify-around flex-wrap">
        <article v-for="step in steps" class="w-full md:max-w-xs m-8">
          <img :src="step.illustration" :alt="step.step" class="w-48 mx-auto" />
          <div>
            <p class="text-base max-w-md" v-html="step.step"></p>
          </div>
        </article>
        <article class="w-full md:max-w-xs m-8">
          <!-- Begin Mailchimp Signup Form -->
          <link
            href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
            rel="stylesheet"
            type="text/css"
          />
          <style type="text/css">
            /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
          </style>
          <div>
            <p class="text-base max-w-md">
              Afraid you'll forget about Swipestats?
            </p>
          </div>
          <div id="mc_embed_signup">
            <form
              action="https://swipestats.us13.list-manage.com/subscribe/post?u=2f100a8bbcda9a834b7ab997b&amp;id=90dddf015e"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <div class="mc-field-group">
                  <label for="mce-EMAIL">Email Address </label>
                  <input
                    type="email"
                    value=""
                    name="EMAIL"
                    class="required email"
                    id="mce-EMAIL"
                  />
                </div>
                <div id="mce-responses" class="clear">
                  <div
                    class="response"
                    id="mce-error-response"
                    style="display:none"
                  ></div>
                  <div
                    class="response"
                    id="mce-success-response"
                    style="display:none"
                  ></div>
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div
                  style="position: absolute; left: -5000px;"
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_2f100a8bbcda9a834b7ab997b_90dddf015e"
                    tabindex="-1"
                    value=""
                  />
                </div>

                <div class="clear">
                  <p class="text-xs font-black py-2">
                    This email will not be affiliated with your Tinder data in
                    any way
                  </p>
                  <input
                    type="submit"
                    value="Give me a reminder in 3 days"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="button"
                  />
                </div>
              </div>
            </form>
          </div>

          <!--End mc_embed_signup-->
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
            '<a target="blank" href="https://account.gotinder.com/request-data" >Go to this <span class="text-blue-500">link</span> and log in</a> ',
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

<style></style>
