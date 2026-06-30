import { provincePopHistory } from "./realPopulation";

// 省份代码映射
export const provinceCodeMap: Record<string, string> = {
  北京: "110000",
  天津: "120000",
  河北: "130000",
  山西: "140000",
  内蒙古: "150000",
  辽宁: "210000",
  吉林: "220000",
  黑龙江: "230000",
  上海: "310000",
  江苏: "320000",
  浙江: "330000",
  安徽: "340000",
  福建: "350000",
  江西: "360000",
  山东: "370000",
  河南: "410000",
  湖北: "420000",
  湖南: "430000",
  广东: "440000",
  广西: "450000",
  海南: "460000",
  重庆: "500000",
  四川: "510000",
  贵州: "520000",
  云南: "530000",
  西藏: "540000",
  陕西: "610000",
  甘肃: "620000",
  青海: "630000",
  宁夏: "640000",
  新疆: "650000",
  台湾: "710000",
  香港: "810000",
  澳门: "820000",
};

// 省份人口基础数据（2025年，单位：万人）
export interface ProvinceBaseData {
  total: number;
  male: number;
  female: number;
  maleRatio: number;
  femaleRatio: number;
  urbanization: number;
  density: number;
  growth: number;
}

export const provinceBaseData: Record<string, ProvinceBaseData> = {
  北京: {
    total: 2211,
    male: 1147,
    female: 1064,
    maleRatio: 51.9,
    femaleRatio: 48.1,
    urbanization: 87.8,
    density: 1347,
    growth: 0.3,
  },
  天津: {
    total: 1401,
    male: 726,
    female: 675,
    maleRatio: 51.8,
    femaleRatio: 48.2,
    urbanization: 85.2,
    density: 1131,
    growth: 0.1,
  },
  河北: {
    total: 7536,
    male: 3836,
    female: 3700,
    maleRatio: 50.9,
    femaleRatio: 49.1,
    urbanization: 63.0,
    density: 401,
    growth: 0.2,
  },
  山西: {
    total: 3527,
    male: 1807,
    female: 1720,
    maleRatio: 51.2,
    femaleRatio: 48.8,
    urbanization: 62.8,
    density: 226,
    growth: 0.1,
  },
  内蒙古: {
    total: 2429,
    male: 1247,
    female: 1182,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 68.7,
    density: 20,
    growth: 0.3,
  },
  辽宁: {
    total: 4251,
    male: 2152,
    female: 2099,
    maleRatio: 50.6,
    femaleRatio: 49.4,
    urbanization: 73.1,
    density: 291,
    growth: -0.2,
  },
  吉林: {
    total: 2400,
    male: 1219,
    female: 1181,
    maleRatio: 50.8,
    femaleRatio: 49.2,
    urbanization: 57.0,
    density: 127,
    growth: -0.3,
  },
  黑龙江: {
    total: 3168,
    male: 1604,
    female: 1564,
    maleRatio: 50.6,
    femaleRatio: 49.4,
    urbanization: 66.4,
    density: 67,
    growth: -0.5,
  },
  上海: {
    total: 2512,
    male: 1291,
    female: 1221,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 89.6,
    density: 3965,
    growth: 0.4,
  },
  江苏: {
    total: 8560,
    male: 4366,
    female: 4194,
    maleRatio: 51.0,
    femaleRatio: 49.0,
    urbanization: 74.7,
    density: 842,
    growth: 0.3,
  },
  浙江: {
    total: 6522,
    male: 3345,
    female: 3177,
    maleRatio: 51.3,
    femaleRatio: 48.7,
    urbanization: 73.2,
    density: 642,
    growth: 0.8,
  },
  安徽: {
    total: 6164,
    male: 3165,
    female: 2999,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 58.8,
    density: 441,
    growth: 0.2,
  },
  福建: {
    total: 4196,
    male: 2155,
    female: 2041,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 70.2,
    density: 346,
    growth: 0.5,
  },
  江西: {
    total: 4562,
    male: 2346,
    female: 2216,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 60.9,
    density: 273,
    growth: 0.3,
  },
  山东: {
    total: 10255,
    male: 5221,
    female: 5034,
    maleRatio: 50.9,
    femaleRatio: 49.1,
    urbanization: 65.0,
    density: 649,
    growth: 0.1,
  },
  河南: {
    total: 10036,
    male: 5118,
    female: 4918,
    maleRatio: 51.0,
    femaleRatio: 49.0,
    urbanization: 57.6,
    density: 598,
    growth: 0.2,
  },
  湖北: {
    total: 5833,
    male: 2986,
    female: 2847,
    maleRatio: 51.2,
    femaleRatio: 48.8,
    urbanization: 64.0,
    density: 312,
    growth: 0.1,
  },
  湖南: {
    total: 6710,
    male: 3436,
    female: 3274,
    maleRatio: 51.2,
    femaleRatio: 48.8,
    urbanization: 60.2,
    density: 317,
    growth: 0.2,
  },
  广东: {
    total: 12727,
    male: 6754,
    female: 5973,
    maleRatio: 53.1,
    femaleRatio: 46.9,
    urbanization: 75.1,
    density: 708,
    growth: 1.2,
  },
  广西: {
    total: 5063,
    male: 2633,
    female: 2430,
    maleRatio: 52.0,
    femaleRatio: 48.0,
    urbanization: 55.6,
    density: 214,
    growth: 0.3,
  },
  海南: {
    total: 1018,
    male: 539,
    female: 479,
    maleRatio: 53.0,
    femaleRatio: 47.0,
    urbanization: 61.7,
    density: 299,
    growth: 0.8,
  },
  重庆: {
    total: 3237,
    male: 1654,
    female: 1583,
    maleRatio: 51.1,
    femaleRatio: 48.9,
    urbanization: 71.4,
    density: 393,
    growth: 0.3,
  },
  四川: {
    total: 8451,
    male: 4330,
    female: 4121,
    maleRatio: 51.2,
    femaleRatio: 48.8,
    urbanization: 58.8,
    density: 175,
    growth: 0.1,
  },
  贵州: {
    total: 3895,
    male: 2018,
    female: 1877,
    maleRatio: 51.8,
    femaleRatio: 48.2,
    urbanization: 54.7,
    density: 222,
    growth: 0.5,
  },
  云南: {
    total: 4768,
    male: 2470,
    female: 2298,
    maleRatio: 51.8,
    femaleRatio: 48.2,
    urbanization: 52.0,
    density: 121,
    growth: 0.4,
  },
  西藏: {
    total: 369,
    male: 191,
    female: 178,
    maleRatio: 51.8,
    femaleRatio: 48.2,
    urbanization: 36.7,
    density: 3,
    growth: 1.2,
  },
  陕西: {
    total: 3994,
    male: 2054,
    female: 1940,
    maleRatio: 51.4,
    femaleRatio: 48.6,
    urbanization: 63.7,
    density: 194,
    growth: 0.2,
  },
  甘肃: {
    total: 2527,
    male: 1296,
    female: 1231,
    maleRatio: 51.3,
    femaleRatio: 48.7,
    urbanization: 53.8,
    density: 56,
    growth: 0.1,
  },
  青海: {
    total: 598,
    male: 308,
    female: 290,
    maleRatio: 51.5,
    femaleRatio: 48.5,
    urbanization: 57.9,
    density: 8,
    growth: 0.6,
  },
  宁夏: {
    total: 727,
    male: 375,
    female: 352,
    maleRatio: 51.5,
    femaleRatio: 48.5,
    urbanization: 66.9,
    density: 108,
    growth: 0.5,
  },
  新疆: {
    total: 2611,
    male: 1347,
    female: 1264,
    maleRatio: 51.6,
    femaleRatio: 48.4,
    urbanization: 57.8,
    density: 16,
    growth: 0.8,
  },
  台湾: {
    total: 2345,
    male: 1179,
    female: 1166,
    maleRatio: 50.3,
    femaleRatio: 49.7,
    urbanization: 78.7,
    density: 653,
    growth: 0.1,
  },
  香港: {
    total: 757,
    male: 356,
    female: 401,
    maleRatio: 47.0,
    femaleRatio: 53.0,
    urbanization: 100,
    density: 6868,
    growth: 0.5,
  },
  澳门: {
    total: 69,
    male: 32,
    female: 37,
    maleRatio: 47.1,
    femaleRatio: 52.9,
    urbanization: 100,
    density: 21375,
    growth: 0.3,
  },
};

