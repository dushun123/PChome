<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import PageHeader from "@/components/PageHeader.vue";
import { provinceCodeMap, provinceBaseData } from "@/data/provinceData";
import {
  getMapTooltipHtml,
  getCityTooltipHtml,
} from "@/data/mapTooltipRenderer";
import { getCountryData } from "@/data/worldCountryData";

const router = useRouter();
const mapRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const normalizeProvinceName = (name: string): string => {
  if (provinceCodeMap[name] || provinceBaseData[name]) return name;
  const suffixes = [
    "维吾尔自治区",
    "壮族自治区",
    "回族自治区",
    "内蒙古自治区",
    "广西壮族自治区",
    "新疆维吾尔自治区",
    "宁夏回族自治区",
    "西藏自治区",
    "自治区",
    "特别行政区",
    "省",
    "市",
  ];
  for (const suffix of suffixes) {
    if (name.endsWith(suffix)) {
      const short = name.slice(0, -suffix.length);
      if (provinceCodeMap[short]) return short;
    }
  }
  return name;
};

const currentLevel = ref<"world" | "china" | "province">("china");
const selectedProvince = ref("");
const isVisible = ref(false);
const isLoading = ref(false);

const goBack = () => {
  if (currentLevel.value === "province") {
    loadChinaMap();
  } else if (currentLevel.value === "china") {
    loadWorldMap();
  } else {
    router.push("/");
  }
};

const handleProvinceChange = (value: string) => {
  setTimeout(() => {
    if (!value) {
      loadChinaMap();
    } else {
      const code = provinceCodeMap[value];
      if (code) {
        loadProvinceMap(value, code);
      }
    }
  }, 100);
};

const commonItemStyle = {
  areaColor: {
    type: "linear" as const,
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: "#1a3a5c" },
      { offset: 1, color: "#0d2137" },
    ],
  },
  borderColor: "#4facfe",
  borderWidth: 1,
};

const commonEmphasis = {
  label: { show: true, fontSize: 14, color: "#fff" },
  itemStyle: {
    areaColor: {
      type: "linear" as const,
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: "#4facfe" },
        { offset: 1, color: "#00f2fe" },
      ],
    },
  },
};

const commonTooltip = {
  trigger: "item" as const,
  backgroundColor: "rgba(0, 21, 41, 0.95)",
  borderColor: "#4facfe",
  borderWidth: 1,
  textStyle: { color: "#fff" },
};

const getWorldMapTooltipHtml = (name: string): string => {
  const country = getCountryData(name);
  if (!country) {
    return `<div style="font-size:14px;font-weight:600;color:#4facfe">${name}</div>`;
  }
  const foodHtml = country.food
    .map(
      (f) =>
        `<span style="display:inline-block;background:rgba(79,172,254,0.12);border:1px solid rgba(79,172,254,0.25);border-radius:10px;padding:1px 8px;margin:2px 3px;font-size:11px;color:#4facfe;white-space:nowrap">${f}</span>`,
    )
    .join("");
  const landmarkHtml = country.landmarks
    .map(
      (l) =>
        `<span style="display:inline-block;background:rgba(0,242,254,0.08);border:1px solid rgba(0,242,254,0.2);border-radius:10px;padding:1px 8px;margin:2px 3px;font-size:11px;color:#00f2fe;white-space:nowrap">${l}</span>`,
    )
    .join("");
  return `
    <div style="min-width:220px;max-width:300px;font-family:system-ui">
      <div style="font-size:16px;font-weight:700;color:#4facfe;margin-bottom:6px">${name}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px 14px;margin-bottom:6px;font-size:12px">
        <span style="color:rgba(255,255,255,0.7)">首都: <b style="color:#fff">${country.capital}</b></span>
        <span style="color:rgba(255,255,255,0.7)">人口: <b style="color:#fff">${country.population}</b></span>
        <span style="color:rgba(255,255,255,0.7)">面积: <b style="color:#fff">${country.area}</b></span>
        <span style="color:rgba(255,255,255,0.7)">货币: <b style="color:#fff">${country.currency}</b></span>
        ${country.exchangeRate !== "-" ? `<span style="color:rgba(255,255,255,0.7)">汇率: <b style="color:#ffd700">1 CNY ≈ ${country.exchangeRate}</b></span>` : ""}
      </div>
      <div style="margin-bottom:4px">
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:3px">特色美食</div>
        <div style="display:flex;flex-wrap:wrap">${foodHtml}</div>
      </div>
      <div style="margin-bottom:4px">
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:3px">出名景点</div>
        <div style="display:flex;flex-wrap:wrap">${landmarkHtml}</div>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px;line-height:1.5">${country.features}</div>
    </div>`;
};

