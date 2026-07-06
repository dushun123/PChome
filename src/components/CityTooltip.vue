<script setup lang="ts">
import type { CityYearlyData } from "@/data/cities";
import type { CityFeatureData } from "@/data/cityFeatureData";

const props = defineProps<{
  name: string;
  province: string;
  history: CityYearlyData[];
  feature?: CityFeatureData;
}>();

const latest = props.history[0];

const popText = latest ? `${latest.total} 万` : "";
const gdpText = latest?.gdp ? `${latest.gdp} 亿` : "";
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

    <div v-if="popText || gdpText" class="ct-metrics">
      <div v-if="popText" class="ct-metric">
        <span class="ct-metric-val" style="color: #00f2fe">{{ popText }}</span>
        <span class="ct-metric-lbl">总人口</span>
      </div>
      <div v-if="gdpText" class="ct-metric">
        <span class="ct-metric-val" style="color: #409eff">{{ gdpText }}</span>
        <span class="ct-metric-lbl">GDP</span>
      </div>
    </div>

    <template v-if="feature">
      <div class="ct-section">
        <div class="ct-section-title">特色美食</div>
        <div class="ct-tags">
          <span
            v-for="item in feature.food"
            :key="item"
            class="ct-tag ct-tag-food"
            >{{ item }}</span
          >
        </div>
      </div>

      <div class="ct-section">
        <div class="ct-section-title">出名景点</div>
        <div class="ct-tags">
          <span
            v-for="item in feature.landmarks"
            :key="item"
            class="ct-tag ct-tag-landmark"
            >{{ item }}</span
          >
        </div>
      </div>

      <div class="ct-section">
        <div class="ct-section-title">城市特色</div>
        <div class="ct-feature-text">{{ feature.features }}</div>
      </div>
    </template>
    <template v-else>
      <div class="ct-section">
        <div class="ct-feature-text" style="color: rgba(255, 255, 255, 0.4)">
          暂无特色数据
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ct-wrap {
  width: 300px;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.ct-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(79, 172, 254, 0.12), transparent);
  border-bottom: 1px solid rgba(79, 172, 254, 0.15);
}
.ct-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00f2fe;
  box-shadow: 0 0 6px rgba(0, 242, 254, 0.5);
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
  color: rgba(255, 255, 255, 0.4);
}
.ct-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 10px 14px;
}
.ct-metric {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  padding: 6px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}
.ct-metric-val {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}
.ct-metric-lbl {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
}
.ct-section {
  padding: 6px 14px;
}
.ct-section-title {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
}
.ct-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.ct-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  white-space: nowrap;
}
.ct-tag-food {
  background: rgba(79, 172, 254, 0.15);
  color: #4facfe;
  border: 1px solid rgba(79, 172, 254, 0.2);
}
.ct-tag-landmark {
  background: rgba(0, 242, 254, 0.12);
  color: #00f2fe;
  border: 1px solid rgba(0, 242, 254, 0.18);
}
.ct-feature-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}
</style>
