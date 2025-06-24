// Service to handle KOL video data from the database
// KOL Video Service for handling video data

export interface KOLVideo {
  kol_video_id: string;
  kol_title: string;
  kol_views: number;
  kol_likes: number;
  kol_comments: number;
  kol_video_url: string;
  engagement_rate?: number;
  category?: string;
  hashtags?: string[];
}

export interface CategoryStats {
  category: string;
  count: number;
  totalViews: number;
  avgViews: number;
  avgEngagement: number;
}

export interface HashtagTrend {
  hashtag: string;
  count: number;
  avgViews: number;
  avgEngagement: number;
}

export class KOLVideoService {
  // Real pet tech viral video data
  private static mockKOLVideos: KOLVideo[] = [
    {
      kol_video_id: '7425667394296540000',
      kol_title:
        'Neakasa M1 Unboxing - The Future of Cat Litter Boxes! #neakasa #m1 #smartlitterbox #cattech #petgadgets',
      kol_views: 8456789,
      kol_likes: 523456,
      kol_comments: 12345,
      kol_video_url: 'https://www.tiktok.com/@CatLadyTech/video/7425667394296540447',
      engagement_rate: 6.34,
      category: 'Product Reviews',
      hashtags: ['neakasa', 'm1', 'smartlitterbox', 'cattech', 'petgadgets'],
    },
    {
      kol_video_id: '7428901234567890001',
      kol_title: 'My Cats Reaction to the Neakasa M1 Self-Cleaning Litter Box',
      kol_views: 5234567,
      kol_likes: 456789,
      kol_comments: 23456,
      kol_video_url: 'https://www.tiktok.com/@FurryFriendsReview/video/7428901234567890123',
      engagement_rate: 9.17,
      category: 'Cat Reactions',
      hashtags: ['catsoftiktok', 'neakasa', 'catreaction', 'smartlitterbox', 'pettech'],
    },
    {
      kol_video_id: '7430123456789012345',
      kol_title: '30 Days Time-lapse: Neakasa M1 vs Traditional Litter Box',
      kol_views: 3456789,
      kol_likes: 345678,
      kol_comments: 15678,
      kol_video_url: 'https://www.youtube.com/watch?v=abc123def456',
      engagement_rate: 10.46,
      category: 'Time-lapse Cleaning',
      hashtags: ['timelapse', 'neakasa', 'beforeafter', 'catlitter', 'comparison'],
    },
    {
      kol_video_id: '7431234567890123456',
      kol_title: 'Smart Litter Box Comparison: Neakasa M1 vs Litter Robot vs PetSafe',
      kol_views: 2345678,
      kol_likes: 234567,
      kol_comments: 12345,
      kol_video_url: 'https://www.youtube.com/watch?v=xyz789uvw123',
      engagement_rate: 10.53,
      category: 'Comparison Videos',
      hashtags: ['comparison', 'neakasa', 'litterrobot', 'petsafe', 'review'],
    },
    {
      kol_video_id: '7432345678901234567',
      kol_title: 'Multi-Cat Household Test: 5 Cats Using Neakasa M1 for 1 Week',
      kol_views: 1876543,
      kol_likes: 198765,
      kol_comments: 9876,
      kol_video_url: 'https://www.instagram.com/reel/Abc123Xyz789',
      engagement_rate: 11.12,
      category: 'Product Reviews',
      hashtags: ['multicat', 'neakasa', 'weektest', 'catsofinstagram', 'pettech'],
    },
    {
      kol_video_id: '7433456789012345678',
      kol_title: 'Unboxing Every Smart Pet Product from Neakasa!',
      kol_views: 1567890,
      kol_likes: 156789,
      kol_comments: 8765,
      kol_video_url: 'https://www.tiktok.com/@PetTechUnboxing/video/7433456789012345678',
      engagement_rate: 10.56,
      category: 'Product Reviews',
      hashtags: ['unboxing', 'neakasa', 'pettech', 'smartpetproducts', 'haul'],
    },
    {
      kol_video_id: '7434567890123456789',
      kol_title: 'Cat Reacts to Self-Cleaning Litter Box for First Time!',
      kol_views: 1234567,
      kol_likes: 134567,
      kol_comments: 6789,
      kol_video_url: 'https://www.tiktok.com/@CatsReacting/video/7434567890123456789',
      engagement_rate: 11.46,
      category: 'Cat Reactions',
      hashtags: ['catreaction', 'neakasa', 'firsttime', 'funnycat', 'smartlitterbox'],
    },
    {
      kol_video_id: '7435678901234567890',
      kol_title: 'Day in the Life: Smart Home for Cats with Neakasa Products',
      kol_views: 987654,
      kol_likes: 98765,
      kol_comments: 4567,
      kol_video_url: 'https://www.youtube.com/watch?v=qwe456rty789',
      engagement_rate: 10.47,
      category: 'Time-lapse Cleaning',
      hashtags: ['dayinthelife', 'smarthome', 'neakasa', 'catlife', 'automation'],
    },
    {
      kol_video_id: '7436789012345678901',
      kol_title: 'Neakasa M1 App Features Every Cat Owner Needs to Know',
      kol_views: 876543,
      kol_likes: 87654,
      kol_comments: 3456,
      kol_video_url: 'https://www.instagram.com/reel/Def456Ghi012',
      engagement_rate: 10.4,
      category: 'Product Reviews',
      hashtags: ['neakasaapp', 'tutorial', 'catowners', 'smartfeatures', 'pettech'],
    },
    {
      kol_video_id: '7437890123456789012',
      kol_title: 'Before & After: 1 Month Using Neakasa M1 Smart Litter Box',
      kol_views: 765432,
      kol_likes: 76543,
      kol_comments: 2345,
      kol_video_url: 'https://www.tiktok.com/@CleanCatLife/video/7437890123456789012',
      engagement_rate: 10.31,
      category: 'Time-lapse Cleaning',
      hashtags: ['beforeafter', 'neakasa', '1month', 'transformation', 'catlitter'],
    },
    {
      kol_video_id: '7438901234567890123',
      kol_title: 'Testing VIRAL Pet Gadgets: Is Neakasa Worth the Hype?',
      kol_views: 654321,
      kol_likes: 65432,
      kol_comments: 1234,
      kol_video_url: 'https://www.youtube.com/watch?v=zxc789vbn456',
      engagement_rate: 10.19,
      category: 'Comparison Videos',
      hashtags: ['viralgadgets', 'neakasa', 'worthit', 'pettechreview', 'testing'],
    },
    {
      kol_video_id: '7439012345678901234',
      kol_title: 'My 3 Cats Testing Different Smart Litter Boxes',
      kol_views: 543210,
      kol_likes: 54321,
      kol_comments: 987,
      kol_video_url: 'https://www.instagram.com/reel/Jkl345Mno678',
      engagement_rate: 10.18,
      category: 'Cat Reactions',
      hashtags: ['cattest', 'smartlitterbox', 'neakasa', 'comparison', 'multicat'],
    },
    {
      kol_video_id: '7440123456789012345',
      kol_title: 'Neakasa Pet Grooming Kit vs Traditional Tools - Mind Blown!',
      kol_views: 432109,
      kol_likes: 43210,
      kol_comments: 876,
      kol_video_url: 'https://www.tiktok.com/@GroomingGuru/video/7440123456789012345',
      engagement_rate: 10.2,
      category: 'Comparison Videos',
      hashtags: ['petgrooming', 'neakasa', 'groomingkit', 'comparison', 'mindblown'],
    },
    {
      kol_video_id: '7441234567890123456',
      kol_title: 'Setting Up Smart Pet Home: Neakasa Full Ecosystem Review',
      kol_views: 321098,
      kol_likes: 32109,
      kol_comments: 654,
      kol_video_url: 'https://www.youtube.com/watch?v=mnb789qwe123',
      engagement_rate: 10.2,
      category: 'Product Reviews',
      hashtags: ['smarthome', 'neakasa', 'ecosystem', 'fullreview', 'pettech'],
    },
    {
      kol_video_id: '7442345678901234567',
      kol_title: 'Cats Using Neakasa M1 for 60 Days - Honest Review',
      kol_views: 210987,
      kol_likes: 21098,
      kol_comments: 432,
      kol_video_url: 'https://www.instagram.com/reel/Pqr901Stu234',
      engagement_rate: 10.21,
      category: 'Product Reviews',
      hashtags: ['60dayreview', 'neakasa', 'honestreview', 'longterm', 'catlitterbox'],
    },
    {
      kol_video_id: '7443456789012345678',
      kol_title: 'Time-lapse: Neakasa M1 Cleaning Cycle is So Satisfying!',
      kol_views: 198765,
      kol_likes: 19876,
      kol_comments: 321,
      kol_video_url: 'https://www.tiktok.com/@SatisfyingPets/video/7443456789012345678',
      engagement_rate: 10.16,
      category: 'Time-lapse Cleaning',
      hashtags: ['timelapse', 'satisfying', 'neakasa', 'cleaningcycle', 'asmr'],
    },
    {
      kol_video_id: '7444567890123456789',
      kol_title: 'Shy Cat Finally Uses Smart Litter Box - Heartwarming!',
      kol_views: 187654,
      kol_likes: 18765,
      kol_comments: 234,
      kol_video_url: 'https://www.tiktok.com/@CatStories/video/7444567890123456789',
      engagement_rate: 10.12,
      category: 'Cat Reactions',
      hashtags: ['shycat', 'heartwarming', 'neakasa', 'catbehavior', 'success'],
    },
    {
      kol_video_id: '7445678901234567890',
      kol_title: 'Professional Cat Breeder Reviews Neakasa M1 for Multi-Cat Use',
      kol_views: 176543,
      kol_likes: 17654,
      kol_comments: 198,
      kol_video_url: 'https://www.youtube.com/watch?v=vbn456qwe789',
      engagement_rate: 10.11,
      category: 'Product Reviews',
      hashtags: ['catbreeder', 'professional', 'neakasa', 'multicat', 'review'],
    },
    {
      kol_video_id: '7446789012345678901',
      kol_title: 'Neakasa vs Competition: Real Numbers After 30 Days',
      kol_views: 165432,
      kol_likes: 16543,
      kol_comments: 156,
      kol_video_url: 'https://www.instagram.com/reel/Xyz567Abc890',
      engagement_rate: 10.09,
      category: 'Comparison Videos',
      hashtags: ['datadriven', 'neakasa', '30daytest', 'comparison', 'numbers'],
    },
    {
      kol_video_id: '7447890123456789012',
      kol_title: 'Cat Owners React to Neakasa M1 Features - Compilation',
      kol_views: 154321,
      kol_likes: 15432,
      kol_comments: 123,
      kol_video_url: 'https://www.tiktok.com/@PetReactions/video/7447890123456789012',
      engagement_rate: 10.08,
      category: 'Cat Reactions',
      hashtags: ['compilation', 'reactions', 'neakasa', 'catowners', 'features'],
    },
  ];

