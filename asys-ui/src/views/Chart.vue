<template>
  <div>
    <Panel />
  </div>
  <div>
    <SplitterPanel :size="50" style="background-color: white">
      <Splitter :gutterSize="0" layout="vertical">
        <SplitterPanel :size="30">
          <Splitter :gutterSize="0" layout="horizontal">
            <SplitterPanel style="background-color: white" :size="40">
              <Card
                style="
                  width: 35rem;
                  background-color: white;
                  margin-top: 7em;
                  margin-left: 1em;
                  margin-right: 1em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <Chart
                    type="line"
                    :data="basicLineChartData"
                    :options="basicLineChartOptions"
                    ref="lineChart"
                  />
                </template>
              </Card>
            </SplitterPanel>
            <SplitterPanel :size="40" style="background-color: white">
              <Card
                style="
                  width: 18.5rem;
                  margin-top: 7em;
                  background-color: white;
                  margin-left: 1.2em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <div>
                    <Chart
                      type="radar"
                      :data="basicRadarChartData"
                      :options="basicRadarChartOptions"
                      ref="radarChart"
                    />
                  </div>
                </template>
              </Card>
            </SplitterPanel>
            <SplitterPanel
              class="p-d-flex p-ai-center p-jc-center"
              :size="40"
              style="background-color: white"
            >
              <Card
                style="
                  width: 18.5rem;
                  margin-top: 7em;
                  background-color: white;
                  margin-left: 1.1em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <div>
                    <Chart
                      type="pie"
                      :data="basicPieChartData"
                      :options="basicPieChartOptions"
                      ref="pieChart"
                    />
                  </div>
                </template>
              </Card>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
        <SplitterPanel :size="20">
          <Splitter :gutterSize="0" layout="horizontal">
            <SplitterPanel
              class="p-d-flex p-ai-center p-jc-center"
              :size="20"
              style="background-color: white"
            >
              <Card
                style="
                  width: 37rem;
                  background-color: white;
                  margin-top: 1.2em;
                  background-color: white;
                  margin-left: 1em;
                "
              >
                <template #content>
                  <Chart
                    type="bar"
                    :data="basicBarChartData"
                    :options="basicBarChartOptions"
                    ref="barBasicChart"
                  />
                </template>
              </Card>
            </SplitterPanel>
            <SplitterPanel
              class="p-d-flex p-ai-center p-jc-center"
              :size="20"
              style="background-color: white"
            >
              <Card
                style="
                  width: 37rem;
                  margin-top: 1.2em;
                  background-color: white;
                  margin-left: 0em;
                "
              >
                <template #content>
                  <Chart
                    type="bar"
                    :data="basicBarStackedChartData"
                    :options="basicBarStackedChartOptions"
                    ref="barStackedChart"
                  />
                </template>
              </Card>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </div>
  <div>
    <Button
      label="Upload data"
      icon="pi pi-upload"
      style="margin-top: 1em"
      class="p-button-success p-mr-2"
      @click="chooseData"
    />

    <Dialog
      v-model:visible="paramsDialog"
      :style="{ width: '450px' }"
      header="Params details"
      :modal="true"
      class="p-fluid"
    >
      <h4>List of files</h4>
      <Dropdown
        v-model="selectedFile"
        :options="files"
        optionLabel="label"
        optionValue="value"
        :virtualScrollerOptions="{ itemSize: 31 }"
        placeholder="Select file"
      ></Dropdown>
      <h4>List of charts</h4>
      <Dropdown
        v-model="selectedChart"
        :options="charts"
        optionLabel="label"
        optionValue="value"
        :virtualScrollerOptions="{ itemSize: 31 }"
        placeholder="Select file"
      ></Dropdown>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="buildChart"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import FileService from "@/services/FileService";
import AnalysisService from "@/services/AnalysisService";
import { ref } from "vue";
import Chart from "primevue/chart";

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