const getWorldMapOption = (data: any[]) => ({
  series: [
    {
      type: "map",
      map: "world",
      roam: true,
      zoom: 1.2,
      data,
      label: { show: true, fontSize: 8, color: "rgba(255,255,255,0.6)" },
      itemStyle: commonItemStyle,
      emphasis: commonEmphasis,
    },
  ],
  tooltip: {
    ...commonTooltip,
    formatter: (params: any) => getWorldMapTooltipHtml(params.name),
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
});

const getChinaMapOption = (data: any[]) => ({
  series: [
    {
      type: "map",
      map: "china",
      roam: true,
      zoom: 1.2,
      data,
      label: { show: true, fontSize: 10, color: "#fff" },
      itemStyle: commonItemStyle,
      emphasis: commonEmphasis,
    },
  ],
  tooltip: {
    ...commonTooltip,
    formatter: (params: any) => {
      const name = normalizeProvinceName(params.name);
      return getMapTooltipHtml(name);
    },
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
});

const getProvinceMapOption = (
  provinceName: string,
  mapName: string,
  data: any[],
) => ({
  series: [
    {
      type: "map",
      map: mapName,
      roam: true,
      zoom: 1.2,
      data,
      label: { show: true, fontSize: 10, color: "#fff" },
      itemStyle: commonItemStyle,
      emphasis: commonEmphasis,
    },
  ],
  tooltip: {
    ...commonTooltip,
    formatter: (params: any) => getCityTooltipHtml(provinceName, params.name),
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
});

const loadWorldMap = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  currentLevel.value = "world";
  selectedProvince.value = "";

  try {
    const response = await fetch("/maps/world.json");
    if (!response.ok)
      throw new Error(`Failed to fetch world map: ${response.status}`);
    const worldJson = await response.json();
    echarts.registerMap("world", worldJson);

    const countries = worldJson.features.map((f: any) => f.properties.name);
    const data = countries.map((name: string) => ({ name, value: 0 }));

    chart?.clear();
    chart?.setOption(getWorldMapOption(data) as any);
    setTimeout(() => chart?.resize(), 100);

    chart?.off("click");
    chart?.on("click", (params: any) => {
      if (params.seriesType !== "map") return;
      if (params.name === "中国") loadChinaMap();
    });
  } catch (err) {
    console.error("加载世界地图失败:", err);
  } finally {
    isLoading.value = false;
  }
};

const loadChinaMap = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  currentLevel.value = "china";
  selectedProvince.value = "";

  try {
    const response = await fetch("/maps/100000_full.json");
    if (!response.ok)
      throw new Error(`Failed to fetch china map: ${response.status}`);
    const chinaJson = await response.json();
    echarts.registerMap("china", chinaJson);

    const provinces = chinaJson.features.map((f: any) => f.properties.name);
    const data = provinces.map((name) => ({
      name,
      value: provinceBaseData[name]?.total || 0,
    }));

    chart?.clear();
    chart?.setOption(getChinaMapOption(data) as any);
    setTimeout(() => chart?.resize(), 100);

    chart?.off("click");
    chart?.on("click", (params: any) => {
      if (params.seriesType !== "map") return;
      const provinceName = normalizeProvinceName(params.name);
      if (provinceCodeMap[provinceName]) {
        loadProvinceMap(provinceName, provinceCodeMap[provinceName]);
      }
    });
  } catch (err) {
    console.error("加载中国地图失败:", err);
  } finally {
    isLoading.value = false;
  }
};

const loadProvinceMap = async (name: string, code: string) => {
  if (isLoading.value) return;
  isLoading.value = true;
  currentLevel.value = "province";
  selectedProvince.value = name;

  try {
    const response = await fetch(`/maps/${code}_full.json`);
    if (!response.ok)
      throw new Error(`Failed to fetch province map: ${response.status}`);
    const provinceJson = await response.json();
    echarts.registerMap(name, provinceJson);

    const cities = provinceJson.features.map((f: any) => f.properties.name);
    const data = cities.map((c) => ({
      name: c,
      value: Math.floor(Math.random() * 500) + 50,
    }));

    chart?.clear();
    chart?.setOption(getProvinceMapOption(name, name, data) as any);
    setTimeout(() => chart?.resize(), 100);
    chart?.off("click");
  } catch (err) {
    console.error(`加载${name}地图失败:`, err);
    loadChinaMap();
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (mapRef.value) {
    isVisible.value = true;
    setTimeout(() => {
      chart = echarts.init(mapRef.value);
      loadChinaMap();
    }, 50);
  }
  window.addEventListener("resize", () => chart?.resize());
});

onUnmounted(() => {
  chart?.dispose();
  window.removeEventListener("resize", () => chart?.resize());
});
</script>

<template>
  <div class="map-page">
    <PageHeader title="地图浏览" :show-back="true" @back="goBack">
      <template #right>
        <div class="header-controls">
          <button
            class="map-tab"
            :class="{ active: currentLevel === 'world' }"
            @click="loadWorldMap"
          >
            世界
          </button>
          <button
            class="map-tab"
            :class="{ active: currentLevel === 'china' }"
            @click="loadChinaMap"
          >
            中国
          </button>
          <el-select
            v-model="selectedProvince"
            placeholder="选择省份"
            size="small"
            class="province-select"
            popper-class="map-dropdown-popper"
            @change="handleProvinceChange"
          >
            <el-option label="全国" value="" />
            <el-option
              v-for="(code, name) in provinceCodeMap"
              :key="code"
              :label="name"
              :value="name"
            />
          </el-select>
          <div class="breadcrumb">
            <span
              v-if="currentLevel === 'world'"
              class="breadcrumb-item current"
              >世界</span
            >
            <template v-else>
              <span class="breadcrumb-item" @click="loadWorldMap">世界</span>
              <span class="breadcrumb-separator">/</span>
              <span
                v-if="currentLevel === 'china'"
                class="breadcrumb-item current"
                >中国</span
              >
              <template v-if="currentLevel === 'province'">
                <span class="breadcrumb-item" @click="loadChinaMap">中国</span>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-item current">{{
                  selectedProvince
                }}</span>
              </template>
            </template>
          </div>
        </div>
      </template>
    </PageHeader>

    <div
      ref="mapRef"
      class="map-chart"
      :class="{ 'map-visible': isVisible }"
    ></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <div class="map-info" :class="{ 'info-visible': isVisible }">
      <div class="info-card">
        <div class="info-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
        <div class="info-text">
          <p v-if="currentLevel === 'world'" class="info-desc">
            点击中国进入查看 · 滚轮缩放 · 拖拽移动
          </p>
          <p v-else class="info-desc">
            点击省份进入查看 · 滚轮缩放 · 拖拽移动 · 悬停查看人口数据
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0d1b2a 0%, #1b2838 100%);
  overflow: hidden;
}

