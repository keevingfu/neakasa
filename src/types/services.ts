// Service response type definitions

// Performance Data Types
export interface PerformanceData {
  totalReach: number;
  avgEngagement: number;
  totalConversions: number;
  trends: {
    reach: TrendDataPoint[];
    engagement: TrendDataPoint[];
    conversions?: TrendDataPoint[];
  };
}

export interface TrendDataPoint {
  month: string;
  value: number;
  date?: string;
}

// Category and Product Data
export interface CategoryData {
  category: string;
  reach: number;
  engagement: number;
  revenue: number;
  growth?: number;
}

export interface ProductData {
  product: string;
  views: number;
  engagement: number;
  conversions: number;
  revenue?: number;
}

// Content Analysis Types
export interface ContentAnalysisData {
  topSceneTags: SceneTagData[];
  contentTypes: ContentTypeData[];
  hashtagPerformance?: HashtagData[];
}

export interface SceneTagData {
  tag: string;
  avgViews: number;
  count: number;
  engagement?: number;
}

export interface ContentTypeData {
  type: string;
  count: number;
  avgEngagement: number;
  avgViews?: number;
}

export interface HashtagData {
  hashtag: string;
  usage: number;
  avgEngagement: number;
  reach: number;
}

// Video Metrics Types
export interface VideoMetricsData {
  topVideos: VideoData[];
  totalVideos: number;
  avgViews: number;
  totalViews?: number;
}

export interface VideoData {
  id: string;
  title: string;
  views: number;
  engagement: number;
  platform: string;
  thumbnail?: string;
  url?: string;
  creator?: string;
}

// Brand Performance Types
export interface BrandData {
  brand: string;
  total_views: number;
  avg_engagement_rate: number;
  total_revenue?: number;
  market_share?: number;
}

// Conversion Funnel Types
export interface ConversionFunnelData {
  stage: string;
  value: number;
  rate: number;
  dropoff?: number;
}

// Campaign Data Types
export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  roi: number;
}