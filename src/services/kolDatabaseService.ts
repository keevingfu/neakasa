export interface KOLVideoData {
  kol_video_id: number;
  kol_title: string;
  kol_views: string;
  kol_likes: string;
  kol_comments: string;
  kol_video_url: string;
}

export interface VideoAnalysisData {
  id: number;
  video_id: number;
  general_name: string;
  product: string;
  brand: string;
  tags: string;
  scene_tags: string;
  scenes: string;
  shots: string;
  dialogues: string;
  environment: string;
  emotions: string;
  filter: string;
  classify: string;
}

// Mock database data based on the SQLite database analysis
class KOLDatabaseService {
  // Top performing KOLs based on database data
  private mockKOLData = [
    {
      id: '1',
      name: 'Tech Review Master',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      category: 'Technology',
      followers: 1250000,
      avgViews: 850000,
      engagement: 12.5,
      totalVideos: 45,
      platform: 'TikTok',
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Home Cleaning Guru',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=home',
      category: 'Home & Garden',
      followers: 890000,
      avgViews: 620000,
      engagement: 15.2,
      totalVideos: 38,
      platform: 'TikTok',
      status: 'active' as const
    },
    {
      id: '3',
      name: 'Beauty Influencer Pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beauty',
      category: 'Beauty',
      followers: 2100000,
      avgViews: 1500000,
      engagement: 18.9,
      totalVideos: 52,
      platform: 'TikTok',
      status: 'active' as const
    },
    {
      id: '4',
      name: 'Outdoor Adventure',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=outdoor',
      category: 'Outdoor',
      followers: 670000,
      avgViews: 450000,
      engagement: 9.8,
      totalVideos: 28,
      platform: 'TikTok',
      status: 'active' as const
    },
    {
      id: '5',
      name: 'Smart Home Expert',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smart',
      category: 'Smart Home',
      followers: 1450000,
      avgViews: 980000,
      engagement: 14.3,
      totalVideos: 41,
      platform: 'TikTok',
      status: 'active' as const
    }
  ];

  // Performance data based on video_analysis table
  private performanceData = {
    totalReach: 25800000,
    avgEngagement: 14.3,
    totalConversions: 8920,
    revenue: 1285000,
    trends: {
      reach: [
        { month: 'Jan', value: 3200000 },
        { month: 'Feb', value: 3500000 },
        { month: 'Mar', value: 3800000 },
        { month: 'Apr', value: 4100000 },
        { month: 'May', value: 4500000 },
        { month: 'Jun', value: 4800000 }
      ],
      engagement: [
        { month: 'Jan', value: 12.5 },
        { month: 'Feb', value: 13.2 },
        { month: 'Mar', value: 13.8 },
        { month: 'Apr', value: 14.1 },
        { month: 'May', value: 14.5 },
        { month: 'Jun', value: 14.8 }
      ]
    }
  };

  // Category performance based on video analysis
  private categoryPerformance = [
    { category: 'Technology', reach: 8500000, engagement: 15.2, revenue: 420000 },
    { category: 'Home & Garden', reach: 6200000, engagement: 16.8, revenue: 380000 },
    { category: 'Beauty', reach: 5800000, engagement: 18.5, revenue: 290000 },
    { category: 'Smart Home', reach: 3500000, engagement: 12.5, revenue: 150000 },
    { category: 'Outdoor', reach: 1800000, engagement: 9.8, revenue: 45000 }
  ];

  // Brand analysis from video_analysis table
  private brandAnalysis = {
    topBrands: [
      { brand: 'eufy', videos: 52, avgViews: 850000, engagement: 15.8 },
      { brand: 'Soundcore', videos: 38, avgViews: 720000, engagement: 14.2 },
      { brand: 'Tineco', videos: 28, avgViews: 680000, engagement: 13.5 },
      { brand: 'JBL', videos: 25, avgViews: 620000, engagement: 12.8 },
      { brand: 'Tarte', videos: 22, avgViews: 1200000, engagement: 19.2 }
    ],
    competitorAnalysis: {
      neakasa: { marketShare: 8.5, growth: 12.3 },
      eufy: { marketShare: 24.5, growth: 18.5 },
      tineco: { marketShare: 15.2, growth: 9.8 },
      others: { marketShare: 51.8, growth: 6.2 }
    }
  };

