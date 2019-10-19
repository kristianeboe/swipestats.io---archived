<template>
  <div>
    <section class="landing">
      <div class="container mx-auto min-h-screen flex flex-wrap">
        <div class="intro w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-24">
          <h1 class="text-6xl text-white font-black">How do you stack up?</h1>
          <p
            class="text-white"
          >Upload your data anonymusly and compare it to demographics from around the world.</p>
          <p
            class="text-white"
          >Privacy? This service is built with privacy first in mind, check out the code on Github if you want</p>
          <p class="text-white">How do I get my Tinder data?</p>
          <div class="cta pt-8 mx-auto md:mx-0">
            <button
              class="bg-tinder hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
              @click="loadKristian"
            >Test</button>
          </div>
        </div>
        <div class="upload w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-24">
          <client-only>
            <form class="upload-form-filepond" v-if="!swipeStatsData.user">
              <file-pond
                ref="pond"
                :instantUpload="false"
                label-idle="Drop your data.json file here..."
                accepted-file-types="image/jpeg, image/png, application/json"
                :server="null"
                :files="myFiles"
                v-on:init="handleFilePondInit"
                v-on:addfile="handleFilePondAddFile"
              />
              <p
                class="text-white"
              >The file is NOT uploaded to a server, just used to extract your relevant, anonymus profile information.</p>
            </form>
          </client-only>
          <div v-if="swipeStatsData.user" class="create-user">
            <!-- <SuccessAlert
              heading="File parsed successfully"
              body="Review your informatin in the card below before you upload :)"
            />-->

            <TailwindCard
              :imgSrc="avatars.male_avatar"
              ref="profileCard"
              id="profile-card"
              class="mx-4 profile-card"
              :userId="secretId"
              :userData="swipeStatsData.user"
            />

            <div class="mt-4">
              <button
                class="upload-button bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center pulsate-fwd"
                @click="submitSwipeStats"
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  style="transform: rotate(180deg);"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Process />
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
// import "filepond/dist/filepond.min.css";
import * as md5 from "md5";

// Import image preview and file type validation plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import ProfileCard from "@/components/ProfileCard";
import TailwindCard from "@/components/TailwindCard";
import SuccessAlert from "@/components/SuccessAlert";
import Process from "@/components/Process";

import { mapMutations } from "vuex";

