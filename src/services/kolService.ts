// Service for KOL management
import { KOL, KOLFilter, KOLMetrics, PlatformAccount } from '../types/kol';
import { kolDatabaseService } from './kolDatabaseService';
import { kolRealDataService } from './kolRealDataService';

// Mock data generation for 189 KOLs
const categories = [
  'Tech & Gadgets',
  'Beauty & Fashion',
  'Food & Cooking',
  'Travel & Lifestyle',
  'Gaming & Entertainment',
  'Fitness & Health',
  'Home & Garden',
  'Pet Care',
  'Education & Learning',
  'Business & Finance',
];

const platforms: Array<'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'facebook'> = [
  'youtube',
  'tiktok',
  'instagram',
  'twitter',
  'facebook',
];

const firstNames = [
  'Emma',
  'James',
  'Sophia',
  'Michael',
  'Isabella',
  'William',
  'Ava',
  'Alexander',
  'Mia',
  'Daniel',
  'Charlotte',
  'Henry',
  'Amelia',
  'Owen',
  'Evelyn',
  'Sebastian',
  'Harper',
  'Muhammad',
  'Abigail',
  'Joseph',
  'Emily',
  'Lucas',
  'Elizabeth',
  'Mason',
  'Avery',
  'Logan',
  'Sofia',
  'Ethan',
  'Ella',
  'Liam',
  'Madison',
  'Noah',
  'Scarlett',
  'Oliver',
  'Victoria',
  'Benjamin',
  'Aria',
  'Elijah',
  'Grace',
  'Luke',
  'Chloe',
  'John',
  'Camila',
  'David',
  'Penelope',
  'Ryan',
  'Riley',
  'Jaxon',
  'Layla',
  'Matthew',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
];

const tags = [
  'product-review',
  'unboxing',
  'tutorial',
  'vlog',
  'challenge',
  'comedy',
  'educational',
  'lifestyle',
  'diy',
  'haul',
  'transformation',
  'comparison',
  'tips',
  'hacks',
  'trends',
];

class KOLService {
  private static kols: KOL[] = [];
  private static isInitialized = false;

  private static generatePlatformAccount(
    platform: (typeof platforms)[number],
    isPrimary: boolean
  ): PlatformAccount {
    const baseFollowers = isPrimary
      ? Math.floor(Math.random() * 5000000) + 50000
      : Math.floor(Math.random() * 1000000) + 10000;

    const growth = Math.random() * 40 - 10; // -10% to +30% growth
    const engagementBase = platform === 'tiktok' ? 5 : platform === 'instagram' ? 3 : 2;
    const engagement = engagementBase + Math.random() * 3;

    return {
      platform,
      username: `@${platform}_user_${Math.random().toString(36).substr(2, 9)}`,
      followers: baseFollowers,
      followersGrowth: Number(growth.toFixed(2)),
      avgViews: Math.floor(baseFollowers * (0.1 + Math.random() * 0.4)),
      avgEngagement: Number(engagement.toFixed(2)),
      verified: isPrimary && Math.random() > 0.3,
      url: `https://${platform}.com/user`,
    };
  }

