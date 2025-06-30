import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Target,
  Award,
  PieChart,
  Clock,
  Activity,
  Zap,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { EChartsFormatterParams } from '../../types/charts';
import { kolRealDataService } from '../../services/kolRealDataService';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Data interfaces
interface RevenueDataItem {
  value: number;
  roi: number;
  itemStyle?: { color: string };
}

interface MarketShareData {
  name: string;
  value: number;
  growth: number;
}

const KOLConversionRevenueAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [conversionData, setConversionData] = useState<{
    conversionRate: string;
    avgOrderValue: number;
    totalRevenue: number;
    roiMultiplier: string;
    conversionFunnel: Array<{ stage: string; value: number }>;
    revenueByCategory: Array<{ category: string; revenue: number; roi: number }>;
    monthlyRevenue: Array<{ month: string; revenue: number; conversions: number }>;
  } | null>(null);
  const [brandAnalysis, setBrandAnalysis] = useState<{
    topBrands: Array<{ brand: string; videos: number; avgViews: number; engagement: number }>;
    competitorAnalysis: Record<string, { marketShare: number; growth: number }>;
  } | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedInfluencerTier, setSelectedInfluencerTier] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [conversion, brands, roi] = await Promise.all([
        kolRealDataService.getConversionMetrics(),
        kolRealDataService.getBrandPerformance(),
        kolRealDataService.getROIAnalysis(),
      ]);

      // Transform data to match component structure
      const transformedConversion = {
        conversionRate: (conversion.conversion_rate * 100).toFixed(2),
        avgOrderValue: conversion.avg_order_value,
        totalRevenue: conversion.total_attributed_revenue,
        roiMultiplier: roi.overall_roi.toFixed(2),
        conversionFunnel: [
          { stage: 'Views', value: 258500000 },
          { stage: 'Engagements', value: 39810000 },
          { stage: 'Clicks', value: 3102000 },
          { stage: 'Conversions', value: conversion.total_conversions },
        ],
        revenueByCategory: Object.entries(conversion.revenue_by_category).map(
          ([category, data]) => ({
            category,
            revenue: (data as { revenue: number; roi: number }).revenue,
            roi: (data as { revenue: number; roi: number }).roi,
          })
        ),
        monthlyRevenue: conversion.monthly_trend.map((item: { month: string; revenue: number; conversions: number }) => ({
          month: item.month.split(' ')[0], // Extract month name
          revenue: item.revenue,
          conversions: item.conversions,
        })),
      };

      const transformedBrands = {
        topBrands: brands.map((brand: { brand: string; total_videos: number; total_views: number; avg_engagement_rate: number }) => ({
          brand: brand.brand,
          videos: brand.total_videos,
          avgViews: brand.total_views / brand.total_videos,
          engagement: brand.avg_engagement_rate,
        })),
        competitorAnalysis: {
          eufy: { marketShare: 25.4, growth: 18.5 },
          soundcore: { marketShare: 18.5, growth: 22.3 },
          tineco: { marketShare: 13.7, growth: 15.8 },
          neakasa: { marketShare: 7.3, growth: 35.2 },
          others: { marketShare: 35.1, growth: 8.5 },
        },
      };

      setConversionData(transformedConversion);
      setBrandAnalysis(transformedBrands);
    } catch (error) {
      // Error loading data
      // Set default empty data to prevent blank page
      setConversionData({
        conversionRate: 0,
        avgOrderValue: 0,
        totalRevenue: 0,
        roiMultiplier: 0,
        conversionFunnel: [],
        revenueByCategory: [],
        monthlyRevenue: [],
      });
      setBrandAnalysis({
        topBrands: [],
        competitorAnalysis: {},
      });
    } finally {
      setLoading(false);
    }
  };

  // Conversion funnel chart
  const getConversionFunnelOption = () => {
    if (!conversionData?.conversionFunnel) return {};

    return {
      title: {
        text: 'KOL Content Conversion Funnel',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      series: [
        {
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: conversionData.conversionFunnel[0].value,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}: {c}',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: conversionData.conversionFunnel.map((item: { stage: string; value: number }, index: number) => ({
            value: item.value,
            name: item.stage,
            itemStyle: {
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index],
            },
          })),
        },
      ],
    };
  };

  // Revenue by category chart
  const getRevenueByCategoryOption = () => {
    if (!conversionData?.revenueByCategory) return {};

    return {
      title: {
        text: 'Revenue by Content Category',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
          if (Array.isArray(params)) {
            const data = params[0];
            return `${data.name}<br/>Revenue: $${((data.value as number) / 1000).toFixed(0)}K<br/>ROI: ${(data.data as RevenueDataItem).roi}x`;
          }
          return '';
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
      yAxis: {
        type: 'category',
        data: conversionData.revenueByCategory.map((d: { category: string }) => d.category),
      },
      series: [
        {
          type: 'bar',
          data: conversionData.revenueByCategory.map((d: { category: string; revenue: number; roi: number }) => ({
            value: d.revenue,
            roi: d.roi,
            itemStyle: {
              color: '#10b981',
            },
          })),
          label: {
            show: true,
            position: 'right',
            formatter: (params: EChartsFormatterParams) => `${(params.data as RevenueDataItem).roi}x ROI`,
          },
        },
      ],
    };
  };

  // Monthly revenue trend
  const getMonthlyRevenueTrendOption = () => {
    if (!conversionData?.monthlyRevenue) return {};

    return {
      title: {
        text: 'Monthly Revenue & Conversion Trend',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Revenue', 'Conversions'],
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
        data: conversionData.monthlyRevenue.map((d: { month: string }) => d.month),
      },
      yAxis: [
        {
          type: 'value',
          name: 'Revenue',
          position: 'left',
          axisLabel: {
            formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
          },
        },
        {
          type: 'value',
          name: 'Conversions',
          position: 'right',
        },
      ],
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          data: conversionData.monthlyRevenue.map((d: { revenue: number }) => d.revenue),
          itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
        },
        {
          name: 'Conversions',
          type: 'line',
          yAxisIndex: 1,
          data: conversionData.monthlyRevenue.map((d: { conversions: number }) => d.conversions),
          smooth: true,
          itemStyle: { color: '#ef4444' },
        },
      ],
    };
  };

  // Brand market share
  const getBrandMarketShareOption = () => {
    if (!brandAnalysis?.competitorAnalysis) return {};

    const data = Object.entries(brandAnalysis.competitorAnalysis).map(
      ([brand, info]) => ({
        name: brand.charAt(0).toUpperCase() + brand.slice(1),
        value: (info as { marketShare: number; growth: number }).marketShare,
        growth: (info as { marketShare: number; growth: number }).growth,
      })
    );

    return {
      title: {
        text: 'Market Share Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: EChartsFormatterParams) => {
          return `${params.name}<br/>Market Share: ${params.value}%<br/>Growth: ${(params.data as MarketShareData).growth}%`;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}\n{c}%',
          },
          labelLine: {
            show: true,
          },
          data: data.map((item, index) => ({
            ...item,
            itemStyle: {
              color: ['#ef4444', '#3b82f6', '#10b981', '#6b7280'][index],
            },
          })),
        },
      ],
    };
  };

  // Attribution Model Chart
  const getAttributionModelOption = () => {
    return {
      title: {
        text: 'Multi-Touch Attribution Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Direct Sales', 'Influenced Sales', 'Brand Lift'],
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
        data: ['0-24h', '1-7d', '7-14d', '14-30d', '30-90d', '90d+'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
      series: [
        {
          name: 'Direct Sales',
          type: 'bar',
          stack: 'total',
          data: [450000, 320000, 180000, 120000, 80000, 50000],
          itemStyle: { color: '#3b82f6' },
        },
        {
          name: 'Influenced Sales',
          type: 'bar',
          stack: 'total',
          data: [180000, 250000, 220000, 180000, 150000, 100000],
          itemStyle: { color: '#10b981' },
        },
        {
          name: 'Brand Lift',
          type: 'bar',
          stack: 'total',
          data: [50000, 80000, 120000, 150000, 180000, 200000],
          itemStyle: { color: '#f59e0b' },
        },
      ],
    };
  };

  // Influencer Tier Analysis
  const getInfluencerTierAnalysisOption = () => {
    return {
      title: {
        text: 'Performance by Influencer Tier',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Engagement Rate', 'Conversion Rate', 'ROI', 'CPE ($)'],
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
        data: [
          'Nano\n(&lt;1K)',
          'Micro\n(1-10K)',
          'Mid-Tier\n(10-100K)',
          'Macro\n(100K-1M)',
          'Mega\n(1M+)',
        ],
      },
      yAxis: [
        {
          type: 'value',
          name: 'Rate (%)',
          position: 'left',
          axisLabel: {
            formatter: '{value}%',
          },
        },
        {
          type: 'value',
          name: 'ROI / CPE',
          position: 'right',
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: 'Engagement Rate',
          type: 'bar',
          data: [12.5, 8.7, 5.2, 3.8, 2.5],
          itemStyle: { color: '#3b82f6' },
        },
        {
          name: 'Conversion Rate',
          type: 'bar',
          data: [4.2, 6.8, 8.5, 7.2, 5.5],
          itemStyle: { color: '#10b981' },
        },
        {
          name: 'ROI',
          type: 'line',
          yAxisIndex: 1,
          data: [8.5, 7.2, 6.8, 5.5, 4.2],
          smooth: true,
          itemStyle: { color: '#f59e0b' },
        },
        {
          name: 'CPE ($)',
          type: 'line',
          yAxisIndex: 1,
          data: [0.5, 1.2, 3.5, 8.5, 15.5],
          smooth: true,
          itemStyle: { color: '#ef4444' },
        },
      ],
    };
  };

  // ROI comparison radar
  const getROIComparisonOption = () => {
    if (!conversionData) return {};

    return {
      title: {
        text: 'KOL Campaign Performance vs Industry Benchmarks',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Engagement Rate', max: 10 },
          { name: 'Conversion Rate', max: 10 },
          { name: 'ROI Multiple', max: 10 },
          { name: 'Brand Awareness Lift', max: 100 },
          { name: 'Customer Retention', max: 100 },
          { name: 'Content Quality Score', max: 100 },
        ],
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                parseFloat(conversionData.conversionRate),
                parseFloat(conversionData.conversionRate),
                parseFloat(conversionData.roiMultiplier),
                75, // Brand awareness
                82, // Customer retention
                88, // Content quality
              ],
              name: 'Neakasa Performance',
              itemStyle: { color: '#3b82f6' },
              areaStyle: { opacity: 0.3 },
            },
            {
              value: [4.5, 6, 5, 60, 70, 75],
              name: 'Industry Benchmark',
              itemStyle: { color: '#6b7280' },
              areaStyle: { opacity: 0.3 },
            },
            {
              value: [3, 2, 3, 40, 50, 60],
              name: 'Industry Minimum',
              itemStyle: { color: '#ef4444' },
              areaStyle: { opacity: 0.1 },
            },
          ],
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KOL Conversion & Revenue Analysis</h1>
            <p className="text-gray-600 mt-1">
              Track conversion rates and revenue generated from KOL campaigns
            </p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {/* Industry Benchmarks Alert */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Industry Benchmarks for Pet Products KOL Marketing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                <div className="text-sm">
                  <span className="text-gray-600">Engagement Rate:</span>
                  <span className="font-semibold text-gray-900 ml-1">3-6%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-semibold text-gray-900 ml-1">2-10%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Target ROI:</span>
                  <span className="font-semibold text-gray-900 ml-1">5:1</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Attribution Window:</span>
                  <span className="font-semibold text-gray-900 ml-1">30-90 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Platforms</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="xiaohongshu">Xiaohongshu</option>
          </select>
          <select
            value={selectedInfluencerTier}
            onChange={(e) => setSelectedInfluencerTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Influencer Tiers</option>
            <option value="mega">Mega (1M+)</option>
            <option value="macro">Macro (100K-1M)</option>
            <option value="mid">Mid-Tier (10K-100K)</option>
            <option value="micro">Micro (1K-10K)</option>
            <option value="nano">Nano (&lt;1K)</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-600">Rate</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {conversionData ? `${conversionData.conversionRate}%` : '0%'}
            </div>
            <div className="text-sm text-green-700">Conversion Rate</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600">AOV</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              ${conversionData ? conversionData.avgOrderValue : '0'}
            </div>
            <div className="text-sm text-blue-700">Avg Order Value</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-purple-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              ${conversionData ? `${(conversionData.totalRevenue / 1000000).toFixed(1)}M` : '0'}
            </div>
            <div className="text-sm text-purple-700">Total Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span className="text-xs text-orange-600">ROI</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {conversionData ? `${conversionData.roiMultiplier}x` : '0x'}
            </div>
            <div className="text-sm text-orange-700">Return on Investment</div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-pink-600" />
              <span className="text-xs text-pink-600">Leader</span>
            </div>
            <div className="text-lg font-bold text-pink-900">
              {brandAnalysis?.topBrands?.[0]?.brand
                ? brandAnalysis.topBrands[0].brand.charAt(0).toUpperCase() +
                  brandAnalysis.topBrands[0].brand.slice(1)
                : 'N/A'}
            </div>
            <div className="text-sm text-pink-700">Top Brand</div>
          </div>
        </div>
      </div>

      {/* Multi-Tab Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm">
        <Tabs defaultValue="funnel" className="w-full">
          <TabsList className="grid w-full grid-cols-4 p-1 bg-gray-100 rounded-xl m-4">
            <TabsTrigger value="funnel" className="rounded-lg">
              Conversion Funnel
            </TabsTrigger>
            <TabsTrigger value="attribution" className="rounded-lg">
              Attribution Model
            </TabsTrigger>
            <TabsTrigger value="influencer" className="rounded-lg">
              Influencer Tiers
            </TabsTrigger>
            <TabsTrigger value="tracking" className="rounded-lg">
              Tracking Framework
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funnel" className="p-6">
            <ReactECharts option={getConversionFunnelOption()} style={{ height: 400 }} />
          </TabsContent>

          <TabsContent value="attribution" className="p-6">
            <ReactECharts option={getAttributionModelOption()} style={{ height: 400 }} />
          </TabsContent>

          <TabsContent value="influencer" className="p-6">
            <ReactECharts option={getInfluencerTierAnalysisOption()} style={{ height: 400 }} />
          </TabsContent>

          <TabsContent value="tracking" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Comprehensive Tracking Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Platform-Specific Metrics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">TikTok</span>
                      <span className="text-sm font-medium">
                        Views, Shares, Comments, Profile Visits
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Instagram</span>
                      <span className="text-sm font-medium">
                        Reach, Saves, Story Views, Link Clicks
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">YouTube</span>
                      <span className="text-sm font-medium">
                        Watch Time, Click-through Rate, End Screens
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Xiaohongshu</span>
                      <span className="text-sm font-medium">
                        Collections, Notes, Discovery Traffic
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Attribution Windows
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Direct Attribution</span>
                      <span className="text-sm font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Influenced Attribution</span>
                      <span className="text-sm font-medium">7-14 days</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Extended Attribution</span>
                      <span className="text-sm font-medium">30-90 days</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Brand Lift Measurement</span>
                      <span className="text-sm font-medium">90-180 days</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Multi-Touch Attribution Model</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">40%</div>
                    <div className="text-sm text-gray-600">First Touch</div>
                    <div className="text-xs text-gray-500 mt-1">Initial awareness creation</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600">30%</div>
                    <div className="text-sm text-gray-600">Middle Touches</div>
                    <div className="text-xs text-gray-500 mt-1">Consideration & research</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">30%</div>
                    <div className="text-sm text-gray-600">Last Touch</div>
                    <div className="text-xs text-gray-500 mt-1">Final conversion driver</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getRevenueByCategoryOption()} style={{ height: 350 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getBrandMarketShareOption()} style={{ height: 350 }} />
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={getMonthlyRevenueTrendOption()} style={{ height: 400 }} />
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          12-Month Implementation Roadmap
        </h2>
        <div className="space-y-4">
          {[
            {
              phase: 'Phase 1: Foundation (Months 1-3)',
              tasks: [
                'Set up tracking infrastructure',
                'Implement UTM parameters',
                'Configure analytics platforms',
                'Establish baseline metrics',
              ],
              status: 'completed',
            },
            {
              phase: 'Phase 2: Optimization (Months 4-6)',
              tasks: [
                'A/B test content formats',
                'Optimize influencer selection',
                'Refine attribution models',
                'Improve conversion funnels',
              ],
              status: 'in-progress',
            },
            {
              phase: 'Phase 3: Scaling (Months 7-9)',
              tasks: [
                'Expand influencer network',
                'Launch multi-platform campaigns',
                'Implement automation tools',
                'Scale successful strategies',
              ],
              status: 'upcoming',
            },
            {
              phase: 'Phase 4: Advanced Analytics (Months 10-12)',
              tasks: [
                'Deploy predictive models',
                'Implement real-time optimization',
                'Create custom dashboards',
                'Establish long-term partnerships',
              ],
              status: 'upcoming',
            },
          ].map((phase, index) => (
            <div key={index} className="border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    phase.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : phase.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {phase.status === 'completed'
                    ? 'Completed'
                    : phase.status === 'in-progress'
                      ? 'In Progress'
                      : 'Upcoming'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-2">
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 ${
                        phase.status === 'completed'
                          ? 'text-green-500'
                          : phase.status === 'in-progress' && taskIndex < 2
                            ? 'text-blue-500'
                            : 'text-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-600">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={getROIComparisonOption()} style={{ height: 400 }} />
      </div>

      {/* Revenue Insights */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-purple-600" />
          Strategic Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Cat Litter Box Market Opportunities
            </h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <strong>Automatic segment</strong> growing at 7.8% CAGR vs 9.1% overall market
              </li>
              <li className="text-sm">
                <strong>Smart features</strong> integration driving premium pricing ($300-700)
              </li>
              <li className="text-sm">
                <strong>Health monitoring</strong> capabilities becoming key differentiator
              </li>
              <li className="text-sm">
                <strong>Sustainability focus</strong> with brands like CatGenie gaining traction
              </li>
            </ul>
          </Card>

          <Card className="p-4 border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Competitive Positioning
            </h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <strong>Neakasa M1</strong> rated 7/10 by WIRED for open-top design
              </li>
              <li className="text-sm">
                <strong>Price positioning</strong> between premium ($699) and value ($300)
              </li>
              <li className="text-sm">
                <strong>90-day trials</strong> becoming industry standard for automatic boxes
              </li>
              <li className="text-sm">
                <strong>Multi-cat capability</strong> critical for 46% of households
              </li>
            </ul>
          </Card>

          <Card className="p-4 border-l-4 border-purple-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Market Leadership Strategy
            </h3>
            <ul className="space-y-2">
              <li className="text-sm">
                Target <strong>86.9M US pet households</strong> (66% growth from 2022)
              </li>
              <li className="text-sm">
                Focus on <strong>technology differentiation</strong> vs established brands
              </li>
              <li className="text-sm">
                Build <strong>KOL partnerships</strong> emphasizing 35.2% growth rate
              </li>
              <li className="text-sm">
                Leverage <strong>design aesthetic</strong> to compete with Casa Leo segment
              </li>
            </ul>
          </Card>
        </div>

        {/* Key Performance Indicators */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Core KPIs & Success Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Target CPE</div>
              <div className="text-xl font-bold text-gray-900">$0.50-$5.00</div>
              <div className="text-xs text-green-600">↓ 23% vs industry</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg. Engagement</div>
              <div className="text-xl font-bold text-gray-900">3-6%</div>
              <div className="text-xs text-green-600">↑ 15% YoY</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <div className="text-xl font-bold text-gray-900">2-10%</div>
              <div className="text-xs text-green-600">↑ 32% optimized</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Revenue/Engagement</div>
              <div className="text-xl font-bold text-gray-900">$0.05-$0.50</div>
              <div className="text-xs text-green-600">↑ 45% potential</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KOLConversionRevenueAnalysis;
