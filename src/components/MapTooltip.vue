<script setup lang="ts">
import { computed } from "vue";
import type { YearlyData, ProvinceBaseData } from "@/data/provinceData";

const props = defineProps<{
  name: string;
  popData?: ProvinceBaseData;
  last5Years: YearlyData[];
}>();

const statsRows = computed(() => {
  const popData = props.popData;
  if (!popData)
    return [] as {
      label: string;
      color: string;
      value: string;
      badge?: "male" | "female" | "up" | "down" | "warn";
    }[];
  return [
    { label: "总人口", color: "#00f2fe", value: `${popData.total} 万` },
    {
      label: "男性",
      color: "#67c23a",
      value: `${popData.male} 万`,
      badge: "male" as const,
    },
    {
      label: "女性",
      color: "#f56c6c",
      value: `${popData.female} 万`,
      badge: "female" as const,
    },
    { label: "城镇化", color: "#e6a23c", value: `${popData.urbanization}%` },
    { label: "密度", color: "#409eff", value: `${popData.density}` },
    {
      label: "增长",
      color: popData.growth >= 0 ? "#67c23a" : "#f56c6c",
      value: `${popData.growth >= 0 ? "+" : ""}${popData.growth}%`,
      badge: popData.growth >= 0 ? ("up" as const) : ("down" as const),
    },
  ];
});
</script>

<template>
  <!-- 仅名称 -->
  <div v-if="!popData" class="tt-simple">
    <div class="tt-name-only">{{ name }}</div>
  </div>

  <!-- 完整数据 -->
  <div v-else class="tt-wrap">
    <!-- 标题 -->
    <div class="tt-header">
      <span class="tt-dot"></span>
      <span class="tt-name">{{ name }}</span>
    </div>

    <!-- 指标卡片行 -->
    <div class="tt-metrics">
      <div
        v-for="item in statsRows"
        :key="item.label"
        class="tt-metric"
        :class="item.badge ? `tt-metric--${item.badge}` : ''"
      >
        <span class="tt-metric-val" :style="{ color: item.color }">{{
          item.value
        }}</span>
        <span class="tt-metric-lbl">{{ item.label }}</span>
      </div>
    </div>

    <!-- 年份数字趋势条 -->
    <div class="tt-trend">
      <div class="tt-trend-title">
        历年人口趋势 <span class="tt-trend-dir">最新→最早</span>
      </div>
      <div class="tt-trend-bars">
        <div v-for="row in last5Years" :key="row.year" class="tt-trend-item">
          <div
            class="tt-trend-bar"
            :style="{ height: `${(row.total / 15000) * 80}px` }"
          >
            <div
              class="tt-trend-bar-fill"
              :style="{ height: `${(row.female / row.total) * 100}%` }"
            ></div>
          </div>
          <span class="tt-trend-year">{{ row.year }}</span>
          <span class="tt-trend-val">{{ row.total }}</span>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="tt-table-wrap">
      <table class="tt-table">
        <thead>
          <tr>
            <th>年</th>
            <th>男%</th>
            <th>女%</th>
            <th>老龄</th>
            <th>GDP</th>
            <th>人均</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in last5Years" :key="row.year">
            <td class="c-year">{{ row.year }}</td>
            <td class="c-male">{{ row.maleRatio }}</td>
            <td class="c-female">{{ row.femaleRatio }}</td>
            <td :class="row.agingRatio >= 14 ? 'c-aging-h' : 'c-aging'">
              {{ row.agingRatio }}
            </td>
            <td class="c-gdp">{{ row.gdp }}</td>
            <td class="c-gdp">{{ row.gdpPerCapita }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* ====== 基础 ====== */
.tt-simple {
  padding: 6px 10px;
}
.tt-name-only {
  font-size: 14px;
  font-weight: 600;
  color: #4facfe;
}

/* ====== 容器 ====== */
.tt-wrap {
  width: 360px;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ====== 标题 ====== */
.tt-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(79, 172, 254, 0.12), transparent);
  border-bottom: 1px solid rgba(79, 172, 254, 0.15);
}
.tt-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4facfe;
  box-shadow: 0 0 6px rgba(79, 172, 254, 0.5);
  flex-shrink: 0;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.tt-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
}

/* ====== 指标行 ====== */
.tt-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 10px 14px;
}
.tt-metric {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  padding: 6px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.2s;
}
.tt-metric:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(79, 172, 254, 0.2);
}
.tt-metric-val {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}
.tt-metric-lbl {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ====== 趋势条 ====== */
.tt-trend {
  padding: 0 14px 10px;
}
.tt-trend-title {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.tt-trend-dir {
  font-size: 9px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
}
.tt-trend-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 4px;
}
.tt-trend-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.tt-trend-bar {
  width: 100%;
  max-width: 36px;
  background: rgba(79, 172, 254, 0.08);
  border-radius: 3px 3px 0 0;
  position: relative;
  overflow: hidden;
}
.tt-trend-bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #f56c6c, #e6a23c);
  border-radius: 3px 3px 0 0;
  transition: height 0.3s;
  opacity: 0.7;
}
.tt-trend-year {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
}
.tt-trend-val {
  font-size: 8px;
  color: rgba(255, 255, 255, 0.25);
}

/* ====== 表格 ====== */
.tt-table-wrap {
  border-top: 1px solid rgba(79, 172, 254, 0.12);
  padding: 0;
}
.tt-table {
  width: 100%;
  font-size: 11px;
  border-collapse: collapse;
}
.tt-table thead tr {
  background: rgba(79, 172, 254, 0.06);
}
.tt-table th {
  padding: 5px 6px;
  text-align: right;
  color: rgba(79, 172, 254, 0.7);
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.3px;
}
.tt-table th:first-child {
  text-align: center;
}
.tt-table td {
  padding: 4px 6px;
  text-align: right;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.tt-table td:first-child {
  text-align: center;
}
.tt-table tbody tr:hover td {
  background: rgba(79, 172, 254, 0.04);
}

/* 颜色 */
.c-year {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}
.c-male {
  color: #67c23a;
}
.c-female {
  color: #f56c6c;
}
.c-aging {
  color: #e6a23c;
}
.c-aging-h {
  color: #f56c6c;
  font-weight: 600;
}
.c-gdp {
  color: #409eff;
}
</style>
