// 地级市年度数据（最近5年：2020-2024）
// 人口相关字段单位为万人，GDP 单位为亿元，人均 GDP 单位为元
export interface CityYearlyData {
  year: number;
  total: number; // 总人口（万）
  male?: number; // 男性（万）
  female?: number; // 女性（万）
  maleRatio?: number; // 男性比例
  femaleRatio?: number; // 女性比例
  agingRatio?: number; // 老龄化比例（65岁以上）
  gdp?: number; // GDP（亿元）
  gdpPerCapita?: number; // 人均GDP（元）
  source?: string; // 数据来源说明
}

export interface CityData {
  province: string; // 所属省份
  name: string; // 城市名称
  history: CityYearlyData[]; // 最近5年数据
}
