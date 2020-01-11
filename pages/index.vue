<template>
  <div>
    <section class="landing">
      <div class="container mx-auto min-h-screen flex flex-wrap">
        <div
          class="intro w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 pt-24 md:py-16"
        >
          <h1 class="text-4xl md:text-6xl text-white font-black">
            Visualize your Tinder data
          </h1>
          <p class="text-white text-xl pt-4">
            Upload your data anonymously and compare it to demographics from
            around the world!
          </p>
          <!-- <div class="cta pt-8 mx-auto md:mx-0">
            <button
              class="bg-tinder hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
              @click="loadMe"
            >Test</button>
          </div>-->
        </div>
        <div
          class="upload w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 pt-8 md:pt-24 md:py-16"
        >
          <client-only>
            <form v-if="!swipeStatsData.user" class="upload-form-filepond">
              <FilePond
                ref="pond"
                class="cursor-pointer"
                :instant-upload="false"
                label-idle="Drop your Tinder data file (data.json) here..."
                accepted-file-types="application/json"
                :server="null"
                :files="myFiles"
                @init="handleFilePondInit"
                @addfile="handleFilePondAddFile"
              />
              <p class="text-white">
                The file is NOT uploaded to a server, just used to extract your
                relevant, anonymous profile information.
              </p>
            </form>
          </client-only>
          <div v-if="swipeStatsData.user" class="create-user">
            <TinderProfileCard
              id="profile-card"
              ref="profileCard"
              class="mx-4 profile-card"
              :user-id="swipeStatsData.userId"
              :user-data="swipeStatsData.user"
              :remove-key-from-user-data="removeKeyFromUserData"
            />

            <div class="m-4">
              <button
                class="upload-button bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center pulsate-fwd w-24 h-12"
                :class="{ spinner: uploading }"
                @click="submitSwipeStats"
              >
                <!-- <svg
                  class="fill-current mr-2 w-full h-8"
                  :class="{ hidden: uploading }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  style="transform: rotate(180deg);"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>-->
                <span :class="{ hidden: uploading }">Upload</span>
              </button>
            </div>
          </div>
          <div class="errors">
            <ErrorAlert
              v-for="error in errors"
              :key="error.body"
              :title="error.title"
              :body="error.body"
            />
          </div>
        </div>
      </div>
    </section>
    <Process />
    <HowDoIGetMyData />
  </div>
</template>

<script>
// import * as Sentry from "@sentry/browser";
// import * as Integrations from "@sentry/integrations";
// Sentry.init({
//   dsn: "https://86d0bff07b6b4bcd8013481479aa3b20@sentry.io/1871644",
//   integrations: [new Integrations.Vue({ Vue, attachProps: true })]
// });

import vueFilePond from "vue-filepond";
// import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import TinderProfileCard from "@/components/TinderProfileCard";
import Process from "@/components/Process";
import ErrorAlert from "@/components/ErrorAlert";
import HowDoIGetMyData from "@/components/HowDoIGetMyData";

import extractAnonymizedTinderData from "@/utils/extractAnonymizedTinderData";

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  name: "App",
  components: {
    FilePond,
    ErrorAlert,
    TinderProfileCard,
    Process,
    HowDoIGetMyData
  },
  data: function() {
    return {
      myFiles: [],
      uploadedFiles: [],
      uploading: false,
      myTinderData: null,
      messagessent: {},
      userData: null,
      errors: []
    };
  },
  computed: {
    swipeStatsData() {
      return this.$store.state.swipeStats;
    }
  },
  async mounted() {
    //     this.loadMe();
  },
  methods: {
    handleFilePondAddFile: function(_error, file) {
      this.$ga.event("uploadData", "addFile", "start");
      const reader = new FileReader();
      const onReaderLoad = event => {
        let tinderData = {};
        try {
          tinderData = JSON.parse(event.target.result);
          this.$ga.event("uploadData", "addFile", "success");
        } catch (e) {
          console.log("Add file failed", e);
          this.errors.push({
            title: "File fail!",
            body: "Failed to add json file"
          });
          this.$ga.event("uploadData", "addFile", "fail");
        }
        setTimeout(() => {
          this.$ga.event("uploadData", "parseFile", "start");
          try {
            const swipeStatsData = extractAnonymizedTinderData(tinderData);
            this.$ga.event("uploadData", "parseFile", "success");
            this.setSwipeStatsData(swipeStatsData);
            this.$toast.success("Successfully parsed file").goAway();
          } catch (e) {
            console.log("Parse file failed", e);
            this.errors.push({
              title: "File fail!",
              body: e
            });
            this.$ga.event("uploadData", "parseFile", "fail");
          }
        }, 500);
      };

      reader.onload = onReaderLoad;
      reader.readAsText(file.file);
    },
    handleFilePondInit: function() {
      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleFilePondRemovefile: function(file) {
      var index = this.myFiles.indexOf(file.filename);
      if (index > -1) {
        this.uploadedFiles.splice(index, 1);
        this.$nextTick();
      }
    },
    setSwipeStatsData(swipeStatsData) {
      this.$store.commit("setSwipeStats", swipeStatsData);

      this.$nextTick(() => {
        document.querySelector(".profile-card").scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      });
    },
    async submitSwipeStats() {
      this.uploading = true;
      this.$ga.event("uploadData", "submitSwipeStats", "start");

      const body = JSON.stringify(this.swipeStatsData);

      const res = await fetch("/api/uploadData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (res.ok) {
        this.$ga.event("uploadData", "submitSwipeStats", "success");
        window.localStorage.setItem("swipeStatsId", this.swipeStatsData.userId);
        this.$router.push({
          path: `/insights?swipestatsid=${this.swipeStatsData.userId}`
        });
      } else {
        this.$ga.event("uploadData", "submitSwipeStats", "fail");
        this.errors.push({
          title: "Submission fail!",
          body: "Failed to submit swipestats to server.",
          res: res
        });
        this.$toast.error("Something went wrong with upload").goAway();
      }
    },
    removeKeyFromUserData(key) {
      try {
        this.$store.commit("removeKeyFromSwipeStatsUser", key);
        this.$ga.event("uploadData", "remove", key);
      } catch (e) {
        this.$ga.event("uploadData", "removeKeyFail", key);
        this.errors.push({
          title: "Remove data fail!",
          body: "Failed to remove data from swipestats"
        });
      }
    },
    async loadMe() {
      const res = await fetch("/api/get-kristian");
      if (res.ok) {
        const data = await res.json();

        this.setSwipeStatsData(data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.landing {
  min-height: 100vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  background: center / cover no-repeat fixed url("~assets/svgs/Rose-Petals.svg");
}

.upload-form-filepond {
  width: 100%;
  max-width: 70rem;
  text-align: center;
}

.create-user {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-user--button {
  margin-top: 4rem;
}

.pulsate-fwd {
  -webkit-animation: pulsate-fwd 0.5s ease-in-out infinite both;
  animation: pulsate-fwd 0.5s ease-in-out infinite both;
}
@-webkit-keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #000;
  animation: spinner 0.6s linear infinite;
}
</style>
