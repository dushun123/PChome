import { createApp, h } from "vue";
import MapTooltip from "@/components/MapTooltip.vue";
import CityTooltip from "@/components/CityTooltip.vue";
import { provinceBaseData, getYearlyData } from "@/data/provinceData";
import { getCityData, hasCityData } from "@/data/cities";
import { cityFeatureData } from "@/data/cityFeatureData";

const htmlCache = new Map<string, string>();

/**
 * 生成省份 Tooltip HTML
 */
export function getMapTooltipHtml(name: string): string {
  const cacheKey = `province:${name}`;
  if (htmlCache.has(cacheKey)) {
    return htmlCache.get(cacheKey)!;
  }

  const popData = provinceBaseData[name];
  const yearData = getYearlyData(name);
  const last5Years = yearData.slice(-5).reverse();

  const html = renderVueToHtml(
    h(MapTooltip, {
      name,
      popData: popData || undefined,
      last5Years,
    }),
  );

  htmlCache.set(cacheKey, html);
  return html;
}

/**
 * 生成城市 Tooltip HTML
 */
export function getCityTooltipHtml(
  provinceName: string,
  cityName: string,
): string {
  const cacheKey = `city:${provinceName}:${cityName}`;
  if (htmlCache.has(cacheKey)) {
    return htmlCache.get(cacheKey)!;
  }

  const cityData = getCityData(cityName);
  const feature = cityFeatureData[cityName];

  if (!cityData && !feature) {
    return `<div style="padding: 10px; min-width: 160px;">
      <div style="font-size: 14px; font-weight: bold; color: #4facfe; margin-bottom: 6px;">${cityName}</div>
      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">暂无详细数据</div>
    </div>`;
  }

  const html = renderVueToHtml(
    h(CityTooltip, {
      name: cityData?.name || cityName,
      province: cityData?.province || provinceName,
      history: cityData?.history || [],
      feature: feature || undefined,
    }),
  );

  htmlCache.set(cacheKey, html);
  return html;
}

/**
 * 判断城市是否有真实数据
 */
export function hasCityRealData(cityName: string): boolean {
  return hasCityData(cityName);
}

/**
 * 将 Vue 组件渲染为 HTML 字符串
 */
function renderVueToHtml(vnode: any): string {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.pointerEvents = "none";
  container.style.zIndex = "-1";
  document.body.appendChild(container);

  const app = createApp({ render: () => vnode });
  app.mount(container);

  const html = container.innerHTML;

  app.unmount();
  document.body.removeChild(container);

  return html;
}
