<template>
  <div>
    <Panel />
    <Card style="width: 50em; margin: auto; margin-top: 15em; color: initial">
      <template #content>
        <Toast />
        <FileUpload
          name="files[]"
          @uploader="uploader"
          :customUpload="true"
          :multiple="true"
          accept=".zip"
          :maxFileSize="1000000"
          @clear="resetFlag"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </template>
    </Card>
    <div v-if="loading">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="#EEEEEE"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import FileService from "@/services/FileService";

export default {
  fileService: null,
  accountName: "",
  components: {
    Panel,
  },
  data() {
    return {
      resetFlag: false,
      loading: false,
    };
  },
  created() {
    this.fileService = new FileService();
    this.accountName = this.$store.state.auth.user.username;
  },
  mounted() {},
  methods: {
    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File/files uploaded",
        life: 3000,
      });
      this.resetFlag = true;
      this.loading = false;
    },
    errorUpload() {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "File/files not uploaded",
        life: 3000,
      });
      this.resetFlag = false;
      this.loading = false;
    },
    uploader(event) {
      this.loading = true;
      this.fileService.uploadFile(event.files, this.accountName).then(
        () => {
          this.onUpload();
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          } else {
            this.errorUpload();
          }
        }
      );
    },
  },
};
</script>
<style></style>