  private static generateKOL(index: number): KOL {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    const category = categories[Math.floor(Math.random() * categories.length)];
    const numPlatforms = Math.floor(Math.random() * 3) + 2; // 2-4 platforms
    const selectedPlatforms = [...platforms].sort(() => 0.5 - Math.random()).slice(0, numPlatforms);

    const platformAccounts = selectedPlatforms.map((platform, idx) =>
      this.generatePlatformAccount(platform, idx === 0)
    );

    const totalFollowers = platformAccounts.reduce((sum, acc) => sum + acc.followers, 0);
    const avgEngagementRate =
      platformAccounts.reduce((sum, acc) => sum + acc.avgEngagement, 0) / platformAccounts.length;

    const selectedTags = [...tags]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 4) + 2);

    const status: KOL['status'] =
      Math.random() > 0.9 ? 'inactive' : Math.random() > 0.8 ? 'pending' : 'active';

    return {
      id: `kol_${index + 1}`,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
      verified: platformAccounts.some((acc) => acc.verified),
      category,
      platforms: platformAccounts,
      totalFollowers,
      avgEngagementRate: Number(avgEngagementRate.toFixed(2)),
      totalVideos: Math.floor(Math.random() * 500) + 50,
      totalViews: Math.floor(totalFollowers * (10 + Math.random() * 90)),
      joinedDate: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3
      ).toISOString(),
      lastActiveDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status,
      tags: selectedTags,
      performanceScore: Math.floor(Math.random() * 40) + 60, // 60-100
      monthlyReach: Math.floor(totalFollowers * (0.3 + Math.random() * 0.7)),
      audienceDemographics: {
        gender: {
          male: Number((20 + Math.random() * 60).toFixed(1)),
          female: Number((20 + Math.random() * 60).toFixed(1)),
          other: Number((Math.random() * 10).toFixed(1)),
        },
        ageGroups: {
          '13-17': Number((5 + Math.random() * 15).toFixed(1)),
          '18-24': Number((20 + Math.random() * 30).toFixed(1)),
          '25-34': Number((20 + Math.random() * 30).toFixed(1)),
          '35-44': Number((10 + Math.random() * 20).toFixed(1)),
          '45+': Number((5 + Math.random() * 15).toFixed(1)),
        },
        topCountries: [
          { country: 'United States', percentage: Number((20 + Math.random() * 30).toFixed(1)) },
          { country: 'United Kingdom', percentage: Number((5 + Math.random() * 15).toFixed(1)) },
          { country: 'Canada', percentage: Number((5 + Math.random() * 10).toFixed(1)) },
          { country: 'Australia', percentage: Number((3 + Math.random() * 7).toFixed(1)) },
          { country: 'Germany', percentage: Number((3 + Math.random() * 7).toFixed(1)) },
        ],
      },
    };
  }

  static async getKOLs(filter?: Partial<KOLFilter>): Promise<KOL[]> {
    // Get KOLs from real data service and generate additional ones
    if (!this.isInitialized) {
      const realKOLs = await kolRealDataService.getTopKOLs();
      
      // Convert real KOLs to full KOL objects
      const convertedKOLs = realKOLs.map((realKOL, index) => {
        const followerCount = realKOL.total_views / 3; // Estimate followers from views
        const platformAccounts: PlatformAccount[] = [{
          platform: realKOL.platform.toLowerCase() as 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'facebook',
          username: `@${realKOL.kol_name.toLowerCase().replace(/\s+/g, '_')}`,
          followers: Math.floor(followerCount),
          followersGrowth: 15.5,
          avgViews: realKOL.avg_views,
          avgEngagement: realKOL.engagement_rate,
          verified: followerCount > 1000000,
          url: `https://${realKOL.platform.toLowerCase()}.com/user`,
        }];
        
        return {
          id: `kol_${index + 1}`,
          name: realKOL.kol_name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${realKOL.kol_name.replace(' ', '')}`,
          verified: followerCount > 1000000,
          category: realKOL.top_categories[0] || 'General',
          platforms: platformAccounts,
          totalFollowers: Math.floor(followerCount),
          avgEngagementRate: realKOL.engagement_rate,
          totalVideos: realKOL.total_videos,
          totalViews: realKOL.total_views,
          joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3).toISOString(),
          lastActiveDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active' as const,
          tags: ['product-review', 'unboxing', 'tutorial'],
          performanceScore: Math.floor(realKOL.engagement_rate * 5) + 60,
          monthlyReach: Math.floor(followerCount * 0.6),
          audienceDemographics: {
            gender: {
              male: 45.5,
              female: 52.5,
              other: 2.0,
            },
            ageGroups: {
              '13-17': 8.5,
              '18-24': 35.2,
              '25-34': 32.8,
              '35-44': 15.3,
              '45+': 8.2,
            },
            topCountries: [
              { country: 'United States', percentage: 42.5 },
              { country: 'United Kingdom', percentage: 12.8 },
              { country: 'Canada', percentage: 8.5 },
              { country: 'Australia', percentage: 6.2 },
              { country: 'Germany', percentage: 5.8 },
            ],
          },
        } as KOL;
      });
      
      // Generate additional KOLs to reach 189 total
      const additionalCount = 189 - convertedKOLs.length;
      const additionalKOLs = Array.from({ length: additionalCount }, (_, i) => 
        this.generateKOL(convertedKOLs.length + i)
      );
      
      this.kols = [...convertedKOLs, ...additionalKOLs];
      this.isInitialized = true;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = [...this.kols];

    if (filter) {
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filtered = filtered.filter(
          (kol) =>
            kol.name.toLowerCase().includes(searchLower) ||
            kol.category.toLowerCase().includes(searchLower) ||
            kol.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
            kol.platforms.some((p) => p.username.toLowerCase().includes(searchLower))
        );
      }

      // Category filter
      if (filter.categories && filter.categories.length > 0) {
        filtered = filtered.filter((kol) => filter.categories?.includes(kol.category) ?? false);
      }

      // Platform filter
      if (filter.platforms && filter.platforms.length > 0) {
        filtered = filtered.filter((kol) =>
          kol.platforms.some((p) => filter.platforms?.includes(p.platform) ?? false)
        );
      }

      // Followers range filter
      if (filter.minFollowers !== undefined) {
        filtered = filtered.filter((kol) => kol.totalFollowers >= (filter.minFollowers ?? 0));
      }
      if (filter.maxFollowers !== undefined) {
        filtered = filtered.filter(
          (kol) => kol.totalFollowers <= (filter.maxFollowers ?? Infinity)
        );
      }

      // Engagement range filter
      if (filter.minEngagement !== undefined) {
        filtered = filtered.filter((kol) => kol.avgEngagementRate >= (filter.minEngagement ?? 0));
      }
      if (filter.maxEngagement !== undefined) {
        filtered = filtered.filter((kol) => kol.avgEngagementRate <= (filter.maxEngagement ?? 100));
      }

      // Status filter
      if (filter.status && filter.status.length > 0) {
        filtered = filtered.filter((kol) => filter.status?.includes(kol.status) ?? false);
      }

      // Tags filter
      if (filter.tags && filter.tags.length > 0) {
        filtered = filtered.filter(
          (kol) => filter.tags?.some((tag) => kol.tags.includes(tag)) ?? false
        );
      }
    }

    return filtered;
  }

  static async getKOLById(id: string): Promise<KOL | null> {
    const kols = await this.getKOLs();
    return kols.find((kol) => kol.id === id) || null;
  }

  static async getKOLMetrics(): Promise<KOLMetrics> {
    // Get metrics from real data service
    const overviewMetrics = await kolRealDataService.getOverviewMetrics();
    const kols = await this.getKOLs();

    const activeKOLs = overviewMetrics.active_kols;
    const totalReach = overviewMetrics.total_reach;
    const avgEngagementRate = overviewMetrics.avg_engagement_rate;

    // Count by category
    const categoryCount = kols.reduce(
      (acc, kol) => {
        acc[kol.category] = (acc[kol.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const topCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Count by platform
    const platformCount = kols.reduce(
      (acc, kol) => {
        kol.platforms.forEach((p) => {
          acc[p.platform] = (acc[p.platform] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    const platformDistribution = Object.entries(platformCount)
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalKOLs: kols.length,
      activeKOLs,
      totalReach,
      avgEngagementRate: Number(avgEngagementRate.toFixed(2)),
      topCategories,
      platformDistribution,
    };
  }

  static async updateKOLStatus(ids: string[], status: KOL['status']): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    ids.forEach((id) => {
      const kol = this.kols.find((k) => k.id === id);
      if (kol) {
        kol.status = status;
      }
    });
  }

  static async exportKOLs(ids: string[]): Promise<Blob> {
    const kols = await this.getKOLs();
    const selectedKOLs = kols.filter((kol) => ids.includes(kol.id));

    const csv = [
      // Headers
      [
        'ID',
        'Name',
        'Category',
        'Total Followers',
        'Avg Engagement Rate',
        'Status',
        'Performance Score',
        'Platforms',
      ],
      // Data rows
      ...selectedKOLs.map((kol) => [
        kol.id,
        kol.name,
        kol.category,
        kol.totalFollowers.toString(),
        kol.avgEngagementRate.toString(),
        kol.status,
        kol.performanceScore.toString(),
        kol.platforms.map((p) => `${p.platform}(${p.followers})`).join(', '),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    return new Blob([csv], { type: 'text/csv' });
  }
}

export default KOLService;
