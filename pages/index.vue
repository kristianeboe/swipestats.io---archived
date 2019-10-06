<template>
  <div class="wrapper">
    <section class="upload">
      <h1>Upload your data.json file here</h1>
      <client-only>
        <form class="upload-form-filepond" @submit="onSubmit">
          <file-pond
            name="test"
            ref="pond"
            label-idle="Drop files here..."
            accepted-file-types="image/jpeg, image/png, application/json"
            server="/api/upload"
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
            v-on:processfile="handleFilePondProcessfile"
          />
          <div>{{myFiles}}</div>
          <div v-for="(item, index)  in uploadedFiles" :key="item">
            <span>{{item}} {{index}}</span>
            <input :value="item" type="hidden" />
          </div>
        </form>
        <form @submit="onSubmit">
          <h3>React File Upload</h3>
          <div class="form-group">
            <input type="file" @change="handleFileOnChange" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="submit">Upload</button>
          </div>
        </form>
        <div class="small">
          <TimeLineChart :chart-data="datacollection" />
          <button @click="renderTinderData()">Randomize</button>
        </div>
        <div class="small">
          <TimeLineChart :chart-data="messagesSendt" />
          <button @click="renderTinderData()">Randomize</button>
        </div>
        <Matches :matches="getMatches" />
      </client-only>
    </section>
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import TimeLineChart from "@/components/TimeLineChart";
import Statistic from "@/components/Statistic";
import Matches from "@/components/Matches";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  data: function() {
    return {
      loaded: true,
      datacollection: null,
      myFiles: [],
      uploadedFiles: [],
      myFile2: null,
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
      messagesSendt: {}
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
    this.fillData();

    console.log("fetching kristian tinder");
    const res = await fetch("/api/get-kristian");
    if (res.ok) {
      console.log("res ok");
      const data = await res.json();
      console.log(data);
      this.myTinderData = data;
      this.renderTinderData();
    }
  },
  methods: {
    fillData() {
      console.log("filling data");
      this.datacollection = {
        labels: [1, 10],
        datasets: [
          {
            label: "Data En",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data to",
            backgroundColor: "#545454",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },

    renderTinderData() {
      console.log("myTinderData", this.myTinderData);
      try {
        const appOpens = this.getAppOpens(this.myTinderData);
        const labels = [];
        const data = [];

        Object.entries(appOpens)
          .slice(-100)
          .map(([date, value]) => {
            labels.push(date);
            data.push(value);
          });

        console.log("labels", labels);
        console.log("data", data);

        this.datacollection = {
          labels,
          datasets: [
            {
              label: "App opens",
              backgroundColor: "#f87979",
              data
            }
          ]
        };
      } catch (error) {
        console.log(error);
        console.log("fail");
      }
    },
    renderMessagesSendt() {},
    handleFileOnChange: function(e) {
      console.log("file change");
      this.myFile2 = e.target.files[0];
      var reader = new FileReader();
      const onReaderLoad = event => {
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        this.myTinderData = obj;
        console.log(Object.keys(obj));
      };

      reader.onload = onReaderLoad;
      reader.readAsText(event.target.files[0]);
    },
    onSubmit: function(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", this.myFile2);

      var reader = new FileReader();
      reader.onload = function(event) {
        var jsonObj = JSON.parse(file);
        console.log(jsonObj);
        fetch("/api/uploadData", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: jsonObj
        });
      };

      console.log(this.myFile2);

      //       reader.readAsText(this.myFile2);

      // fetch("http://localhost:3000/api/upload", {
      //   method: "post",
      //   body: formData
      // }).then(res => {
      //   console.log(res);
      // });
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleFilePondProcessfile: function(error, file) {
      console.log("FilePond succesfully processed file " + file.id);
      console.log(file.origin);

      var reader = new FileReader();

      reader.onload = function(event) {
        var jsonObj = JSON.parse(file);
        console.log(jsonObj);
      };

      reader.readAsText(file.origin);

      this.uploadedFiles.push(file.filename);
      this.$nextTick();
    },
    handleFilePondRemovefile: function(file) {
      console.log("FilePond deleted file " + file.filename);
      var index = this.myFiles.indexOf(file.filename);
      if (index > -1) {
        this.uploadedFiles.splice(index, 1);
        this.$nextTick();
      }
    }
  },
  components: {
    FilePond,
    TimeLineChart,
    Matches
  }
};
</script>

<style lang="scss" scoped >
.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload {
  display: flex;
  flex-direction: column;
  flex: 1 1;
  align-items: center;
}

.upload-form {
  width: 50rem;
  text-align: center;
}

.small {
}
</style>