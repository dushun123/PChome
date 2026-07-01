export interface GoldPriceRecord {
  year: number;
  price: number;
  change: string | null;
  source: string;
}

export const goldPriceData: GoldPriceRecord[] = [
  { year: 1990, price: 96.0, change: null, source: "估算值" },
  { year: 1991, price: 71.45, change: "-25.57%", source: "估算值" },
  { year: 1992, price: 95.64, change: "+33.86%", source: "估算值" },
  { year: 1993, price: 88.0, change: "-7.99%", source: "估算值" },
  { year: 1994, price: 85.0, change: "-3.41%", source: "估算值" },
  { year: 1995, price: 82.0, change: "-3.53%", source: "估算值" },
  { year: 1996, price: 80.0, change: "-2.44%", source: "估算值" },
  { year: 1997, price: 75.0, change: "-6.25%", source: "估算值" },
  { year: 1998, price: 70.0, change: "-6.67%", source: "估算值" },
  { year: 1999, price: 68.0, change: "-2.86%", source: "估算值" },
  { year: 2000, price: 70.0, change: "+2.94%", source: "估算值" },
  { year: 2001, price: 98.0, change: "+40.00%", source: "估算值" },
  { year: 2002, price: 63.5, change: "-35.20%", source: "国内实际" },
  { year: 2003, price: 74.5, change: "+17.32%", source: "国内实际" },
  { year: 2004, price: 83.96, change: "+12.70%", source: "国内实际" },
  { year: 2005, price: 91.13, change: "+8.54%", source: "国内实际" },
  { year: 2006, price: 123.66, change: "+35.70%", source: "国内实际" },
  { year: 2007, price: 142.49, change: "+15.23%", source: "国内实际" },
  { year: 2008, price: 177.71, change: "+24.72%", source: "国内实际" },
  { year: 2009, price: 213.92, change: "+20.38%", source: "国内实际" },
  { year: 2010, price: 267.23, change: "+24.92%", source: "国内实际" },
  { year: 2011, price: 327.52, change: "+22.56%", source: "国内实际" },
  { year: 2012, price: 338.93, change: "+3.48%", source: "国内实际" },
  { year: 2013, price: 282.05, change: "-16.78%", source: "国内实际" },
  { year: 2014, price: 251.51, change: "-10.83%", source: "国内实际" },
  { year: 2015, price: 235.43, change: "-6.39%", source: "国内实际" },
  { year: 2016, price: 267.69, change: "+13.70%", source: "国内实际" },
  { year: 2017, price: 275.42, change: "+2.89%", source: "国内实际" },
  { year: 2018, price: 270.93, change: "-1.63%", source: "国内实际" },
  { year: 2019, price: 312.11, change: "+15.20%", source: "国内实际" },
  { year: 2020, price: 386.51, change: "+23.84%", source: "国内实际" },
  { year: 2021, price: 374.61, change: "-3.08%", source: "国内实际" },
  { year: 2022, price: 397.81, change: "+6.19%", source: "国内实际" },
  { year: 2023, price: 442.4, change: "+11.21%", source: "国际金价换算" },
  { year: 2024, price: 552.21, change: "+24.82%", source: "国际金价换算" },
  { year: 2025, price: 792.79, change: "+43.57%", source: "国际金价换算" },
  { year: 2026, price: 1073.37, change: "+35.39%", source: "1-4月平均" },
];
