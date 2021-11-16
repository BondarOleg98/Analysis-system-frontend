<template>
  <div>
    <Panel />
  </div>
  <div>
    <Card style="width: 50em; margin: auto; margin-top: 7em">
      <template #content>
        <Toolbar class="p-mb-4">
          <template #left>
            <Button
              label="Delete"
              icon="pi pi-trash"
              class="p-button-danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedFiles || !selectedFiles.length"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="files"
          v-model:selection="selectedFiles"
          dataKey="id"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[2, 5, 7]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} files"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="
                table-header
                p-d-flex p-flex-column p-flex-md-row p-jc-md-between
              "
            ></div>
          </template>

          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column
            field="name"
            header="Name"
            :sortable="true"
            style="min-width: 10rem"
          ></Column>
          <Column
            field="type"
            header="Type"
            :sortable="true"
            style="min-width: 10rem"
          ></Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteFile(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="deleteFileDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="file"
          >Are you sure you want to delete <b>{{ file.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteFileDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteFile"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteFilesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="file"
          >Are you sure you want to delete the selected files?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteFilesDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedFiles"
        />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import Panel from "@/components/Panel";
import FileService from "@/services/FileService";

export default {
  fileService: null,
  components: {
    Panel,
  },
  data() {
    return {
      files: null,
      deleteFileDialog: false,
      deleteFilesDialog: false,
      file: {},
      selectedFiles: null,
      filters: {},
    };
  },
  created() {
    this.initFilters();
    this.fileService = new FileService();
    this.accountName = this.$store.state.auth.user.username;
  },
  mounted() {
    this.fileService.getFiles(this.accountName).then(
      (files_data) => {
        this.files = files_data.data;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          this.$store.dispatch("auth/logout");
          this.$router.push("/login");
        }
      }
    );
  },
  methods: {
    confirmDeleteFile(file) {
      this.file = file;
      this.deleteFileDialog = true;
    },
    deleteFile() {
      this.files = this.files.filter((val) => val.id !== this.file.id);
      this.deleteFileDialog = false;
      this.callDeleting(this.file.id);
      this.file = {};
      this.callSuccessMessage();
    },
    callSuccessMessage() {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Deleted file/files",
        life: 3000,
      });
    },
    callErrorMessage() {
      this.$toast.add({
        severity: "error",
        summary: "error",
        detail: "Error during deleting",
        life: 3000,
      });
    },
    callDeleting(file_id) {
      this.fileService.deleteFile(file_id).then(
        () => {},
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          } else {
            this.errorUpload();
          }
        }
      );
    },
    confirmDeleteSelected() {
      this.deleteFilesDialog = true;
    },
    deleteSelectedFiles() {
      this.files = this.files.filter(
        (val) => !this.selectedFiles.includes(val)
      );
      this.deleteFilesDialog = false;

      this.selectedFiles.forEach((selectedFile) => {
        this.callDeleting(selectedFile.id);
      });
      this.callSuccessMessage();
      this.selectedFiles = null;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media screen and (max-width: 960px) {
  .table-header {
    align-items: start;
  }
}
.p-dialog {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;
  }
  ::v-deep(.p-toolbar) .p-button {
    margin-bottom: 0.25rem;
  }
}
</style>
