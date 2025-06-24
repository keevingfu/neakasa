// Semrush API type definitions

export interface RelatedKeyword {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: number;
}

export interface KeywordTrend {
  date: string;
  search_volume: number;
}

export interface Competitor {
  domain: string;
  competition_level: number;
  common_keywords: number;
  organic_keywords: number;
  organic_traffic: number;
}

export interface KeywordOverview {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: number;
  results: number;
  trend: string;
}
