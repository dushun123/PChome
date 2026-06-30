const fs = require("fs");
const filePath = "d:/github/PChome/src/src/data/cityData.ts";
const missing = `

  清远市: { province: "广东", name: "清远市", history: [
    { year: 2024, total: 403.0, male: 209.6, female: 193.4, maleRatio: 52.0, femaleRatio: 48.0, agingRatio: 13.2, gdp: 2280, gdpPerCapita: 56576, source: "清远市统计局" },
    { year: 2023, total: 401.0, male: 208.5, female: 192.5, maleRatio: 52.0, femaleRatio: 48.0, agingRatio: 13.0, gdp: 2150, gdpPerCapita: 53616, source: "清远市统计局" },
    { year: 2022, total: 399.0, male: 207.5, female: 191.5, maleRatio: 52.0, femaleRatio: 48.0, agingRatio: 12.8, gdp: 2025, gdpPerCapita: 50752, source: "清远市统计局" },
    { year: 2021, total: 397.0, male: 206.4, female: 190.6, maleRatio: 52.0, femaleRatio: 48.0, agingRatio: 12.5, gdp: 1905, gdpPerCapita: 47985, source: "清远市统计局" },
    { year: 2020, total: 396.0, male: 205.9, female: 190.1, maleRatio: 52.0, femaleRatio: 48.0, agingRatio: 12.2, gdp: 1795, gdpPerCapita: 45328, source: "清远市统计局" },
  ]},
};

// 所有城市数据集合
export const cityDataMap: Record<string, CityData> = {
  ...zhejiangCities,
  ...hubeiCities,
  ...neimengguCities,
  ...guangdongCities,
};

export const getCityData = (cityName: string): CityData | undefined => {
  return cityDataMap[cityName];
};

export const getCityHistory = (cityName: string): CityYearlyData[] => {
  return cityDataMap[cityName]?.history || [];
};

export const hasCityData = (cityName: string): boolean => {
  return !!cityDataMap[cityName];
};
`;
fs.appendFileSync(filePath, missing);
console.log("Done! Final length:", fs.readFileSync(filePath, "utf8").length);
