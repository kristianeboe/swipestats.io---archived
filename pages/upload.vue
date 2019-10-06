<template>
  <div>
    <h1>Upload your data.json file here</h1>
    <form @submit.prevent="submitFile">
      <client-only>
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
      </client-only>
      <input type="submit" />
    </form>
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

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  data: function() {
    return { myFiles: [], uploadedFiles: [] };
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
    submitFile: function() {
      console.log("files", this.myFiles);
      const files2 = this.$refs.pond.getFiles();
      console.log(files2);
      this.$refs.pond.processFiles().then(files => {
        console.log("Files uploaded");
        console.log(files);
        // files have been processed
      });
    },
    handleFilePondProcessfile: function(error, file) {
      console.log("FilePond succesfully processed file " + file);
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
    FilePond
  }
};
</script>

<style>
</style>