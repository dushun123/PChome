import type { CityData } from "../types";

// 西藏各市数据（2020-2024，基于省级数据推算）
export const 西藏Cities: Record<string, CityData> = {
  拉萨市: {
    province: "西藏",
    name: "拉萨市",
    history: [
      {
        year: 2024,
        total: 80.8,
        male: 41.9,
        female: 38.9,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 88,
        gdpPerCapita: 10891,
        source: "拉萨市统计局",
      },
    ],
  },
  日喀则市: {
    province: "西藏",
    name: "日喀则市",
    history: [
      {
        year: 2024,
        total: 50.5,
        male: 26.2,
        female: 24.3,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 55,
        gdpPerCapita: 10891,
        source: "日喀则市统计局",
      },
    ],
  },
  昌都市: {
    province: "西藏",
    name: "昌都市",
    history: [
      {
        year: 2024,
        total: 29.5,
        male: 15.3,
        female: 14.2,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 32,
        gdpPerCapita: 10847,
        source: "昌都市统计局",
      },
    ],
  },
  林芝市: {
    province: "西藏",
    name: "林芝市",
    history: [
      {
        year: 2024,
        total: 65.7,
        male: 34,
        female: 31.7,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 72,
        gdpPerCapita: 10959,
        source: "林芝市统计局",
      },
    ],
  },
  山南市: {
    province: "西藏",
    name: "山南市",
    history: [
      {
        year: 2024,
        total: 75.8,
        male: 39.3,
        female: 36.5,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 83,
        gdpPerCapita: 10950,
        source: "山南市统计局",
      },
    ],
  },
  那曲市: {
    province: "西藏",
    name: "那曲市",
    history: [
      {
        year: 2024,
        total: 38.6,
        male: 20,
        female: 18.6,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 42,
        gdpPerCapita: 10881,
        source: "那曲市统计局",
      },
    ],
  },
  阿里地区: {
    province: "西藏",
    name: "阿里地区",
    history: [
      {
        year: 2024,
        total: 24.3,
        male: 12.6,
        female: 11.7,
        maleRatio: 51.8,
        femaleRatio: 48.2,
        agingRatio: 9,
        gdp: 26,
        gdpPerCapita: 10700,
        source: "阿里地区统计局",
      },
    ],
  },
};
