// Chart-related type definitions

// ECharts Types
export interface EChartsFormatterParams {
  value: number | string | Array<number | string>;
  dataIndex: number;
  name: string;
  data: any;
  seriesName: string;
  seriesIndex: number;
  componentType: string;
  marker?: string;
  color?: string;
  percent?: number;
}

export interface EChartsColorParams {
  dataIndex: number;
  data: any;
  value: number | string;
}

// Recharts Types
export interface TooltipPayload {
  value: number | string;
  name: string;
  dataKey: string;
  color: string;
  payload: any;
  unit?: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Common Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  [key: string]: any;
}

export interface CategoryDataPoint {
  category: string;
  value: number;
  percentage?: number;
  [key: string]: any;
}

// Funnel Chart Types
export interface FunnelDataItem {
  name: string;
  value: number;
  rate?: number;
}

// Pie Chart Types
export interface PieDataItem {
  name: string;
  value: number;
  percentage?: number;
  color?: string;
}