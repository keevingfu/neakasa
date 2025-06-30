import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ShoppingCart,
  PieChart,
  Activity,
} from 'lucide-react';
import { EChartsFormatterParams } from '../../types/charts';

// Updated data based on the provided sales report
const campaignData = {
  summary: {
    totalUsers: 11874,
    totalRevenue: 3795.41,
    totalPurchases: 28,
    avgConversionRate: 0.236,
    avgOrderValue: 135.55,
  },
  products: {
    m1: {
      name: 'Smart Cat Litter Box (M1)',
      users: 1942,
      purchases: 1,
      revenue: 55.99,
      conversionRate: 0.052,
      avgOrderValue: 55.99,
    },
    magic1: {
      name: 'Garment Steamer (Magic1)',
      users: 10169,
      purchases: 17,
      revenue: 1821.24,
      conversionRate: 0.167,
      avgOrderValue: 107.13,
    },
  },
  channels: {
    official: { users: 1908, purchases: 2, revenue: 111.98, conversionRate: 0.1 },
    amazon: { users: 8092, purchases: 2, revenue: 959.96, conversionRate: 0.025 },
    tiktok: { users: 1874, purchases: 0, revenue: 0, conversionRate: 0 },
    meta: { users: 0, purchases: 24, revenue: 3259.44, conversionRate: 0 },
  },
  monthlyData: [
    { month: 'Week 1 (06/03-06/10)', users: 8007, revenue: 535.97, purchases: 8 },
    { month: 'Week 2 (06/11-06/14)', users: 9765, revenue: 3795.41, purchases: 20 },
    { month: 'Total (05/07-06/22)', users: 11874, revenue: 3795.41, purchases: 28 },
  ],
  landingPages: {
    '/products/n...': { users: 11480, purchases: 18, revenue: 1877.23 },
    '/products/neakasa': { users: 1817, purchases: 1, revenue: 55.99 },
    '/': { users: 8, purchases: 0, revenue: 0 },
    '/dp/...': { users: 0, purchases: 0, revenue: 0 },
  },
};

const AdCampaignAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | '30d' | '90d'>('all');
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'm1' | 'magic1'>('all');

  // Channel conversion funnel
  const getChannelFunnelOption = () => {
    const channels = Object.entries(campaignData.channels).map(([channel, data]) => ({
      name: channel.charAt(0).toUpperCase() + channel.slice(1),
      users: data.users,
      purchases: data.purchases,
      conversionRate: (data.conversionRate * 100).toFixed(2),
    }));

    return {
      title: {
        text: 'Channel Conversion Funnel',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
          const data = Array.isArray(params) ? params[0] : params;
          const channel = channels[data.dataIndex];
          return `${channel.name}<br/>Users: ${channel.users.toLocaleString()}<br/>Purchases: ${channel.purchases}<br/>Conversion: ${channel.conversionRate}%`;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: channels.map((c) => c.name),
      },
      yAxis: [
        {
          type: 'value',
          name: 'Users',
          position: 'left',
        },
        {
          type: 'value',
          name: 'Conversion Rate (%)',
          position: 'right',
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: 'Users',
          type: 'bar',
          data: channels.map((c) => c.users),
          itemStyle: { color: '#3b82f6' },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
          },
        },
        {
          name: 'Conversion Rate',
          type: 'line',
          yAxisIndex: 1,
          data: channels.map((c) => parseFloat(c.conversionRate)),
          itemStyle: { color: '#ef4444' },
          label: {
            show: true,
            formatter: '{c}%',
          },
        },
      ],
    };
  };

  // Product comparison radar
  const getProductComparisonOption = () => {
    const m1 = campaignData.products.m1;
    const magic1 = campaignData.products.magic1;

    return {
      title: {
        text: 'Product Performance Comparison',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {},
      legend: {
        data: ['M1 (Cat Litter Box)', 'Magic1 (Garment Steamer)'],
        bottom: 0,
      },
      radar: {
        indicator: [
          { name: 'Users Reached', max: 12000 },
          { name: 'Conversion Rate', max: 0.2 },
          { name: 'Total Revenue', max: 2000 },
          { name: 'Avg Order Value', max: 150 },
          { name: 'Market Response', max: 100 },
        ],
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [m1.users, m1.conversionRate, m1.revenue, m1.avgOrderValue, 20],
              name: 'M1 (Cat Litter Box)',
              itemStyle: { color: '#10b981' },
              areaStyle: { opacity: 0.3 },
            },
            {
              value: [
                magic1.users,
                magic1.conversionRate,
                magic1.revenue,
                magic1.avgOrderValue,
                85,
              ],
              name: 'Magic1 (Garment Steamer)',
              itemStyle: { color: '#8b5cf6' },
              areaStyle: { opacity: 0.3 },
            },
          ],
        },
      ],
    };
  };

  // ROI by channel
  const getROIByChannelOption = () => {
    const channelROI = Object.entries(campaignData.channels).map(([channel, data]) => ({
      name: channel.charAt(0).toUpperCase() + channel.slice(1),
      revenue: data.revenue,
      roi: data.revenue > 0 ? (data.revenue / (data.users * 0.1)).toFixed(2) : 0,
    }));

    return {
      title: {
        text: 'Channel ROI Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
          const data = Array.isArray(params) ? params[0] : params;
          const value = typeof data.value === 'number' ? data.value : 0;
          return `${data.name}<br/>Revenue: $${value.toFixed(2)}<br/>ROI: ${channelROI[data.dataIndex].roi}x`;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: channelROI.map((c) => c.name),
      },
      yAxis: {
        type: 'value',
        name: 'Revenue ($)',
        axisLabel: {
          formatter: (value: number) => `$${value}`,
        },
      },
      series: [
        {
          type: 'bar',
          data: channelROI.map((c) => c.revenue),
          itemStyle: {
            color: (params: EChartsFormatterParams) => {
              const colors = ['#e4405f', '#000000', '#ff0000', '#c13584'];
              return colors[params.dataIndex];
            },
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params: EChartsFormatterParams) => `$${(params.value as number).toFixed(0)}`,
          },
        },
      ],
    };
  };

  // Monthly trend
  const getMonthlyTrendOption = () => {
    return {
      title: {
        text: 'Campaign Performance Trend',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['Users', 'Revenue', 'Purchases'],
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
        data: campaignData.monthlyData.map((d) => d.month),
      },
      yAxis: [
        {
          type: 'value',
          name: 'Users',
          position: 'left',
        },
        {
          type: 'value',
          name: 'Revenue ($)',
          position: 'right',
          axisLabel: {
            formatter: (value: number) => `$${value}`,
          },
        },
      ],
      series: [
        {
          name: 'Users',
          type: 'bar',
          data: campaignData.monthlyData.map((d) => d.users),
          itemStyle: { color: '#3b82f6' },
        },
        {
          name: 'Revenue',
          type: 'line',
          yAxisIndex: 1,
          data: campaignData.monthlyData.map((d) => d.revenue),
          itemStyle: { color: '#10b981' },
          smooth: true,
        },
        {
          name: 'Purchases',
          type: 'line',
          data: campaignData.monthlyData.map((d) => d.purchases * 100),
          itemStyle: { color: '#ef4444' },
          smooth: true,
        },
      ],
    };
  };

  // Landing page performance
  const getLandingPageOption = () => {
    const pages = Object.entries(campaignData.landingPages)
      .filter(([_, data]) => data.users > 0)
      .map(([page, data]) => ({
        name: page,
        users: data.users,
        conversionRate: data.users > 0 ? ((data.purchases / data.users) * 100).toFixed(2) : '0',
      }));

    return {
      title: {
        text: 'Landing Page Performance',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} users ({d}%)',
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
            formatter: '{b}\n{d}%',
          },
          data: pages.map((page, index) => ({
            name: page.name,
            value: page.users,
            itemStyle: {
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index],
            },
          })),
        },
      ],
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ad Campaign Analytics</h1>
            <p className="text-gray-600 mt-1">
              Track and analyze marketing campaign performance across channels
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value as 'all' | 'm1' | 'magic1')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="m1">M1 - Cat Litter Box</option>
              <option value="magic1">Magic1 - Garment Steamer</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'all' | '30d' | '90d')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {campaignData.summary.totalUsers.toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">Users Reached</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              ${campaignData.summary.totalRevenue.toFixed(2)}
            </div>
            <div className="text-sm text-green-700">Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-purple-600">Count</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {campaignData.summary.totalPurchases}
            </div>
            <div className="text-sm text-purple-700">Purchases</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="text-xs text-orange-600">Rate</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {(campaignData.summary.avgConversionRate * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-orange-700">Conversion Rate</div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <span className="text-xs text-pink-600">AOV</span>
            </div>
            <div className="text-2xl font-bold text-pink-900">
              ${campaignData.summary.avgOrderValue.toFixed(2)}
            </div>
            <div className="text-sm text-pink-700">Avg Order Value</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getChannelFunnelOption()} style={{ height: 350 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getProductComparisonOption()} style={{ height: 350 }} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={getMonthlyTrendOption()} style={{ height: 350 }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getROIByChannelOption()} style={{ height: 350 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getLandingPageOption()} style={{ height: 350 }} />
        </div>
      </div>

      {/* Product Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-blue-600" />
            Product Performance Details
          </h2>
          <div className="space-y-4">
            {/* M1 Product */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">M1 - Smart Cat Litter Box</h3>
                  <p className="text-sm text-gray-600 mt-1">Pet Care Category</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                  Low Performance
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Users</p>
                  <p className="font-semibold">{campaignData.products.m1.users.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="font-semibold">${campaignData.products.m1.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conv. Rate</p>
                  <p className="font-semibold">
                    {(campaignData.products.m1.conversionRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Magic1 Product */}
            <div className="border rounded-xl p-4 bg-green-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Magic1 - Garment Steamer</h3>
                  <p className="text-sm text-gray-600 mt-1">Home Appliance Category</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  High Performance
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Users</p>
                  <p className="font-semibold">
                    {campaignData.products.magic1.users.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="font-semibold">
                    ${campaignData.products.magic1.revenue.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conv. Rate</p>
                  <p className="font-semibold">
                    {(campaignData.products.magic1.conversionRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Key Insights & Actions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Channel Insights</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span className="text-sm">
                    <strong>Meta</strong> dominates with 85.9% of revenue despite 0 direct traffic
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span className="text-sm">
                    <strong>Amazon</strong> has 68% of traffic but only 25.3% of revenue - needs
                    optimization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-sm">
                    <strong>TikTok Shop</strong> shows 0% conversion from 1,874 visits - urgent
                    activation needed
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Product Strategy</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span className="text-sm">
                    Focus 70% budget on <strong>Magic1 (Garment Steamer)</strong> - 3.2x better
                    conversion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span className="text-sm">
                    Reposition <strong>M1 (Cat Litter Box)</strong> or target pet owner communities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span className="text-sm">
                    Test premium pricing for M1 to match Magic1's $107 AOV
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCampaignAnalytics;
