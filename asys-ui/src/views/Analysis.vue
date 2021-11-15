<template>
  <div>
    <Panel />
    <Toast />
  </div>
  <div>
    <SplitterPanel :size="50" style="background-color: white">
      <Splitter :gutterSize="0" layout="vertical">
        <SplitterPanel :size="30">
          <Splitter :gutterSize="0" layout="horizontal">
            <SplitterPanel style="background-color: white" :size="40">
              <Card style="width: 34em; margin-left: 3.5em; margin-top: 7em">
                <template #content>
                  <DataTable
                    ref="dt"
                    :value="filesAnalysis"
                    dataKey="id"
                    :paginator="true"
                    :rows="7"
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
                      >
                        Analysis packages
                      </div>
                    </template>
                    <Column
                      field="name"
                      header="Name"
                      :sortable="false"
                      style="min-width: 5rem"
                    ></Column>
                    <Column :exportable="false" style="min-width: 5rem">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-forward"
                          class="p-button-rounded p-button-help"
                          @click="confirmExecuteAnalysis(slotProps.data)"
                        />
                      </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 5rem">
                      <template #body="slotProps">
                        <div v-if="slotProps.data.run">
                          <Button
                            icon="pi pi-check"
                            class="p-button-rounded p-button-success"
                            @click="showResultAnalysis(slotProps.data)"
                          />
                        </div>
                      </template>
                    </Column>
                  </DataTable>
                </template>
              </Card>
            </SplitterPanel>
            <SplitterPanel :size="40" style="background-color: white">
              <Card style="width: 34em; margin-left: 1.2em; margin-top: 7em">
                <template #content>
                  <DataTable
                    ref="dt"
                    :value="filesForecasting"
                    dataKey="id"
                    :paginator="true"
                    :rows="7"
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
                      >
                        Forecasting packages
                      </div>
                    </template>
                    <Column
                      field="name"
                      header="Name"
                      :sortable="false"
                      style="min-width: 5rem"
                    ></Column>
                    <Column :exportable="false" style="min-width: 5rem">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-forward"
                          class="p-button-rounded p-button-help"
                          @click="confirmExecuteForecasting(slotProps.data)"
                        />
                      </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 5rem">
                      <template #body="slotProps">
                        <div v-if="slotProps.data.run">
                          <Button
                            icon="pi pi-check"
                            class="p-button-rounded p-button-success"
                            @click="showResultForecasting(slotProps.data)"
                          />
                        </div>
                      </template>
                    </Column>
                  </DataTable>
                </template>
              </Card>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>

    <Dialog
      v-model:visible="executeAnalysisDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="fileAnalysis"
          >Are you sure you want to execute analysis package
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="executeAnalysisDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="executeAnalysis"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="showResultAnalysisDialog"
      :style="{ width: '500px', height: '300px' }"
      :modal="true"
    >
      <pre>{{ resultAnalysis }}</pre>
    </Dialog>
    <Dialog
      v-model:visible="showResultForecastingDialog"
      :style="{ width: '500px', height: '300px' }"
      :modal="true"
    >
      <pre>{{ resultForecasting }}</pre>
    </Dialog>
    <Dialog
      v-model:visible="executeForecastingDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="fileForecasting"
          >Are you sure you want to execute forecasting package ?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="executeForecastingDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="executeForecasting"
        />
      </template>
    </Dialog>
  </div>
  <div v-if="loading">
    <ProgressSpinner
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="#EEEEEE"
      animationDuration=".5s"
    />
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import Panel from "@/components/Panel";
import FileService from "@/services/FileService";
import AnalysisService from "@/services/AnalysisService";

export default {
  PACKAGE: null,
  fileService: null,
  components: {
    Panel,
  },
  data() {
    return {
      filesAnalysis: null,
      filesForecasting: null,
      executeForecastingDialog: false,
      executeAnalysisDialog: false,
      showResultAnalysisDialog: false,
      showResultForecastingDialog: false,
      fileAnalysis: {},
      fileForecasting: {},
      filters: {},
      loading: false,
      resultAnalysis: null,
      resultForecasting: null,
      result: null,
    };
  },
  created() {
    this.initFilters();
    this.PACKAGE = "analysis";
    this.fileService = new FileService();
    this.analysisService = new AnalysisService();
    this.accountName = this.$store.state.auth.user.username;
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      const analysisArray = Array();
      const forecastingArray = Array();
      this.fileService.getFiles(this.accountName).then(
        (files_data) => {
          files_data.data.forEach((file) => {
            if (file.name.includes(this.PACKAGE)) {
              analysisArray.push(file);
            } else {
              forecastingArray.push(file);
            }
            this.filesAnalysis = analysisArray;
            this.filesForecasting = forecastingArray;
          });
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        }
      );
    },
    confirmExecuteForecasting(file) {
      this.fileForecasting = file;
      this.executeForecastingDialog = true;
    },
    confirmExecuteAnalysis(file) {
      this.fileAnalysis = file;
      this.executeAnalysisDialog = true;
    },
    showResultAnalysis(file) {
      this.getAnalysisResult(file.id);
    },
    showResultForecasting(file) {
      this.getForecastingResult(file.id);
    },

    getAnalysisResult(file_id) {
      this.analysisService.getAnalysisResult(file_id).then(
        (result) => {
          if (result.data) {
            this.resultAnalysis = result.data;
            this.showResultAnalysisDialog = true;
          }
        },
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        }
      );
    },
    getForecastingResult(file_id) {
      this.analysisService.getForecastingResult(file_id).then(
        (result) => {
          if (result.data) {
            this.resultForecasting = result.data;
            this.showResultAnalysisDialog = true;
          }
        },
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        }
      );
    },
    executeForecasting() {
      this.loading = true;
      this.executeForecastingDialog = false;
      this.callExecutingForecasting(this.fileForecasting.id);
      this.fileForecasting = {};
    },
    executeAnalysis() {
      this.loading = true;
      this.executeAnalysisDialog = false;
      this.callExecutingAnalysis(this.fileAnalysis.id);
      this.fileAnalysis = {};
    },

    callSuccessMessage() {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "File executed",
        life: 3000,
      });
    },
    callErrorMessage() {
      this.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error during executing",
        life: 3000,
      });
    },
    callExecutingForecasting(file_id) {
      this.analysisService.executeForecasting(file_id).then(
        () => {
          this.callSuccessMessage();
          this.getFiles();
          this.loading = false;
        },
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
          this.loading = false;
        }
      );
    },
    callExecutingAnalysis(file_id) {
      this.analysisService.executeAnalysis(file_id).then(
        () => {
          this.callSuccessMessage();
          this.getFiles();
          this.loading = false;
        },
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
          this.loading = false;
        }
      );
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
.p-fieldset p {
  line-height: 1.5;
  margin: 0;
  width: 350px;
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