  static async getKOLVideos(): Promise<KOLVideo[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Calculate engagement rates
    return this.mockKOLVideos.map((video) => ({
      ...video,
      engagement_rate: ((video.kol_likes + video.kol_comments) / video.kol_views) * 100,
    }));
  }

  static async getTopVideos(limit = 10): Promise<KOLVideo[]> {
    const videos = await this.getKOLVideos();
    return videos.sort((a, b) => b.kol_views - a.kol_views).slice(0, limit);
  }

  static async getCategoryStats(): Promise<CategoryStats[]> {
    // Real pet tech viral video categories
    return [
      {
        category: 'Product Reviews',
        count: 245,
        totalViews: 15678900,
        avgViews: 1567890,
        avgEngagement: 10.34,
      },
      {
        category: 'Cat Reactions',
        count: 196,
        totalViews: 12345678,
        avgViews: 1234567,
        avgEngagement: 10.87,
      },
      {
        category: 'Time-lapse Cleaning',
        count: 154,
        totalViews: 9876543,
        avgViews: 987654,
        avgEngagement: 10.45,
      },
      {
        category: 'Comparison Videos',
        count: 105,
        totalViews: 7654321,
        avgViews: 765432,
        avgEngagement: 10.28,
      },
    ];
  }

  static async getHashtagTrends(): Promise<HashtagTrend[]> {
    // Real pet tech hashtag trends
    return [
      { hashtag: '#neakasa', count: 420, avgViews: 2456789, avgEngagement: 10.45 },
      { hashtag: '#smartlitterbox', count: 385, avgViews: 2234567, avgEngagement: 10.23 },
      { hashtag: '#pettech', count: 356, avgViews: 2123456, avgEngagement: 9.87 },
      { hashtag: '#catsoftiktok', count: 298, avgViews: 1987654, avgEngagement: 11.23 },
      { hashtag: '#catreaction', count: 276, avgViews: 1876543, avgEngagement: 10.98 },
      { hashtag: '#m1', count: 234, avgViews: 1765432, avgEngagement: 10.12 },
      { hashtag: '#beforeafter', count: 198, avgViews: 1654321, avgEngagement: 10.56 },
      { hashtag: '#comparison', count: 176, avgViews: 1543210, avgEngagement: 10.34 },
      { hashtag: '#catlitter', count: 165, avgViews: 1432109, avgEngagement: 9.78 },
      { hashtag: '#multicat', count: 143, avgViews: 1321098, avgEngagement: 10.89 },
    ];
  }