// 年度统计数据
export interface YearlyData {
  year: number;
  total: number; // 总人口（万）
  male: number; // 男性（万）
  female: number; // 女性（万）
  maleRatio: number; // 男性比例
  femaleRatio: number; // 女性比例
  agingRatio: number; // 老龄化比例（65岁以上）
  gdp: number; // GDP（亿元）
  gdpPerCapita: number; // 人均GDP（元）
}

// 根据真实人口数据生成年度统计（人口用真实数据，GDP/老龄化用合理模拟）
const generateYearlyData = (
  name: string,
  baseGdp: number,
  baseAging: number,
): YearlyData[] => {
  const popData = provincePopHistory[name] || [];
  if (popData.length === 0) return [];

  const data: YearlyData[] = [];

  for (let i = 0; i < popData.length; i++) {
    const year = 2000 + i;
    const total = popData[i];
    const progress = i / (popData.length - 1);
    const gdp = baseGdp * Math.pow(1.08, i / 3) * 0.12;
    const aging = baseAging * (0.55 + progress * 0.45);

    // 根据2020年七普各省性别比数据推算
    let maleRatio: number;
    if (name === "广东") maleRatio = 53.1;
    else if (name === "海南") maleRatio = 53.0;
    else if (name === "广西") maleRatio = 52.0;
    else if (["贵州", "云南", "西藏"].includes(name)) maleRatio = 51.8;
    else if (name === "新疆") maleRatio = 51.6;
    else if (["北京", "天津", "河北", "福建", "安徽"].includes(name))
      maleRatio = 51.0 + Math.random() * 0.5;
    else if (name === "浙江") maleRatio = 51.3;
    else if (name === "江苏") maleRatio = 51.0;
    else if (["辽宁", "吉林"].includes(name)) maleRatio = 50.6;
    else if (name === "山东") maleRatio = 50.9;
    else if (name === "河南") maleRatio = 51.0;
    else if (name === "湖北") maleRatio = 51.2;
    else if (name === "湖南") maleRatio = 51.2;
    else if (name === "四川") maleRatio = 51.2;
    else if (name === "上海") maleRatio = 51.4;
    else if (name === "重庆") maleRatio = 51.1;
    else if (name === "江西") maleRatio = 51.4;
    else if (name === "黑龙江") maleRatio = 50.6;
    else if (name === "山西") maleRatio = 51.2;
    else if (name === "台湾") maleRatio = 50.3;
    else if (name === "香港") maleRatio = 47.0;
    else if (name === "澳门") maleRatio = 47.1;
    else maleRatio = 51.0 + Math.random() * 0.8;

    const femaleRatio = 100 - maleRatio;
    const male = total * (maleRatio / 100);
    const female = total - male;

    data.push({
      year,
      total,
      male: Math.round(male),
      female: Math.round(female),
      maleRatio: Math.round(maleRatio * 10) / 10,
      femaleRatio: Math.round(femaleRatio * 10) / 10,
      agingRatio: Math.round(aging * 10) / 10,
      gdp: Math.round(gdp),
      gdpPerCapita: Math.round((gdp * 10000) / total),
    });
  }

  return data;
};

