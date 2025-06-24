// Note: SQLite database access would require a backend API
// This service provides mock data for frontend use

interface SelfKOCAccount {
  No: number;
  brand: string;
  product: string;
  channel: string;
  selfkoc: string;
  selfkoc_url: string;
}

interface PlatformContent {
  selfkoc_post_url: string;
  Likes: number;
  Comments: number;
  Views?: number;
  Shares?: number;
  'Post Date': string;
  selfkoc_account: string;
  video_id: string;
}

// This would be replaced with actual API calls in production
// For now, using mock data based on the database analysis

// Export mock data for frontend use (since we can't use sqlite3 directly in browser)
export const mockSelfKOCData = {
  async getAnalysis(product: 'catbox' | 'garmentsteamer' | 'all') {
    // This would be replaced with actual API calls in production
    const catboxData = {
      product: 'Smart Cat Litter Box',
      platforms: {
        youtube: {
          platform: 'YouTube',
          totalPosts: 868,
          totalViews: 10237104,
          totalLikes: 91380,
          totalComments: 15420,
          avgEngagementRate: 4.15,
          topPerformers: [
            { account: '@barmanpsicologa', metric: 520000, type: 'views' },
            { account: 'Anonymous', metric: 1070000, type: 'views' }
          ]
        },
        tiktok: {
          platform: 'TikTok',
          totalPosts: 1831,
          totalViews: 0,
          totalLikes: 371793,
          totalComments: 8924,
          totalShares: 62256,
          avgEngagementRate: 8.5,
          topPerformers: [
            { account: '@lf6ai8wvknt', metric: 111700, type: 'likes' },
            { account: '@hunterezkj8', metric: 58400, type: 'likes' }
          ]
        },
        instagram: {
          platform: 'Instagram',
          totalPosts: 1598,
          totalViews: 148415744,
          totalLikes: 602346,
          totalComments: 12784,
          avgEngagementRate: 0.52,
          topPerformers: [
            { account: '@diahamondol', metric: 47700000, type: 'views' },
            { account: '@pritpaulgosawna', metric: 149000, type: 'likes' }
          ]
        }
      },
      totalAccounts: 35,
      totalContent: 4297,
      overallEngagement: 1159603
    };

    const garmentSteamerData = {
      product: 'Garment Steamer',
      platforms: {
        youtube: {
          platform: 'YouTube',
          totalPosts: 1124,
          totalViews: 8543210,
          totalLikes: 72450,
          totalComments: 12180,
          avgEngagementRate: 3.8,
          topPerformers: [
            { account: '@homeessentials', metric: 823000, type: 'views' },
            { account: '@cleaningtips', metric: 445000, type: 'views' }
          ]
        },
        tiktok: {
          platform: 'TikTok',
          totalPosts: 2156,
          totalViews: 0,
          totalLikes: 425680,
          totalComments: 10234,
          totalShares: 71890,
          avgEngagementRate: 7.2,
          topPerformers: [
            { account: '@cleanwithme', metric: 89200, type: 'likes' },
            { account: '@laundryqueen', metric: 67300, type: 'likes' }
          ]
        },
        instagram: {
          platform: 'Instagram',
          totalPosts: 1876,
          totalViews: 125638920,
          totalLikes: 487230,
          totalComments: 9876,
          avgEngagementRate: 0.48,
          topPerformers: [
            { account: '@fashioncare', metric: 31200000, type: 'views' },
            { account: '@homehacks', metric: 98700, type: 'likes' }
          ]
        }
      },
      totalAccounts: 44,
      totalContent: 5156,
      overallEngagement: 1105360
    };

    if (product === 'catbox') return catboxData;
    if (product === 'garmentsteamer') return garmentSteamerData;
    
    return {
      catbox: catboxData,
      garmentsteamer: garmentSteamerData
    };
  }
};