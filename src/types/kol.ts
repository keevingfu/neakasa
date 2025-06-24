// KOL (Key Opinion Leader) type definitions
export interface KOL {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  category: string;
  platforms: PlatformAccount[];
  totalFollowers: number;
  avgEngagementRate: number;
  totalVideos: number;
  totalViews: number;
  joinedDate: string;
  lastActiveDate: string;
  status: 'active' | 'inactive' | 'pending';
  tags: string[];
  performanceScore: number; // 0-100
  monthlyReach: number;
  audienceDemographics: {
    gender: { male: number; female: number; other: number };
    ageGroups: { [key: string]: number };
    topCountries: { country: string; percentage: number }[];
  };
}

export interface PlatformAccount {
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'facebook';
  username: string;
  followers: number;
  followersGrowth: number; // percentage change over last 30 days
  avgViews: number;
  avgEngagement: number;
  verified: boolean;
  url: string;
}

export interface KOLFilter {
  search: string;
  categories: string[];
  platforms: string[];
  minFollowers: number;
  maxFollowers: number;
  minEngagement: number;
  maxEngagement: number;
  status: ('active' | 'inactive' | 'pending')[];
  tags: string[];
}

export interface KOLMetrics {
  totalKOLs: number;
  activeKOLs: number;
  totalReach: number;
  avgEngagementRate: number;
  topCategories: { category: string; count: number }[];
  platformDistribution: { platform: string; count: number }[];
}
