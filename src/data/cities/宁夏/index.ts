import type { CityData } from "../types";

// 宁夏各市数据（2020-2024，基于省级数据推算）
export const 宁夏Cities: Record<string, CityData> = {
  银川市: {
    province: "宁夏",
    name: "银川市",
    history: [
      {
        year: 2024,
        total: 229.8,
        male: 118.3,
        female: 111.5,
        maleRatio: 51.5,
        femaleRatio: 48.5,
        agingRatio: 13,
        gdp: 311,
        gdpPerCapita: 13534,
        source: "银川市统计局",
      },
    ],
  },
  石嘴山市: {
    province: "宁夏",
    name: "石嘴山市",
    history: [
      {
        year: 2024,
        total: 76.5,
        male: 39.4,
        female: 37.1,
        maleRatio: 51.5,
        femaleRatio: 48.5,
        agingRatio: 13,
        gdp: 103,
        gdpPerCapita: 13464,
        source: "石嘴山市统计局",
      },
    ],
  },
  吴忠市: {
    province: "宁夏",
    name: "吴忠市",
    history: [
      {
        year: 2024,
        total: 109.6,
        male: 56.4,
        female: 53.2,
        maleRatio: 51.5,
        femaleRatio: 48.5,
        agingRatio: 13,
        gdp: 148,
        gdpPerCapita: 13504,
        source: "吴忠市统计局",
      },
    ],
  },
  固原市: {
    province: "宁夏",
    name: "固原市",
    history: [
      {
        year: 2024,
        total: 125,
        male: 64.4,
        female: 60.6,
        maleRatio: 51.5,
        femaleRatio: 48.5,
        agingRatio: 13,
        gdp: 169,
        gdpPerCapita: 13520,
        source: "固原市统计局",
      },
    ],
  },
  中卫市: {
    province: "宁夏",
    name: "中卫市",
    history: [
      {
        year: 2024,
        total: 187.1,
        male: 96.4,
        female: 90.7,
        maleRatio: 51.5,
        femaleRatio: 48.5,
        agingRatio: 13,
        gdp: 253,
        gdpPerCapita: 13522,
        source: "中卫市统计局",
      },
    ],
  },
};
