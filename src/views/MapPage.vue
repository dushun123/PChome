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

const router = useRouter();
const mapRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

// 标准化省份名称（处理 "新疆维吾尔自治区" → "新疆" 等）
const normalizeProvinceName = (name: string): string => {
  // 如果直接匹配，直接返回
  if (provinceCodeMap[name] || provinceBaseData[name]) return name;

  // 依次尝试去掉各种后缀
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

const currentLevel = ref<"china" | "province">("china");
const selectedProvince = ref("");
const isVisible = ref(false);
const isLoading = ref(false);

const goBack = () => {
  if (currentLevel.value === "province") {
    loadChinaMap();
  } else {
    router.push("/");
  }
};

const handleProvinceChange = (value: string) => {
  // 延迟执行地图加载，避免阻塞下拉框关闭动画
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

// 全国地图配置（省份级别 tooltip）
const getChinaMapOption = (data: any[]) => ({
  series: [
    {
      type: "map",
      map: "china",
      roam: true,
      zoom: 1.2,
      data,
      label: {
        show: true,
        fontSize: 10,
        color: "#fff",
      },
      itemStyle: {
        areaColor: {
          type: "linear",
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
      },
      emphasis: {
        label: { show: true, fontSize: 14, color: "#fff" },
        itemStyle: {
          areaColor: {
            type: "linear",
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
      },
    },
  ],
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0, 21, 41, 0.95)",
    borderColor: "#4facfe",
    borderWidth: 1,
    textStyle: { color: "#fff" },
    formatter: (params: any) => {
      const name = normalizeProvinceName(params.name);
      return getMapTooltipHtml(name);
    },
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
});

// 省份地图配置（城市级别 tooltip，有真实数据的城市展示详细数据）
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
      itemStyle: {
        areaColor: {
          type: "linear",
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
      },
      emphasis: {
        label: { show: true, fontSize: 14, color: "#fff" },
        itemStyle: {
          areaColor: {
            type: "linear",
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
      },
    },
  ],
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0, 21, 41, 0.95)",
    borderColor: "#4facfe",
    borderWidth: 1,
    textStyle: { color: "#fff" },
    formatter: (params: any) => {
      return getCityTooltipHtml(provinceName, params.name);
    },
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
});

const loadChinaMap = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  currentLevel.value = "china";
  selectedProvince.value = "";

  try {
    const response = await fetch(
      "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    );
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

      // 处理省份名称
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

  // 注意：currentProvince 应该在调用此函数前已设置
  currentLevel.value = "province";
  selectedProvince.value = name;

  try {
    const response = await fetch(
      `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch province map: ${response.status}`);
    }
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
    // 加载失败时回到全国视图
    loadChinaMap();
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (mapRef.value) {
    // 先显示容器，确保有正确的尺寸
    isVisible.value = true;

    // 等待 DOM 更新后再初始化图表
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
            <span class="breadcrumb-item" @click="loadChinaMap">全国</span>
            <span v-if="selectedProvince" class="breadcrumb-separator">/</span>
            <span v-if="selectedProvince" class="breadcrumb-item current">{{
              selectedProvince
            }}</span>
          </div>
        </div>
      </template>
    </PageHeader>

    <!-- 全屏地图 -->
    <div ref="mapRef" class="map-chart" :class="{ 'map-visible': isVisible }">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
    </div>

    <!-- 底部提示 -->
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
          <p class="info-desc">
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

/* 全屏地图 */
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
  position: absolute;
  top: 0;
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

/* 悬浮数据面板 */
.floating-panel {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 480px;
  max-height: calc(100vh - 100px);
  background: rgba(13, 27, 42, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(79, 172, 254, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 16px;
  z-index: 100;
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
}

.floating-panel.panel-visible {
  opacity: 1;
  transform: translateX(0);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(79, 172, 254, 0.2);
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.panel-badge {
  font-size: 10px;
  color: #4facfe;
  background: rgba(79, 172, 254, 0.12);
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid rgba(79, 172, 254, 0.25);
}

.table-wrapper {
  border-radius: 6px;
  overflow: hidden;
}

.table-scroll {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}

.table-scroll::-webkit-scrollbar {
  width: 4px;
}

.table-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
}

.table-scroll::-webkit-scrollbar-thumb {
  background: rgba(79, 172, 254, 0.25);
  border-radius: 2px;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.simple-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.simple-table th {
  background: rgba(79, 172, 254, 0.15);
  color: #4facfe;
  font-weight: 600;
  padding: 8px 4px;
  text-align: right;
  border-bottom: 1px solid rgba(79, 172, 254, 0.2);
  white-space: nowrap;
}

.simple-table th:first-child {
  text-align: center;
}

.simple-table td {
  padding: 6px 4px;
  text-align: right;
  color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(79, 172, 254, 0.08);
}

.simple-table td:first-child {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
}

.simple-table tbody tr:hover {
  background: rgba(79, 172, 254, 0.08);
}

.cell-highlight {
  color: #00f2fe;
  font-weight: 600;
}
.cell-male {
  color: #67c23a;
}
.cell-female {
  color: #f56c6c;
}
.cell-aging {
  color: #e6a23c;
}
.cell-aging-high {
  color: #f56c6c;
  font-weight: 600;
}
.cell-gdp {
  color: #409eff;
}

.table-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.page-btn {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(79, 172, 254, 0.15);
  border-radius: 4px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
}

.page-btn:hover:not(:disabled) {
  color: #4facfe;
  border-color: #4facfe;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 底部提示 */
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

/* 下拉框 */
.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
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

/* 响应式 */
@media (max-width: 1200px) {
  .floating-panel {
    width: 420px;
    right: 12px;
  }
}

@media (max-width: 900px) {
  .floating-panel {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    max-height: 50vh;
    margin: 16px;
  }

  .map-chart {
    position: relative;
    top: 0;
    height: 50vh;
  }
}
</style>

<style>
/* 下拉框弹窗深色主题 */
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
