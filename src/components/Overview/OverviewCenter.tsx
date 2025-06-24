import React from 'react';
import ReactECharts from 'echarts-for-react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Target,
  MessageSquare,
  Megaphone,
} from 'lucide-react';

const OverviewCenter: React.FC = () => {
  // KOL Platform Distribution Data
  const kolPlatformData = [
    { value: 3240, name: 'TikTok' },
    { value: 2180, name: 'Instagram' },
    { value: 1920, name: 'YouTube' },
    { value: 1280, name: 'Twitter' },
    { value: 680, name: 'Xiaohongshu' },
  ];

  // Regional Distribution Data
  const regionalData = [
    { name: 'North America', value: 4200 },
    { name: 'Europe', value: 3800 },
    { name: 'Asia-Pacific', value: 5600 },
    { name: 'Middle East', value: 1200 },
    { name: 'South America', value: 800 },
  ];

  // Search Keywords Trend Data
  const keywordsTrendData = {
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    keywords: {
      'smart home': [120, 150, 180, 220, 280, 320, 380],
      'pet tech': [80, 90, 110, 130, 160, 190, 220],
      'eco friendly': [100, 120, 140, 160, 180, 200, 240],
      'wireless charger': [60, 70, 85, 95, 110, 125, 140],
    },
  };

  // A/B Testing Results
  const abTestingData = [
    { name: 'Version A', conversionRate: 12.5, engagement: 68, ctr: 8.2 },
    { name: 'Version B', conversionRate: 15.8, engagement: 75, ctr: 10.5 },
    { name: 'Version C', conversionRate: 11.2, engagement: 62, ctr: 7.8 },
  ];

  // Private Domain Channel Performance
  const privateChannelData = [
    { channel: 'WhatsApp', users: 12500, activeRate: 78, revenue: 86000 },
    { channel: 'WeChat Work', users: 8900, activeRate: 82, revenue: 62000 },
    { channel: 'EDM', users: 25600, activeRate: 45, revenue: 48000 },
    { channel: 'LinkedIn', users: 6800, activeRate: 65, revenue: 94000 },
  ];

  // ECharts Options
  const kolPlatformOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
    },
    series: [
      {
        name: 'KOL Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: kolPlatformData,
      },
    ],
  };

  const regionalOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: regionalData.map((item) => item.name),
    },
    series: [
      {
        name: 'KOL Count',
        type: 'bar',
        data: regionalData.map((item) => item.value),
        itemStyle: {
          color: '#3B82F6',
          borderRadius: [0, 4, 4, 0],
        },
      },
    ],
  };

  const keywordsTrendOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: Object.keys(keywordsTrendData.keywords),
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: keywordsTrendData.dates,
    },
    yAxis: {
      type: 'value',
      name: 'Search Volume',
    },
    series: Object.entries(keywordsTrendData.keywords).map(([keyword, data]) => ({
      name: keyword,
      type: 'line',
      smooth: true,
      data: data,
    })),
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Marketing Data Overview</h1>
        <p className="text-gray-600 mt-2">
          Real-time tracking of omni-channel marketing performance, driving data-driven decisions
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">12,486</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23.5% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active KOLs</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">9,300</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18.2% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">156.8M</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +45.3% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Value</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">$2.86M</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +32.7% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* KOL Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            KOL Platform Distribution
          </h3>
          <ReactECharts option={kolPlatformOption} style={{ height: '300px' }} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            KOL Regional Distribution
          </h3>
          <ReactECharts option={regionalOption} style={{ height: '300px' }} />
        </div>
      </div>

      {/* Search Insights Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Trending Search Keywords
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ReactECharts option={keywordsTrendOption} style={{ height: '300px' }} />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <h4 className="font-medium text-gray-700 mb-2">CPC Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average CPC</span>
                  <span className="font-semibold">$2.45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Highest CPC</span>
                  <span className="font-semibold text-red-600">$5.80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lowest CPC</span>
                  <span className="font-semibold text-green-600">$0.85</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl">
              <h4 className="font-medium text-gray-700 mb-2">Top Search Volume Growth</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">smart home</span>
                  <span className="text-sm font-semibold text-green-600">+216%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">pet tech</span>
                  <span className="text-sm font-semibold text-green-600">+175%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">eco friendly</span>
                  <span className="text-sm font-semibold text-green-600">+140%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A/B Testing & Ad Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-600" />
            A/B Test Results
          </h3>
          <div className="space-y-4">
            {abTestingData.map((test, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">{test.name}</h4>
                  {index === 1 && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Best Performance
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Conversion Rate</p>
                    <p className="text-lg font-semibold">{test.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Engagement Rate</p>
                    <p className="text-lg font-semibold">{test.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CTR</p>
                    <p className="text-lg font-semibold">{test.ctr}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Megaphone className="w-5 h-5 mr-2 text-red-600" />
            Ad Campaign Overview
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-600">Total Ad Spend</p>
                <p className="text-xl font-bold text-gray-800 mt-1">$128,650</p>
                <p className="text-xs text-gray-500 mt-1">This Month</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-600">Average ROAS</p>
                <p className="text-xl font-bold text-gray-800 mt-1">4.2x</p>
                <p className="text-xs text-green-600 mt-1">+0.8 vs last month</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Channel Performance</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Facebook Ads</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Google Ads</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">TikTok Ads</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: '82%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Private Domain Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
          Private Domain Marketing Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {privateChannelData.map((channel, index) => (
            <div key={index} className="border border-gray-100 rounded-2xl p-4">
              <h4 className="font-medium text-gray-700 mb-3">{channel.channel}</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Users</span>
                  <span className="font-semibold">{channel.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Rate</span>
                  <span className="font-semibold text-green-600">{channel.activeRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold">${channel.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600">Total Private Domain Value</p>
              <p className="text-2xl font-bold text-indigo-800 mt-1">$290,000</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-600">Average User Value</p>
              <p className="text-2xl font-bold text-indigo-800 mt-1">$5.42</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCenter;
