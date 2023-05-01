<template>
  <LineChartJS :options="options" :data="chartData" />
</template>

<script lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  plugins,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line as LineChartJS } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/*Compostion api did not work on this component, so I had to use the old way of doing it*/
export default {
  name: "LineChart",
  components: {
    LineChartJS,
  },
  data() {
    return {
      options: {
        type: "line",
        responsive: true,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        interaction: {
          intersect: false,
        },
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Bruk og svinn",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
};
</script>