.map-chart {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  opacity: 0;
  transition: opacity 0.8s ease 0.2s;
}

.map-chart.map-visible {
  opacity: 1;
}

.loading-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 27, 42, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
  color: #4facfe;
  font-size: 14px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(79, 172, 254, 0.2);
  border-top-color: #4facfe;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.map-info {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
}

.map-info.info-visible {
  opacity: 1;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(13, 27, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(79, 172, 254, 0.25);
  border-radius: 20px;
  padding: 10px 20px;
}

.info-icon {
  color: #4facfe;
  flex-shrink: 0;
}

.info-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  white-space: nowrap;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.map-tab {
  background: rgba(79, 172, 254, 0.08);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(79, 172, 254, 0.2);
  border-radius: 6px;
  padding: 4px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.map-tab:hover {
  color: #4facfe;
  border-color: rgba(79, 172, 254, 0.5);
  background: rgba(79, 172, 254, 0.12);
}

.map-tab.active {
  color: #fff;
  background: rgba(79, 172, 254, 0.25);
  border-color: #4facfe;
  font-weight: 600;
}

.province-select {
  width: 120px;
}

.province-select :deep(.el-select__wrapper) {
  background: rgba(13, 27, 42, 0.9) !important;
  border: 1px solid rgba(79, 172, 254, 0.3) !important;
  box-shadow: none !important;
}

.province-select :deep(.el-select__wrapper.is-focused) {
  border-color: #4facfe !important;
  box-shadow: 0 0 0 1px rgba(79, 172, 254, 0.3) inset !important;
}

.province-select :deep(.el-select__selected-item) {
  color: #ffffff !important;
}

.province-select :deep(.el-select__placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

.province-select :deep(.el-select__caret) {
  color: #4facfe !important;
}

.province-select :deep(.el-input__wrapper) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.province-select :deep(.el-input__inner) {
  color: #ffffff !important;
  background: transparent !important;
}

.province-select :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

.province-select :deep(.el-input__suffix) {
  color: #4facfe !important;
}

.province-select :deep(.el-input__suffix-inner) {
  color: #4facfe !important;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #4facfe;
}

.breadcrumb-item.current {
  color: #4facfe;
  cursor: default;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 900px) {
  .map-chart {
    position: relative;
    top: 0;
    height: 50vh;
  }
}
</style>

<style>
.map-dropdown-popper {
  background: #0d1b2a !important;
  border: 1px solid rgba(79, 172, 254, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}

.map-dropdown-popper .el-select-dropdown__item {
  color: rgba(255, 255, 255, 0.8) !important;
  background: transparent !important;
}

.map-dropdown-popper .el-select-dropdown__item:hover {
  background: rgba(79, 172, 254, 0.15) !important;
  color: #ffffff !important;
}

.map-dropdown-popper .el-select-dropdown__item.is-selected {
  color: #4facfe !important;
  background: rgba(79, 172, 254, 0.1) !important;
  font-weight: 500;
}

.map-dropdown-popper .el-select-dropdown__item.is-hovering {
  background: rgba(79, 172, 254, 0.15) !important;
}

.map-dropdown-popper .el-scrollbar__bar {
  background: rgba(79, 172, 254, 0.1);
}

.map-dropdown-popper .el-scrollbar__thumb {
  background: rgba(79, 172, 254, 0.4);
}

.map-dropdown-popper .el-select-dropdown__list {
  padding: 4px 0;
}
</style>