export default {
  fileService: null,
  PACKAGE: "",
  name: "ChartView",
  components: {
    Panel,
    Chart,
  },
  setup() {
    const lineChart = ref();
    const radarChart = ref();
    const pieChart = ref();
    const barBasicChart = ref();
    const barStackedChart = ref();

    const changeData = (output, selectedChart) => {
      if (selectedChart === "Line chart") {
        changeDataLineChart(output.data.result);
      }
      if (selectedChart === "Radar chart") {
        changeDataRadarChart(output.data.result);
      }
      if (selectedChart === "Pie chart") {
        changeDataPieChart(output.data.result);
      }
      if (selectedChart === "Basic bar chart") {
        changeDataBarChart(output.data.result);
      }
      if (selectedChart === "Stacked bar chart") {
        changeDataBarStackedChart(output.data.result);
      }
    };

    const changeDataLineChart = (result) => {
      const chartLine = lineChart.value.chart;
      chartLine.data.labels = result.labels;

      const datasets = result.datasets;

      for (let index = 0; index < result.datasets.length; index++) {
        chartLine.data.datasets[index].yAxisID = "y" + (index + 1);
        chartLine.data.datasets[index].borderColor = "#" + randomColor();
        chartLine.data.datasets[index].data = datasets[index].data;
        chartLine.data.datasets[index].label = datasets[index].label;
      }
      chartLine.update();
    };

    const changeDataRadarChart = (result) => {
      const chartRadar = radarChart.value.chart;
      chartRadar.data.labels = result.labels;

      const datasets = result.datasets;

      for (let index = 0; index < result.datasets.length; index++) {
        chartRadar.data.datasets[index].yAxisID = "y" + (index + 1);
        chartRadar.data.datasets[index].borderColor = "#" + randomColor();
        chartRadar.data.datasets[index].data = datasets[index].data;
        chartRadar.data.datasets[index].label = datasets[index].label;
        chartRadar.data.datasets[index].pointBackgroundColor =
          "#" + randomColor();
        chartRadar.data.datasets[index].pointBorderColor = "#" + randomColor();
        chartRadar.data.datasets[index].pointHoverBackgroundColor =
          "#" + randomColor();
        chartRadar.data.datasets[index].pointHoverBorderColor =
          "#" + randomColor();
      }
      chartRadar.update();
    };

    const changeDataPieChart = (result) => {
      const chartPie = pieChart.value.chart;

      const datasets = result.datasets;
      let backgroundColor = new Array();
      let hoverBackgroundColor = new Array();

      chartPie.data.labels = result.labels;
      for (let index = 0; index < result.labels.length; index++) {
        backgroundColor.push("#" + randomColor());
        hoverBackgroundColor.push("#" + randomColor());
      }

      for (let index = 0; index < result.datasets.length; index++) {
        chartPie.data.datasets[index].backgroundColor = backgroundColor;
        chartPie.data.datasets[index].data = datasets[index].data;
        chartPie.data.datasets[index].hoverBackgroundColor =
          hoverBackgroundColor;
      }
      chartPie.update();
    };

    const changeDataBarChart = (result) => {
      const chartBarBasic = barBasicChart.value.chart;
      chartBarBasic.data.labels = result.labels;
      const datasets = result.datasets;

      for (let index = 0; index < result.datasets.length; index++) {
        chartBarBasic.data.datasets[index].backgroundColor =
          "#" + randomColor();
        chartBarBasic.data.datasets[index].data = datasets[index].data;
        chartBarBasic.data.datasets[index].label = datasets[index].label;
      }

      if (chartBarBasic.data.datasets.length > datasets.length) {
        chartBarBasic.data.datasets.splice(
          chartBarBasic.data.datasets.length - datasets.length
        );
      }

      chartBarBasic.update();
    };

    const changeDataBarStackedChart = (result) => {
      const chartBarStacked = barStackedChart.value.chart;
      chartBarStacked.data.labels = result.labels;
      const datasets = result.datasets;

      for (let index = 0; index < result.datasets.length; index++) {
        chartBarStacked.data.datasets[index].backgroundColor =
          "#" + randomColor();
        chartBarStacked.data.datasets[index].data = datasets[index].data;
        chartBarStacked.data.datasets[index].label = datasets[index].label;
      }

      if (chartBarStacked.data.datasets.length > datasets.length) {
        chartBarStacked.data.datasets.splice(
          chartBarStacked.data.datasets.length - datasets.length
        );
      }
      chartBarStacked.update();
    };
    return {
      lineChart,
      radarChart,
      pieChart,
      barBasicChart,
      barStackedChart,
      changeData,
      basicLineChartData: {
        labels: ["0", "10", "20", "30", "40", "50", "60"],
        datasets: [
          {
            label: "Basic dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            yAxisID: "y",
            borderColor: "#42A5F5",
            tension: 0.4,
          },
        ],
      },
      basicLineChartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
      basicRadarChartData: {
        labels: ["0", "10", "20", "30", "40", "50", "60"],
        datasets: [
          {
            label: "Basic dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            yAxisID: "y",
            borderColor: "#42A5F5",
            tension: 0.4,
          },
        ],
      },
      basicRadarChartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          r: {
            pointLabels: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
            angleLines: {
              color: "#ebedef",
            },
          },
        },
      },
      basicPieChartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      basicPieChartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
      },
      basicBarChartData: {
        labels: ["0", "10", "20", "30", "40", "50", "60"],
        datasets: [
          {
            label: "First dataset",
            backgroundColor: "#42A5F5",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "Second dataset",
            backgroundColor: "#FFA726",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
      basicBarChartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
      basicBarStackedChartData: {
        labels: ["0", "10", "20", "30", "40", "50", "60"],
        datasets: [
          {
            label: "First dataset",
            backgroundColor: "#42A5F5",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "Second dataset",
            backgroundColor: "#FFA726",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
      basicBarStackedChartOptions: {
        plugins: {
          tooltips: {
            mode: "index",
            intersect: false,
          },
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            stacked: true,
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
    };
  },
  data() {
    return {
      submitted: false,
      paramsDialog: false,
      selectedFile: null,
      selectedChart: null,
      files: null,
      charts: null,
    };
  },
  created() {
    const chartValues = [
      "Line chart",
      "Radar chart",
      "Pie chart",
      "Basic bar chart",
      "Stacked bar chart",
    ];
    this.charts = new Array();
    chartValues.forEach((value) => {
      this.charts.push({ label: value, value: value });
    });

    this.PACKAGE = "analysis";
    this.fileService = new FileService();
    this.analysisService = new AnalysisService();
    this.accountName = this.$store.state.auth.user.username;
  },
  mounted() {
    const arrayFiles = Array();
    this.fileService.getFiles(this.accountName).then(
      (files) => {
        files.data.forEach((file) => {
          if (file.name.includes(this.PACKAGE)) {
            arrayFiles.push({ label: file.name, value: file.id });
          }
        });
        this.files = arrayFiles;
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
    chooseData() {
      this.submitted = false;
      this.paramsDialog = true;
    },
    hideDialog() {
      this.paramsDialog = false;
      this.submitted = false;
    },
    buildChart() {
      this.submitted = true;
      this.paramsDialog = false;
      this.analysisService.buildChart(this.selectedFile).then(
        (result) => {
          this.changeData(result, this.selectedChart);
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
  },
};
</script>

<style></style>