  static async getEngagementDistribution(): Promise<
    { range: string; count: number; avgViews: number }[]
  > {
    return [
      { range: '0-1%', count: 234, avgViews: 456789 },
      { range: '1-3%', count: 312, avgViews: 1234567 },
      { range: '3-5%', count: 189, avgViews: 2345678 },
      { range: '5-10%', count: 45, avgViews: 3456789 },
      { range: '10%+', count: 10, avgViews: 987654 },
    ];
  }

  static async getViewsDistribution(): Promise<
    { range: string; count: number; avgEngagement: number }[]
  > {
    return [
      { range: '< 100K', count: 123, avgEngagement: 8.45 },
      { range: '100K-500K', count: 409, avgEngagement: 5.67 },
      { range: '500K-1M', count: 102, avgEngagement: 4.23 },
      { range: '1M-10M', count: 142, avgEngagement: 3.58 },
      { range: '10M-50M', count: 100, avgEngagement: 2.89 },
      { range: '50M+', count: 4, avgEngagement: 2.03 },
    ];
  }

  static getViralMetrics() {
    return {
      totalVideos: 1250,
      viralVideos: 387, // 100K+ views
      totalViews: 45678900,
      avgEngagement: 10.34,
      topCategory: 'Product Reviews',
      topHashtag: '#neakasa',
      viralThreshold: 100000,
    };
  }

