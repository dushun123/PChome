<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import PageHeader from "@/components/PageHeader.vue";
import { goldPriceData } from "@/data/goldPriceData";
import { TrendingUp } from "lucide-vue-next";

const router = useRouter();
const chartRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const goBack = () => {
  router.push("/");
};

const initChart = () => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  const years = goldPriceData.map((item) => item.year);
  const prices = goldPriceData.map((item) => item.price);
  const changes = goldPriceData.map((item) =>
    item.change ? parseFloat(item.change.replace("%", "")) : null,
  );

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 21, 41, 0.9)",
      borderColor: "#409eff",
      textStyle: { color: "#fff" },
      formatter: (params: any) => {
        const data = goldPriceData[params[0].dataIndex];
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 6px;">${data.year}年</div>
            <div>均价: <span style="color: #ffd700; font-weight: bold;">${data.price.toFixed(2)}</span> 元/克</div>
            ${data.change ? `<div>同比: <span style="color: ${data.change.startsWith("+") ? "#67c23a" : "#f56c6c"}">${data.change}</span></div>` : ""}
            <div style="color: #909399; font-size: 12px; margin-top: 4px;">${data.source}</div>
          </div>
        `;
      },
    },
    legend: {
      data: ["金价", "同比涨跌幅"],
      top: 0,
      textStyle: { color: "#606266" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "40px",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: years,
      axisLabel: {
        color: "#909399",
        rotate: years.length > 20 ? 45 : 0,
        interval: years.length > 20 ? "auto" : 0,
      },
      axisLine: { lineStyle: { color: "#e4e7ed" } },
    },
    yAxis: [
      {
        type: "value",
        name: "元/克",
        nameTextStyle: { color: "#909399" },
        axisLabel: { color: "#909399" },
        axisLine: { lineStyle: { color: "#e4e7ed" } },
        splitLine: { lineStyle: { color: "#ebeef5", type: "dashed" } },
      },
      {
        type: "value",
        name: "同比%",
        nameTextStyle: { color: "#909399" },
        axisLabel: { color: "#909399", formatter: "{value}%" },
        axisLine: { lineStyle: { color: "#e4e7ed" } },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "金价",
        type: "line",
        data: prices,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#e6a23c" },
            { offset: 1, color: "#f56c6c" },
          ]),
        },
        itemStyle: {
          color: "#e6a23c",
          borderWidth: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(230, 162, 60, 0.3)" },
            { offset: 1, color: "rgba(230, 162, 60, 0.02)" },
          ]),
        },
      },
      {
        name: "同比涨跌幅",
        type: "line",
        yAxisIndex: 1,
        data: changes,
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        lineStyle: { width: 2, color: "#409eff", type: "dashed" },
        itemStyle: { color: "#409eff" },
      },
    ],
  };

  chart.setOption(option);
};

onMounted(() => {
  setTimeout(() => {
    initChart();
  }, 50);
  window.addEventListener("resize", () => chart?.resize());
});

onUnmounted(() => {
  chart?.dispose();
  window.removeEventListener("resize", () => chart?.resize());
});
</script>

<template>
  <div class="statistics-page">
    <PageHeader title="数据统计" :show-back="true" @back="goBack" />

    <main class="main-content">
      <div class="chart-section">
        <div class="section-header">
          <TrendingUp :size="20" class="section-icon" />
          <h2 class="section-title">国内历年黄金年度均价</h2>
          <span class="section-unit">（人民币/克）</span>
        </div>
        <div ref="chartRef" class="chart-container"></div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.main-content {
  margin-top: 64px;
  padding: 30px 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.chart-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.section-icon {
  color: #e6a23c;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.section-unit {
  font-size: 14px;
  color: #909399;
}

.chart-container {
  width: 100%;
  height: 500px;
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 16px;
  }

  .chart-section {
    padding: 20px;
  }

  .chart-container {
    height: 400px;
  }

  .section-title {
    font-size: 16px;
  }
}
</style>
