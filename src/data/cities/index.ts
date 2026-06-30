import { 北京Cities } from "./北京";
import { 天津Cities } from "./天津";
import { 河北Cities } from "./河北";
import { 山西Cities } from "./山西";
import { 内蒙古Cities } from "./内蒙古";
import { 辽宁Cities } from "./辽宁";
import { 吉林Cities } from "./吉林";
import { 黑龙江Cities } from "./黑龙江";
import { 上海Cities } from "./上海";
import { 江苏Cities } from "./江苏";
import { 浙江Cities } from "./浙江";
import { 安徽Cities } from "./安徽";
import { 福建Cities } from "./福建";
import { 江西Cities } from "./江西";
import { 山东Cities } from "./山东";
import { 河南Cities } from "./河南";
import { 湖北Cities } from "./湖北";
import { 湖南Cities } from "./湖南";
import { 广东Cities } from "./广东";
import { 广西Cities } from "./广西";
import { 海南Cities } from "./海南";
import { 重庆Cities } from "./重庆";
import { 四川Cities } from "./四川";
import { 贵州Cities } from "./贵州";
import { 云南Cities } from "./云南";
import { 西藏Cities } from "./西藏";
import { 陕西Cities } from "./陕西";
import { 甘肃Cities } from "./甘肃";
import { 青海Cities } from "./青海";
import { 宁夏Cities } from "./宁夏";
import { 新疆Cities } from "./新疆";

export type { CityYearlyData, CityData } from "./types";

export const cityDataMap: Record<string, import("./types").CityData> = {
  ...北京Cities,
  ...天津Cities,
  ...河北Cities,
  ...山西Cities,
  ...内蒙古Cities,
  ...辽宁Cities,
  ...吉林Cities,
  ...黑龙江Cities,
  ...上海Cities,
  ...江苏Cities,
  ...浙江Cities,
  ...安徽Cities,
  ...福建Cities,
  ...江西Cities,
  ...山东Cities,
  ...河南Cities,
  ...湖北Cities,
  ...湖南Cities,
  ...广东Cities,
  ...广西Cities,
  ...海南Cities,
  ...重庆Cities,
  ...四川Cities,
  ...贵州Cities,
  ...云南Cities,
  ...西藏Cities,
  ...陕西Cities,
  ...甘肃Cities,
  ...青海Cities,
  ...宁夏Cities,
  ...新疆Cities,
};

export const getCityData = (cityName: string) => cityDataMap[cityName];

export const getCityHistory = (cityName: string) => cityDataMap[cityName]?.history || [];

export const hasCityData = (cityName: string) => !!cityDataMap[cityName];