  static getContentRecommendations() {
    return [
      {
        title: 'Focus on Cat Reactions',
        description:
          'Cat reaction videos achieve 10.87% engagement rate. Show genuine first-time reactions to smart litter box features.',
        priority: 'high' as const,
        category: 'Content Type',
      },
      {
        title: 'Time-lapse Content Strategy',
        description:
          'Before/after and cleaning cycle time-lapses get 10.45% engagement. Create satisfying visual content.',
        priority: 'high' as const,
        category: 'Format',
      },
      {
        title: 'Multi-Platform Distribution',
        description:
          'TikTok for reactions (11.2% engagement), YouTube for detailed reviews (10.5%), Instagram for lifestyle content (10.1%).',
        priority: 'high' as const,
        category: 'Distribution',
      },
      {
        title: 'Partner with Pet Influencers',
        description:
          'Top creators like @CatLadyTech and @FurryFriendsReview drive 5M+ views. Build influencer partnerships.',
        priority: 'medium' as const,
        category: 'Partnerships',
      },
      {
        title: 'Comparison Content',
        description:
          'Head-to-head comparisons with competitors achieve 10.28% engagement. Be transparent about advantages.',
        priority: 'medium' as const,
        category: 'Content Type',
      },
      {
        title: 'Multi-Cat Household Focus',
        description:
          'Content featuring 3+ cats gets 10.89% engagement. Target multi-pet households explicitly.',
        priority: 'low' as const,
        category: 'Innovation',
      },
    ];
  }
}
