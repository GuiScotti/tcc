<template>
  <div class="d-flex flex-row w-100 mx-4 mt-4">
    <div class="chart-container rounded-3">
      <canvas ref="averageValuePerContactChart"></canvas>
    </div>
    <div class="chart-container rounded-3">
      <canvas ref="averageValuePerFunnelChart"></canvas>
    </div>
    <div class="chart-container rounded-3">
      <canvas ref="totalContactsInLastStageChart"></canvas>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
} from "chart.js";
import { mapActions, mapGetters } from "vuex";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController
);

export default {
  name: "Metrics",
  data() {
    return {
      metrics: null,
    };
  },
  computed: {
    ...mapGetters("funnels", ["getMetrics"]),
  },
  async mounted() {
    await this.fetchMetrics();
    this.renderCharts();
  },
  methods: {
    ...mapActions("funnels", ["setMetrics"]),
    async fetchMetrics() {
      await this.setMetrics();
      this.metrics = this.getMetrics;
    },
    renderCharts() {
      this.renderChart(
        this.$refs.averageValuePerContactChart,
        "Valor médio por contato",
        [this.metrics.average_value_per_contact]
      );
      this.renderChart(
        this.$refs.averageValuePerFunnelChart,
        "Valor médio por funil",
        [this.metrics.average_value_per_funnel]
      );
      this.renderChart(
        this.$refs.totalContactsInLastStageChart,
        "Total de contatos na última etapa",
        [this.metrics.total_contacts_in_last_stage]
      );
    },
    renderChart(ref, label, data) {
      new ChartJS(ref, {
        type: "line",
        data: {
          labels: ["Métricas"],
          datasets: [
            {
              label: label,
              data: data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  box-shadow: 0 4px 18px 0 rgba(34, 54, 77, 0.2);
  width: 30%;
  height: 150px;
  margin-right: 30px;
  margin-top: -40px;
  margin-bottom: 20px;
}
</style>

