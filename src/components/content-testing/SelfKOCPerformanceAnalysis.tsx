import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { TrendingUp, Users, Video, BarChart3, Calendar, Eye, Heart, Share2, MessageCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { mockSelfKOCData } from '../../services/selfKOCService';

interface PlatformData {
  platform: string;
  product: string;
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares?: number;
  avgEngagementRate: number;
}

const SelfKOCPerformanceAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'catbox' | 'garmentsteamer'>('all');

  // Fetch data
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['self-koc-performance', selectedProduct],
    queryFn: () => mockSelfKOCData.getAnalysis(selectedProduct),
  });

  // Calculate time series data (mock)
  const generateTimeSeriesData = () => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const dates = [];
    const viewsData = [];
    const engagementData = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Mock data with some variation
      const baseViews = selectedProduct === 'catbox' ? 50000 : 30000;
      const baseEngagement = selectedProduct === 'catbox' ? 2000 : 1500;
      
      viewsData.push(baseViews + Math.random() * 20000 - 10000);
      engagementData.push(baseEngagement + Math.random() * 500 - 250);
    }
    
    return { dates, viewsData, engagementData };
  };

  // Performance Trend Chart
  const getPerformanceTrendOption = () => {
    const { dates, viewsData, engagementData } = generateTimeSeriesData();
    
    return {
      title: {
        text: 'Performance Trend Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Views', 'Engagement'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Views',
          position: 'left',
          axisLabel: {
            formatter: (value: number) => `${(value / 1000).toFixed(0)}K`,
          },
        },
        {
          type: 'value',
          name: 'Engagement',
          position: 'right',
          axisLabel: {
            formatter: (value: number) => `${(value / 1000).toFixed(1)}K`,
          },
        },
      ],
      series: [
        {
          name: 'Views',
          type: 'line',
          data: viewsData,
          smooth: true,
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
              ],
            },
          },
        },
        {
          name: 'Engagement',
          type: 'line',
          yAxisIndex: 1,
          data: engagementData,
          smooth: true,
          itemStyle: { color: '#10b981' },
        },
      ],
    };
  };

  // Platform Performance Comparison
  const getPlatformComparisonOption = () => {
    if (!performanceData || selectedProduct === 'all') return {};
    
    const data = performanceData as any;
    const platforms = ['youtube', 'tiktok', 'instagram'];
    
    return {
      title: {
        text: 'Platform Performance Breakdown',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Posts', 'Avg Views', 'Engagement Rate'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['YouTube', 'TikTok', 'Instagram'],
      },
      yAxis: [
        {
          type: 'value',
          name: 'Count',
          position: 'left',
        },
        {
          type: 'value',
          name: 'Rate (%)',
          position: 'right',
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: 'Posts',
          type: 'bar',
          data: platforms.map(p => data.platforms[p].totalPosts),
          itemStyle: { color: '#6366f1' },
        },
        {
          name: 'Avg Views',
          type: 'bar',
          data: platforms.map(p => data.platforms[p].totalViews / data.platforms[p].totalPosts),
          itemStyle: { color: '#8b5cf6' },
        },
        {
          name: 'Engagement Rate',
          type: 'line',
          yAxisIndex: 1,
          data: platforms.map(p => data.platforms[p].avgEngagementRate),
          itemStyle: { color: '#ef4444' },
          symbolSize: 8,
        },
      ],
    };
  };

  // Content Performance Heatmap
  const getContentHeatmapOption = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Generate mock heatmap data
    const data: Array<[number, number, number]> = [];
    days.forEach((_, dayIndex) => {
      hours.forEach((_, hourIndex) => {
        // Peak hours simulation
        let value = Math.random() * 50;
        if (hourIndex >= 19 && hourIndex <= 22) value += 50; // Evening peak
        if (hourIndex >= 12 && hourIndex <= 14) value += 30; // Lunch peak
        if (dayIndex >= 5) value += 20; // Weekend boost
        data.push([hourIndex, dayIndex, Math.floor(value)]);
      });
    });
    
    return {
      title: {
        text: 'Optimal Posting Times Heatmap',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          return `${days[params.data[1]]} ${hours[params.data[0]]}<br/>Engagement Score: ${params.data[2]}`;
        },
      },
      grid: {
        height: '60%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: { show: true },
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: { show: true },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        color: ['#ef4444', '#f59e0b', '#10b981'],
      },
      series: [
        {
          name: 'Engagement Score',
          type: 'heatmap',
          data: data,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  };

  // ROI Analysis Chart
  const getROIAnalysisOption = () => {
    if (!performanceData || selectedProduct === 'all') return {};
    
    const data = performanceData as any;
    
    return {
      title: {
        text: 'ROI & Efficiency Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}',
      },
      radar: {
        indicator: [
          { name: 'Content Volume', max: 2000 },
          { name: 'Avg Engagement', max: 500 },
          { name: 'View Efficiency', max: 100 },
          { name: 'Conversion Rate', max: 10 },
          { name: 'Brand Awareness', max: 100 },
          { name: 'Cost Efficiency', max: 100 },
        ],
      },
      series: [
        {
          name: 'Platform Performance',
          type: 'radar',
          data: [
            {
              value: [
                data.platforms.youtube.totalPosts,
                data.platforms.youtube.totalLikes / data.platforms.youtube.totalPosts,
                data.platforms.youtube.avgEngagementRate * 10,
                data.platforms.youtube.avgEngagementRate,
                75,
                85,
              ],
              name: 'YouTube',
              itemStyle: { color: '#ef4444' },
            },
            {
              value: [
                data.platforms.tiktok.totalPosts,
                data.platforms.tiktok.totalLikes / data.platforms.tiktok.totalPosts,
                data.platforms.tiktok.avgEngagementRate * 10,
                data.platforms.tiktok.avgEngagementRate,
                85,
                90,
              ],
              name: 'TikTok',
              itemStyle: { color: '#000000' },
            },
            {
              value: [
                data.platforms.instagram.totalPosts,
                data.platforms.instagram.totalLikes / data.platforms.instagram.totalPosts,
                data.platforms.instagram.avgEngagementRate * 10,
                data.platforms.instagram.avgEngagementRate,
                90,
                70,
              ],
              name: 'Instagram',
              itemStyle: { color: '#e4405f' },
            },
          ],
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            Self-KOC Performance Analytics
          </h2>
          <div className="flex gap-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="catbox">Cat Litter Box</option>
              <option value="garmentsteamer">Garment Steamer</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        {performanceData && selectedProduct !== 'all' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <Video className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold">{(performanceData as any).totalContent}</div>
              <div className="text-sm text-gray-600">Content Pieces</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold">
                {((performanceData as any).platforms.instagram.totalViews / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold">
                {((performanceData as any).overallEngagement / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Engagements</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <span className="text-xs text-gray-500">Avg</span>
              </div>
              <div className="text-2xl font-bold">
                {selectedProduct === 'catbox' ? '4.39%' : '3.83%'}
              </div>
              <div className="text-sm text-gray-600">Engagement Rate</div>
            </div>
          </div>
        )}

        {/* Performance Trend */}
        <div className="mb-6">
          <ReactECharts option={getPerformanceTrendOption()} style={{ height: 350 }} />
        </div>
      </div>

      {/* Platform Comparison & Heatmap */}
      {selectedProduct !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <ReactECharts option={getPlatformComparisonOption()} style={{ height: 350 }} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <ReactECharts option={getROIAnalysisOption()} style={{ height: 350 }} />
          </div>
        </div>
      )}

      {/* Posting Time Heatmap */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={getContentHeatmapOption()} style={{ height: 400 }} />
      </div>

      {/* Insights */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Performance Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Key Findings</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span className="text-sm">
                  {selectedProduct === 'catbox' 
                    ? 'Cat litter box content shows 4x better performance than garment steamer'
                    : 'Garment steamer content needs repositioning for better engagement'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span className="text-sm">
                  Peak engagement times: 7-10 PM on weekdays, all day on weekends
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span className="text-sm">
                  TikTok shows highest engagement rate despite lower view counts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span className="text-sm">
                  Instagram drives massive reach but needs engagement optimization
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Optimization Strategies</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span className="text-sm">
                  Increase TikTok content production by 50% to maximize engagement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span className="text-sm">
                  Implement Instagram Stories and Reels strategy to boost engagement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span className="text-sm">
                  Schedule posts during peak hours for 30% better performance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>
                <span className="text-sm">
                  Focus 80% resources on cat litter box content for better ROI
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfKOCPerformanceAnalysis;