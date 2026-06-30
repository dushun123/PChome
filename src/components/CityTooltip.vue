<script setup lang="ts">
import { computed } from "vue";
import type { CityYearlyData } from "@/data/cityData";

const props = defineProps<{
  name: string;
  province: string;
  history: CityYearlyData[];
}>();

const latest = computed(() => props.history[0]);

const statsRows = computed(() => {
  const data = latest.value;
  if (!data) return [] as { label: string; color: string; value: string }[];

  const rows: { label: string; color: string; value: string }[] = [
    { label: "总人口", color: "#00f2fe", value: `${data.total} 万` },
  ];

  if (data.male !== undefined && data.female !== undefined) {
    rows.push(
      { label: "男性", color: "#67c23a", value: `${data.male} 万 (${data.maleRatio}%)` },
      { label: "女性", color: "#f56c6c", value: `${data.female} 万 (${data.femaleRatio}%)` },
    );
  }

  if (data.agingRatio !== undefined) {
    rows.push({ label: "老龄化", color: "#e6a23c", value: `${data.agingRatio}%` });
  }

  if (data.gdp !== undefined) {
    rows.push({ label: "GDP", color: "#409eff", value: `${data.gdp} 亿` });
  }

  if (data.gdpPerCapita !== undefined) {
    rows.push({ label: "人均GDP", color: "#409eff", value: `${data.gdpPerCapita} 元` });
  }

  return rows;
});

const trendData = computed(() => {
  return [...props.history].reverse();
});
</script>

<template>
  <div class="ct-wrap">
    <div class="ct-header">
      <span class="ct-dot"></span>
      <div class="ct-title-group">
        <span class="ct-name">{{ name }}</span>
        <span class="ct-province">{{ province }}</span>
      </div>
    </div>

    <div class="ct-metrics">
      <div v-for="(item, idx) in statsRows" :key="idx" class="ct-metric">
        <span class="ct-metric-val" :style="{ color: item.color }">{{ item.value }}</span>
        <span class="ct-metric-lbl">{{ item.label }}</span>
      </div>
    </div>

    <div class="ct-trend">
      <div class="ct-trend-title">近5年人口趋势 <span class="ct-trend-dir">2020→2024</span></div>
      <div class="ct-trend-bars">
        <div v-for="row in trendData" :key="row.year" class="ct-trend-item">
          <div class="ct-trend-bar" :style="{ height: `${Math.max(20, (row.total / 1500) * 80)}px` }"></div>
          <span class="ct-trend-year">{{ row.year }}</span>
          <span class="ct-trend-val">{{ row.total }}</span>
        </div>
      </div>
    </div>

    <div class="ct-table-wrap">
      <table class="ct-table">
        <thead>
          <tr>
            <th>年</th>
            <th>人口</th>
            <th v-if="history[0]?.maleRatio">男%</th>
            <th v-if="history[0]?.femaleRatio">女%</th>
            <th v-if="history[0]?.agingRatio">老龄</th>
            <th v-if="history[0]?.gdp">GDP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in history" :key="row.year">
            <td class="c-year">{{ row.year }}</td>
            <td class="c-pop">{{ row.total }}</td>
            <td v-if="row.maleRatio" class="c-male">{{ row.maleRatio }}</td>
            <td v-if="row.femaleRatio" class="c-female">{{ row.femaleRatio }}</td>
            <td v-if="row.agingRatio" :class="row.agingRatio >= 14 ? 'c-aging-h' : 'c-aging'">{{ row.agingRatio }}</td>
            <td v-if="row.gdp" class="c-gdp">{{ row.gdp }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="ct-source">
      数据来源：{{ latest?.source || "统计局公报" }}
    </div>
  </div>
</template>

<style scoped>
.ct-wrap {
  width: 320px;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.ct-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(79,172,254,0.12), transparent);
  border-bottom: 1px solid rgba(79,172,254,0.15);
}
.ct-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00f2fe;
  box-shadow: 0 0 6px rgba(0,242,254,0.5);
  flex-shrink: 0;
}
.ct-title-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.ct-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}
.ct-province {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
}
.ct-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 10px 14px;
}
.ct-metric {
  background: rgba(255,255,255,0.04);
  border-radius: 6px;
  padding: 6px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid rgba(255,255,255,0.04);
}
.ct-metric-val {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}
.ct-metric-lbl {
  font-size: 10px;
  color: rgba(255,255,255,0.4);
}
.ct-trend {
  padding: 0 14px 10px;
}
.ct-trend-title {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ct-trend-dir {
  font-size: 9px;
  color: rgba(255,255,255,0.3);
}
.ct-trend-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 4px;
}
.ct-trend-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.ct-trend-bar {
  width: 100%;
  max-width: 36px;
  background: linear-gradient(180deg, rgba(0,242,254,0.6), rgba(79,172,254,0.2));
  border-radius: 3px 3px 0 0;
  min-height: 20px;
}
.ct-trend-year {
  font-size: 9px;
  color: rgba(255,255,255,0.35);
}
.ct-trend-val {
  font-size: 8px;
  color: rgba(255,255,255,0.25);
}
.ct-table-wrap {
  border-top: 1px solid rgba(79,172,254,0.12);
  padding: 0;
}
.ct-table {
  width: 100%;
  font-size: 11px;
  border-collapse: collapse;
}
.ct-table thead tr {
  background: rgba(79,172,254,0.06);
}
.ct-table th {
  padding: 5px 6px;
  text-align: right;
  color: rgba(79,172,254,0.7);
  font-weight: 600;
  font-size: 10px;
}
.ct-table th:first-child {
  text-align: center;
}
.ct-table td {
  padding: 4px 6px;
  text-align: right;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.ct-table td:first-child {
  text-align: center;
}
.ct-source {
  padding: 6px 14px;
  font-size: 9px;
  color: rgba(255,255,255,0.25);
  text-align: right;
  border-top: 1px solid rgba(79,172,254,0.08);
}
.c-year { color: rgba(255,255,255,0.6); font-weight: 500; }
.c-pop { color: #00f2fe; }
.c-male { color: #67c23a; }
.c-female { color: #f56c6c; }
.c-aging { color: #e6a23c; }
.c-aging-h { color: #f56c6c; font-weight: 600; }
.c-gdp { color: #409eff; }
</style>