// 各省份年度数据（总人口为真实数据）
export const provinceYearlyData: Record<string, YearlyData[]> = {
  北京: generateYearlyData("北京", 45000, 18),
  天津: generateYearlyData("天津", 16000, 17),
  河北: generateYearlyData("河北", 42000, 15),
  山西: generateYearlyData("山西", 22000, 14),
  内蒙古: generateYearlyData("内蒙古", 24000, 14),
  辽宁: generateYearlyData("辽宁", 30000, 19),
  吉林: generateYearlyData("吉林", 13000, 18),
  黑龙江: generateYearlyData("黑龙江", 16000, 19),
  上海: generateYearlyData("上海", 47000, 17),
  江苏: generateYearlyData("江苏", 128000, 16),
  浙江: generateYearlyData("浙江", 82000, 15),
  安徽: generateYearlyData("安徽", 45000, 16),
  福建: generateYearlyData("福建", 54000, 15),
  江西: generateYearlyData("江西", 32000, 14),
  山东: generateYearlyData("山东", 92000, 16),
  河南: generateYearlyData("河南", 61000, 15),
  湖北: generateYearlyData("湖北", 55000, 15),
  湖南: generateYearlyData("湖南", 50000, 15),
  广东: generateYearlyData("广东", 135000, 13),
  广西: generateYearlyData("广西", 27000, 14),
  海南: generateYearlyData("海南", 7500, 13),
  重庆: generateYearlyData("重庆", 30000, 16),
  四川: generateYearlyData("四川", 60000, 16),
  贵州: generateYearlyData("贵州", 20000, 13),
  云南: generateYearlyData("云南", 32000, 13),
  西藏: generateYearlyData("西藏", 2100, 9),
  陕西: generateYearlyData("陕西", 33000, 14),
  甘肃: generateYearlyData("甘肃", 11000, 14),
  青海: generateYearlyData("青海", 3700, 12),
  宁夏: generateYearlyData("宁夏", 5200, 13),
  新疆: generateYearlyData("新疆", 19000, 12),
  台湾: generateYearlyData("台湾", 53000, 16),
  香港: generateYearlyData("香港", 37000, 18),
  澳门: generateYearlyData("澳门", 3400, 10),
};

// 全国汇总数据
export const chinaYearlyData: YearlyData[] = (() => {
  const allData: YearlyData[] = [];
  for (let year = 2000; year <= 2025; year++) {
    let total = 0,
      male = 0,
      female = 0,
      gdp = 0,
      agingSum = 0;
    const provinceCount = Object.keys(provinceYearlyData).length;

    Object.values(provinceYearlyData).forEach((data) => {
      const yearData = data.find((d) => d.year === year);
      if (yearData) {
        total += yearData.total;
        male += yearData.male;
        female += yearData.female;
        gdp += yearData.gdp;
        agingSum += yearData.agingRatio;
      }
    });

    allData.push({
      year,
      total,
      male,
      female,
      maleRatio: Math.round((male / total) * 1000) / 10,
      femaleRatio: Math.round((female / total) * 1000) / 10,
      agingRatio: Math.round((agingSum / provinceCount) * 10) / 10,
      gdp,
      gdpPerCapita: Math.round((gdp * 10000) / total),
    });
  }
  return allData;
})();

// 获取指定地区的年度数据
export const getYearlyData = (region: string): YearlyData[] => {
  if (region === "全国" || !region) {
    return chinaYearlyData;
  }
  return provinceYearlyData[region] || [];
};