import f_profile_data from "@/assets/svgs/undraw/f_profile_data.svg";
import f_updated from "@/assets/svgs/undraw/f_updated.svg";
import female_avatar from "@/assets/svgs/undraw/female_avatar.svg";
import m_personalization from "@/assets/svgs/undraw/m_personalization.svg";
import m_profile_pic from "@/assets/svgs/undraw/m_profile_pic.svg";
import m_profile from "@/assets/svgs/undraw/m_profile.svg";
import male_avatar from "@/assets/svgs/undraw/male_avatar.svg";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  components: {
    FilePond,
    ProfileCard,
    TailwindCard,
    SuccessAlert,
    Process
  },
  data: function() {
    return {
      myFiles: [],
      uploadedFiles: [],
      chartdata: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20]
          }
        ]
      },
      avatars: {
        f_profile_data,
        f_updated,
        female_avatar,
        m_personalization,
        m_profile_pic,
        m_profile,
        male_avatar
      },
      options: {},
      myTinderData: null,
      swipeStatsData: {},
      messagessent: {},
      userData: null,
      secretId: ""
    };
  },
  computed: {
    getAppOpens() {
      return this.myTinderData ? this.myTinderData.Usage.app_opens : {};
    },

    getMessages() {
      return {
        sent: this.myTinderData ? this.myTinderData.Usage.messages_sent : {},
        received: this.myTinderData
          ? this.myTinderData.Usage.messages_received
          : {}
      };
    },
    getMatches() {
      return this.myTinderData ? this.myTinderData.Usage.matches : {};
    },
    getSwipes() {
      return {
        likes: this.myTinderData ? this.myTinderData.Usage.swipes_likes : {},
        passes: this.myTinderData ? this.myTinderData.Usage.swipes_passe : {}
      };
    }
  },
  async mounted() {
    // this.loadKristian()
  },
  methods: {
    async loadKristian() {
      console.log("fetching kristian");
      const res = await fetch("/api/get-kristian");
      if (res.ok) {
        console.log("res ok");
        const data = await res.json();
        console.log(data);

        this.secretId = data.userId;
        this.swipeStatsData = data;
      }
    },
    async submitSwipeStats() {
      console.log("submitting swipeStats", this.swipeStatsData);

      const body = JSON.stringify(this.swipeStatsData);

      const res = await fetch("/api/uploadData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      console.log(res.ok);

      this.$router.push({
        path: `/insights?userId=${this.secretId}`
      });
    },
    setSecretId(tinderData) {
      try {
        const secretId = md5(
          tinderData.User.email +
            tinderData.User.username +
            tinderData.User.create_date
        );
        window.localStorage.setItem("swipeStatsId", secretId);
        this.secretId = secretId;
        return secretId;
      } catch (e) {
        console.log(e);
        return "";
      }
    },
    setSwipeStatsData(tinderData) {
      const conversations = tinderData.Messages.map(
        ({ match_id, messages }) => ({
          match_id,
          messages: messages.map(({ message, ...messageMeta }) => messageMeta)
        })
      );

      // a = [{"to":523,"from":"You","message":"Hola gorgeous, what are you up to?","sent_date":"Thu, 11 Jan 2018 11:03:58 GMT"},{"to":523,"from":"You","message":"Un Poco","sent_date":"Thu, 11 Jan 2018 11:06:44 GMT"},{"to":523,"from":"You","message":", but mostly English","sent_date":"Thu, 11 Jan 2018 11:06:50 GMT"},{"to":523,"from":"You","message":"Sex needs no language","sent_date":"Thu, 11 Jan 2018 11:07:58 GMT"}]
      const mappedData = {
        userId: this.setSecretId(tinderData),
        user: {
          birthDate: tinderData.User.birth_date,
          ageFilterMin: tinderData.User.age_filter_min,
          ageFilterMax: tinderData.User.age_filter_max,
          cityName: tinderData.User.city.name,
          country: tinderData.User.city.region,
          createDate: tinderData.User.create_date,
          education: tinderData.User.education,
          gender: tinderData.User.gender,
          interestedIn: tinderData.User.interested_in,
          genderFilter: tinderData.User.gender_filter,
          instagram: tinderData.User.instagram.username,
          jobDisplayed: tinderData.User.jobs[0].company.displayed,
          jobTitle: tinderData.User.jobs[0].title.name,
          educationLevel: tinderData.User.education,
          schoolDisplayed: tinderData.User.schools[0].displayed,
          schoolName: tinderData.User.schools[0].name
        },
        swipes: {
          likes: tinderData.Usage.swipes_likes,
          swipes: tinderData.Usage.swipes_passe
        },
        matches: tinderData.Usage.matches,
        messages: {
          sent: tinderData.Usage.messages_sent,
          received: tinderData.Usage.messages_received
        },
        conversations,
        //messages: tinderData.Messages,
        appOpens: tinderData.Usage.app_opens
      };
      this.swipeStatsData = mappedData;

      this.$store.commit("setSwipeStats", mappedData);

      console.log("swipeStatsData", this.swipeStatsData);
      this.$nextTick(() => {
        console.log(document.getElementById("#profile-card"));
        console.log(document.querySelector(".profile-card"));
        document.querySelector(".profile-card").scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        console.log(this.$refs.profileCard);
        // this.$refs["profile-card"].scrollIntoView();
      });
    },
    handleFilePondAddFile: function(error, file) {
      console.log("filepond add change", file.file);
      var reader = new FileReader();
      const onReaderLoad = event => {
        var obj = JSON.parse(event.target.result);
        setTimeout(() => {
          this.setSwipeStatsData(obj);
          this.$toast.success("Successfully parsed file").goAway();
        }, 500);
      };

      reader.onload = onReaderLoad;
      reader.readAsText(file.file);
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleFilePondRemovefile: function(file) {
      console.log("FilePond deleted file " + file.filename);
      var index = this.myFiles.indexOf(file.filename);
      if (index > -1) {
        this.uploadedFiles.splice(index, 1);
        this.$nextTick();
      }
    }
  }
};
</script>

<style lang="scss" scoped >
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
</style>