  // Content analysis from scenes and emotions data
  private contentAnalysis = {
    topSceneTags: [
      { tag: 'home_cleaning', count: 185, avgViews: 750000 },
      { tag: 'product_demo', count: 156, avgViews: 820000 },
      { tag: 'unboxing', count: 98, avgViews: 950000 },
      { tag: 'comparison', count: 76, avgViews: 1100000 },
      { tag: 'lifestyle', count: 65, avgViews: 680000 }
    ],
    emotionDistribution: {
      excited: 35,
      happy: 28,
      satisfied: 22,
      curious: 10,
      neutral: 5
    },
    contentTypes: {
      review: 45,
      tutorial: 28,
      unboxing: 15,
      comparison: 12
    }
  };

  // Video performance metrics
  private videoMetrics = {
    totalVideos: 790,
    analyzedVideos: 205,
    avgViews: 485000,
    avgLikes: 28500,
    avgComments: 1250,
    topVideos: [
      {
        id: 1,
        title: 'This Robot Vacuum Changed My Life! 🤖',
        views: 3500000,
        likes: 285000,
        comments: 8500,
        brand: 'eufy',
        kol: 'Home Cleaning Guru'
      },
      {
        id: 2,
        title: 'Unboxing the BEST Wireless Earbuds 2025',
        views: 2800000,
        likes: 195000,
        comments: 5200,
        brand: 'Soundcore',
        kol: 'Tech Review Master'
      },
      {
        id: 3,
        title: 'My Skincare Routine with Tarte ✨',
        views: 2500000,
        likes: 320000,
        comments: 12000,
        brand: 'Tarte',
        kol: 'Beauty Influencer Pro'
      }
    ]
  };

  async getKOLs() {
    // Simulate async API call
    return new Promise<typeof this.mockKOLData>((resolve) => {
      setTimeout(() => resolve(this.mockKOLData), 100);
    });
  }

  async getPerformanceData() {
    return new Promise<typeof this.performanceData>((resolve) => {
      setTimeout(() => resolve(this.performanceData), 100);
    });
  }

  async getCategoryPerformance() {
    return new Promise<typeof this.categoryPerformance>((resolve) => {
      setTimeout(() => resolve(this.categoryPerformance), 100);
    });
  }

  async getBrandAnalysis() {
    return new Promise<typeof this.brandAnalysis>((resolve) => {
      setTimeout(() => resolve(this.brandAnalysis), 100);
    });
  }

  async getContentAnalysis() {
    return new Promise<typeof this.contentAnalysis>((resolve) => {
      setTimeout(() => resolve(this.contentAnalysis), 100);
    });
  }

  async getVideoMetrics() {
    return new Promise<typeof this.videoMetrics>((resolve) => {
      setTimeout(() => resolve(this.videoMetrics), 100);
    });
  }

  // Conversion and revenue data
  async getConversionData() {
    return {
      conversionRate: 3.8,
      avgOrderValue: 145,
      totalRevenue: 1285000,
      roiMultiplier: 4.2,
      conversionFunnel: [
        { stage: 'Views', value: 25800000 },
        { stage: 'Clicks', value: 1850000 },
        { stage: 'Add to Cart', value: 125000 },
        { stage: 'Purchase', value: 8920 }
      ],
      revenueByCategory: [
        { category: 'Technology', revenue: 420000, roi: 5.2 },
        { category: 'Home & Garden', revenue: 380000, roi: 4.8 },
        { category: 'Beauty', revenue: 290000, roi: 3.5 },
        { category: 'Smart Home', revenue: 150000, roi: 3.2 },
        { category: 'Outdoor', revenue: 45000, roi: 2.1 }
      ],
      monthlyRevenue: [
        { month: 'Jan', revenue: 165000, conversions: 1120 },
        { month: 'Feb', revenue: 182000, conversions: 1250 },
        { month: 'Mar', revenue: 198000, conversions: 1380 },
        { month: 'Apr', revenue: 215000, conversions: 1480 },
        { month: 'May', revenue: 238000, conversions: 1620 },
        { month: 'Jun', revenue: 287000, conversions: 2070 }
      ]
    };
  }
}

export const kolDatabaseService = new KOLDatabaseService();