<template>
  <div class="wrapper">
    <section class="upload">
      <h1>Upload your data.json file here</h1>
      <client-only>
        <form class="upload-form-filepond">
          <file-pond
            ref="pond"
            :instantUpload="false"
            label-idle="Drop files here..."
            accepted-file-types="image/jpeg, image/png, application/json"
            :server="null"
            :files="myFiles"
            v-on:init="handleFilePondInit"
            v-on:addfile="handleFilePondAddFile"
          />
        </form>
      </client-only>
      <div v-if="swipeStatsData.user" class="create-user">
        <ProfileCard :userId="secretId" :userData="swipeStatsData.user" />
        <button class="create-user--button" @click="submitSwipeStats">Show me my swipe stats!</button>
      </div>
    </section>
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import * as md5 from "md5";

// delete this
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import ProfileCard from "@/components/ProfileCard";

import { mapMutations } from "vuex";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  components: {
    FilePond,
    ProfileCard
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
      options: {},
      myTinderData: null,
      swipeStatsData: {},
      messagesSendt: {},
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
        sendt: this.myTinderData ? this.myTinderData.Usage.messages_sent : {},
        received: this.myTinderData
          ? this.myTinderData.Usage.messages_receive
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
    console.log("fetching kristian tinder");
    const res = await fetch("/api/get-kristian");
    if (res.ok) {
      console.log("res ok");
      const data = await res.json();
      console.log(data);

      // this.secretId = data.userId;
      // this.swipeStatsData = data;
    }
  },
  methods: {
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
          sendt: tinderData.Usage.messages_sent,
          received: tinderData.Usage.messages_receive
        }
      };
      this.swipeStatsData = mappedData;

      this.$store.commit("setSwipeStats", mappedData);

      console.log("swipeStatsData", this.swipeStatsData);
    },
    handleFilePondAddFile: function(error, file) {
      console.log("filepond add change", file.file);
      var reader = new FileReader();
      const onReaderLoad = event => {
        var obj = JSON.parse(event.target.result);
        this.setSwipeStatsData(obj);
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
.wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.upload {
  display: flex;
  flex-direction: column;
  flex: 1 1;
  align-items: center;
}

.upload-form-filepond {
  width: 50rem;
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
</style>