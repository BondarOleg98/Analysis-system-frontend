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
                  margin-top: 8em;
                  margin-left: 1em;
                  margin-right: 1em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <Chart
                    type="line"
                    :data="multiAxisData"
                    :options="multiAxisOptions"
                  />
                </template>
              </Card>
            </SplitterPanel>
            <SplitterPanel :size="40" style="background-color: white">
              <Card
                style="
                  width: 18.5rem;
                  margin-top: 8em;
                  background-color: white;
                  margin-left: 1.2em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <div>
                    <Chart
                      type="radar"
                      :data="chartData"
                      :options="chartOptions"
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
                  margin-top: 8em;
                  background-color: white;
                  margin-left: 1.1em;
                  margin-bottom: 1.5em;
                "
              >
                <template #content>
                  <div>
                    <Chart
                      type="pie"
                      :data="chartDataPie"
                      :options="lightOptionsPie"
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
                  margin-top: 1.5em;
                  background-color: white;
                  margin-left: 1em;
                "
              >
                <template #content>
                  <Chart
                    type="bar"
                    :data="basicDataBar"
                    :options="basicOptionsBar"
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
                  margin-top: 1.5em;
                  background-color: white;
                  margin-left: 1em;
                "
              >
                <template #content>
                  <Chart
                    type="bar"
                    :data="stackedData"
                    :options="stackedOptions"
                  />
                </template>
              </Card>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  name: "ChartView",
  components: {
    Panel,
  },
  data() {
    return {
      multiAxisData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Dataset 1",
            fill: false,
            borderColor: "#42A5F5",
            yAxisID: "y",
            tension: 0.4,
            data: [65, 59, 80, 81, 56, 55, 10],
          },
          {
            label: "Dataset 2",
            fill: false,
            borderColor: "#00bb7e",
            yAxisID: "y1",
            tension: 0.4,
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
      multiAxisOptions: {
        stacked: false,
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
            type: "linear",
            display: true,
            position: "left",
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            ticks: {
              color: "#495057",
            },
            grid: {
              drawOnChartArea: false,
              color: "#ebedef",
            },
          },
        },
      },
      chartData: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ],
      },
      chartOption: {
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
      chartDataPie: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      lightOptionsPie: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
      },
      stackedData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            type: "bar",
            label: "Dataset 1",
            backgroundColor: "#42A5F5",
            data: [50, 25, 12, 48, 90, 76, 42],
          },
          {
            type: "bar",
            label: "Dataset 2",
            backgroundColor: "#66BB6A",
            data: [21, 84, 24, 75, 37, 65, 34],
          },
          {
            type: "bar",
            label: "Dataset 3",
            backgroundColor: "#FFA726",
            data: [41, 52, 24, 74, 23, 21, 32],
          },
        ],
      },
      stackedOptions: {
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
      basicDataBar: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "#42A5F5",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "#FFA726",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
      basicOptions: {
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
    };
  },
};
</script>

<style></style>
