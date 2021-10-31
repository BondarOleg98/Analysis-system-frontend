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
          accept=".xls"
          :maxFileSize="1000000"
          @clear="resetFlag"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </template>
    </Card>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import FileService from "@/services/FileService";

export default {
  fileService: null,
  components: {
    Panel,
  },
  data() {
    return {
      resetFlag: false,
    };
  },
  created() {
    this.fileService = new FileService();
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
    },
    errorUpload() {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "File/files not uploaded",
        life: 3000,
      });
      this.resetFlag = false;
    },
    uploader(event) {
      this.fileService.uploadFile(event.files).then(
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
