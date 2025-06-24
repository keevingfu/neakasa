import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Eye,
  Heart,
  ShoppingBag,
  Hash,
  Clock,
  Award,
  BarChart2,
  PlayCircle,
  Sparkles,
  Filter,
  Youtube,
  Instagram,
} from 'lucide-react';
import { KOLVideoService, CategoryStats, HashtagTrend } from '../../services/kolVideoService';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { VideoPreviewCard } from '../video/VideoPreviewCard';
import { ResponsiveVideoGrid } from '../video/VideoGrid';
import { convertKOLVideoToVideo } from '../../utils/videoAdapter';
import { Video, VideoPlatform } from '../../types/video';

const ViralVideoInsights: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [hashtagTrends, setHashtagTrends] = useState<HashtagTrend[]>([]);
  const [viewsDistribution, setViewsDistribution] = useState<{ range: string; count: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'analytics'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<VideoPlatform | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [videosData, categories, hashtags, viewsDist] = await Promise.all([
        KOLVideoService.getTopVideos(20),
        KOLVideoService.getCategoryStats(),
        KOLVideoService.getHashtagTrends(),
        KOLVideoService.getViewsDistribution(),
      ]);

      // Convert KOL videos to standard Video format
      const convertedVideos = videosData.map(convertKOLVideoToVideo);
      setVideos(convertedVideos);

      setCategoryStats(categories);
      setHashtagTrends(hashtags);
      setViewsDistribution(viewsDist);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter videos based on platform and category
  const filteredVideos = videos.filter((video) => {
    const platformMatch = selectedPlatform === 'all' || video.platform === selectedPlatform;
    const categoryMatch = selectedCategory === 'all' || video.category === selectedCategory;
    return platformMatch && categoryMatch;
  });

  // Get top creators
  const getTopCreators = () => {
    const creatorStats = videos.reduce(
      (acc, video) => {
        const creatorName = video.author?.name || 'Unknown';
        if (!acc[creatorName]) {
          acc[creatorName] = {
            name: creatorName,
            videos: 0,
            totalViews: 0,
            avgEngagement: 0,
            verified: video.author?.verified || false,
          };
        }
        acc[creatorName].videos++;
        acc[creatorName].totalViews += video.views;
        const engagement = ((video.likes + video.comments) / video.views) * 100;
        acc[creatorName].avgEngagement =
          (acc[creatorName].avgEngagement * (acc[creatorName].videos - 1) + engagement) /
          acc[creatorName].videos;
        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          videos: number;
          totalViews: number;
          avgEngagement: number;
          verified: boolean;
        }
      >
    );

    return Object.values(creatorStats)
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 10);
  };

  const metrics = KOLVideoService.getViralMetrics();
  const recommendations = KOLVideoService.getContentRecommendations();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(2)}%`;
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Viral Video Insights</h1>
        <div className="flex items-center gap-4">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as VideoPlatform | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-4 py-2 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Analyzing {metrics.totalVideos} viral videos</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        {(['overview', 'videos', 'analytics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Videos</h3>
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{metrics.totalVideos}</p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics.viralVideos} went viral (100K+ views)
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatNumber(metrics.totalViews)}</p>
              <p className="text-xs text-gray-500 mt-1">Across all platforms</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Avg Engagement</h3>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatPercentage(metrics.avgEngagement)}
              </p>
              <p className="text-xs text-gray-500 mt-1">For viral pet tech videos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Top Category</h3>
                <ShoppingBag className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{metrics.topCategory}</p>
              <p className="text-xs text-gray-500 mt-1">35% of viral content</p>
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value: number) => formatNumber(value)} />
                <Legend />
                <Bar dataKey="avgViews" fill="#3B82F6" name="Avg Views" />
                <Bar dataKey="avgEngagement" fill="#10B981" name="Avg Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Views Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Views Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={viewsDistribution}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.range}: ${entry.count}`}
                  >
                    {viewsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Hashtags</h2>
              <div className="space-y-3">
                {hashtagTrends.slice(0, 7).map((hashtag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{hashtag.hashtag}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">{hashtag.count} videos</span>
                      <span className="font-semibold text-green-600">
                        {formatPercentage(hashtag.avgEngagement)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Creators Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Pet Tech Influencers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTopCreators().map((creator, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {creator.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                        @{creator.name}
                        {'verified' in creator && creator.verified && (
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </h3>
                      <p className="text-xs text-gray-600">{creator.videos} videos</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Total Views</p>
                      <p className="font-semibold">{formatNumber(creator.totalViews)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Engagement</p>
                      <p className="font-semibold text-green-600">
                        {formatPercentage(creator.avgEngagement)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Product Reviews">Product Reviews (35%)</option>
              <option value="Cat Reactions">Cat Reactions (28%)</option>
              <option value="Time-lapse Cleaning">Time-lapse Cleaning (22%)</option>
              <option value="Comparison Videos">Comparison Videos (15%)</option>
            </select>
            <span className="text-sm text-gray-600">Showing {filteredVideos.length} videos</span>
          </div>

          {/* Top Performing Videos - Using new video components */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Viral Pet Tech Videos</h2>
            <ResponsiveVideoGrid videos={filteredVideos} gap={16} />
          </div>

          {/* Platform Performance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Platform Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TikTok</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">11.2%</p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-xs text-gray-500 mt-1">Best for reactions & trends</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Youtube className="w-12 h-12 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">10.5%</p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-xs text-gray-500 mt-1">Best for detailed reviews</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Instagram className="w-12 h-12 text-pink-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">10.1%</p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-xs text-gray-500 mt-1">Best for lifestyle content</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Engagement Analysis by Video Type */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Engagement Rate by Video Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => formatPercentage(value)} />
                <Legend />
                <Bar dataKey="avgEngagement" fill="#10B981" name="Avg Engagement %">
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Views vs Engagement Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Views Distribution Analysis
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgEngagement"
                  stroke="#8B5CF6"
                  name="Avg Engagement %"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Content Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Content Strategy Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => {
                const iconMap: { [key: string]: React.ElementType } = {
                  'Content Type': BarChart2,
                  Distribution: Hash,
                  Partnerships: Award,
                  Timing: Clock,
                  Format: PlayCircle,
                  Innovation: Sparkles,
                };
                const Icon = iconMap[rec.category] || Sparkles;

                return (
                  <div key={index} className="bg-white p-4 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-2xl ${
                          rec.priority === 'high'
                            ? 'bg-red-100'
                            : rec.priority === 'medium'
                              ? 'bg-yellow-100'
                              : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            rec.priority === 'high'
                              ? 'text-red-600'
                              : rec.priority === 'medium'
                                ? 'text-yellow-600'
                                : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                        <span
                          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                            rec.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : rec.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {rec.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Viral Metrics by Platform */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Platform-Specific Metrics
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-semibold text-gray-800">TikTok</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Views</p>
                      <p className="font-semibold">2.5M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Viral Rate</p>
                      <p className="font-semibold text-green-600">42%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Shares</p>
                      <p className="font-semibold">125K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Comments</p>
                      <p className="font-semibold">15.2K</p>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="font-semibold text-gray-800">YouTube</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Views</p>
                      <p className="font-semibold">1.8M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Watch Time</p>
                      <p className="font-semibold text-green-600">4.5 min</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Likes</p>
                      <p className="font-semibold">89K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Comments</p>
                      <p className="font-semibold">8.7K</p>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-pink-600 pl-4">
                  <h3 className="font-semibold text-gray-800">Instagram Reels</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Reach</p>
                      <p className="font-semibold">1.2M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Saves</p>
                      <p className="font-semibold text-green-600">45K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Shares</p>
                      <p className="font-semibold">67K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Comments</p>
                      <p className="font-semibold">5.4K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Viral Factors */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Viral Factors</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="font-medium">First 3 seconds hook</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">+85% views</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Cat reaction moments</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">+72% engagement</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">30-60 second duration</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">+65% completion</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">5-7 relevant hashtags</span>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">+58% reach</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Videos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top Performing Pet Tech Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.slice(0, 3).map((video) => (
                <VideoPreviewCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralVideoInsights;
