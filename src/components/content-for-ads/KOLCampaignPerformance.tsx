import React, { useState } from 'react';
import { Card } from '../ui/card';
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Instagram,
  Globe,
  Link,
  Target,
  Award,
  Calculator,
  ArrowUpRight,
} from 'lucide-react';
import { CustomTooltipProps } from '../../types/charts';

interface WeekData {
  week: string;
  m1Orders: number;
  steamerOrders: number;
  p1Orders?: number;
  totalRevenue: number;
  amazonRevenue: number;
  websiteRevenue: number;
  tiktokRevenue?: number;
  totalCost: number;
  roi: number;
}

const KOLCampaignPerformance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week1' | 'week2' | 'overall'>('overall');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'amazon' | 'website' | 'tiktok'>(
    'all'
  );

  // Two-week overall data
  const overallData = {
    m1Orders: 22,
    steamerOrders: 31,
    totalSales: 13327.69,
    totalCost: 1913.34,
    roi: 6.97,
    m1Samples: 11,
    marketingCost: 0,
  };

  // Week 1 data
  const week1Data: WeekData = {
    week: 'Week 1',
    m1Orders: 12,
    steamerOrders: 1,
    p1Orders: 1,
    totalRevenue: 5873.32,
    amazonRevenue: 985.97,
    websiteRevenue: 4887.35,
    tiktokRevenue: 0,
    totalCost: 956.67, // Estimated half of total cost
    roi: 6.14,
  };

  // Week 2 data
  const week2Data: WeekData = {
    week: 'Week 2',
    m1Orders: 18,
    steamerOrders: 8,
    totalRevenue: 7454.37, // 13327.69 - 5873.32
    amazonRevenue: 2191.93,
    websiteRevenue: 5019.87,
    tiktokRevenue: 198,
    totalCost: 956.67,
    roi: 7.79,
  };

  // Channel breakdown data
  const channelBreakdown = [
    {
      channel: 'Amazon US',
      m1Orders: 16,
      steamerOrders: 34,
      revenue: 7418.56,
      percentage: 55.7,
      color: '#FF9500',
    },
    {
      channel: 'Official Website',
      m1Orders: 26,
      steamerOrders: 4,
      revenue: 11210.19,
      percentage: 42.1,
      color: '#007AFF',
    },
    {
      channel: 'TikTok Shop',
      m1Orders: 0,
      steamerOrders: 3,
      revenue: 287.99,
      percentage: 2.2,
      color: '#000000',
    },
  ];

  // Product performance comparison
  const productComparison = [
    {
      product: 'M1 Cat Litter Box',
      orders: 42,
      revenue: 16946.31,
      avgPrice: 403.48,
      roi: 8.86,
    },
    {
      product: 'Garment Steamer',
      orders: 41,
      revenue: 3596.62,
      avgPrice: 87.72,
      roi: 1.88,
    },
    {
      product: 'P1',
      orders: 1,
      revenue: 85.66,
      avgPrice: 85.66,
      roi: 0.04,
    },
  ];

  // Attribution breakdown
  const attributionData = [
    {
      source: 'Attribution Link',
      m1Orders: 2,
      steamerOrders: 5,
      revenue: 899.98 + 419.96,
      type: 'Direct',
    },
    {
      source: 'CC (Click Card)',
      m1Orders: 7,
      steamerOrders: 29,
      revenue: 3411.02 + 2099.76,
      type: 'Tracked',
    },
    {
      source: 'Instagram Reel',
      m1Orders: 0,
      steamerOrders: 19,
      revenue: 2519.72,
      type: 'Social',
      link: 'https://www.instagram.com/reel/DKUTKK4J3Ra/',
    },
    {
      source: 'Direct/Organic',
      m1Orders: 33,
      steamerOrders: 7,
      revenue: 11060.01,
      type: 'Organic',
    },
  ];

  // Weekly trend data
  const weeklyTrend = [week1Data, week2Data];

  // Cost structure
  const costStructure = [
    { name: 'Product Samples', value: 1913.34, percentage: 100 },
    { name: 'Marketing Spend', value: 0, percentage: 0 },
  ];

  // ROI by channel
  const roiByChannel = [
    { channel: 'Amazon US', roi: 3.88, revenue: 7418.56, cost: 1913.34 * 0.557 },
    { channel: 'Official Website', roi: 13.91, revenue: 11210.19, cost: 1913.34 * 0.421 },
    { channel: 'TikTok Shop', roi: 6.89, revenue: 287.99, cost: 1913.34 * 0.022 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}:{' '}
              {entry.dataKey.includes('revenue') || entry.dataKey.includes('Revenue')
                ? `$${Number(entry.value).toFixed(2)}`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Filter data based on selection
  const getFilteredChannelData = () => {
    if (selectedChannel === 'all') return channelBreakdown;
    return channelBreakdown.filter((ch) => ch.channel.toLowerCase().includes(selectedChannel));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">KOL Campaign Performance Analysis</h2>
          <p className="text-gray-600 mt-1">Two-week conversion tracking and ROI analysis</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'week1' | 'week2' | 'overall')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overall">Overall (2 Weeks)</option>
            <option value="week1">Week 1</option>
            <option value="week2">Week 2</option>
          </select>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value as 'all' | 'amazon' | 'website' | 'tiktok')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Channels</option>
            <option value="amazon">Amazon US</option>
            <option value="website">Official Website</option>
            <option value="tiktok">TikTok Shop</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Overall ROI</p>
              <p className="text-3xl font-bold text-green-900">{overallData.roi}x</p>
              <p className="text-sm text-green-700 mt-1">697% return</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${overallData.totalSales.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">53 orders</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold">${overallData.totalCost}</p>
              <p className="text-sm text-gray-600 mt-1">11 samples</p>
            </div>
            <Package className="w-10 h-10 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">M1 Orders</p>
              <p className="text-2xl font-bold">{overallData.m1Orders}</p>
              <p className="text-sm text-green-600 mt-1">$408 avg</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Steamer Orders</p>
              <p className="text-2xl font-bold">{overallData.steamerOrders}</p>
              <p className="text-sm text-blue-600 mt-1">$90 avg</p>
            </div>
            <Award className="w-10 h-10 text-indigo-600" />
          </div>
        </Card>
      </div>

      {/* Weekly Performance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="m1Orders" name="M1 Orders" fill="#10B981" />
              <Bar yAxisId="left" dataKey="steamerOrders" name="Steamer Orders" fill="#3B82F6" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="roi"
                name="ROI"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Channel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getFilteredChannelData()}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="revenue"
              >
                {getFilteredChannelData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {getFilteredChannelData().map((channel, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                  <span>{channel.channel}</span>
                </div>
                <span className="font-medium">{channel.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Product Performance Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Product Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" angle={-15} textAnchor="end" height={80} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3B82F6" />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#10B981" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="roi"
              name="ROI"
              stroke="#F59E0B"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Attribution Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Attribution Source Analysis</h3>
          <div className="space-y-4">
            {attributionData.map((source, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {source.type === 'Social' && <Instagram className="w-5 h-5 text-pink-600" />}
                    {source.type === 'Direct' && <Link className="w-5 h-5 text-blue-600" />}
                    {source.type === 'Tracked' && <Target className="w-5 h-5 text-green-600" />}
                    {source.type === 'Organic' && <Globe className="w-5 h-5 text-gray-600" />}
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <span className="text-lg font-bold">${source.revenue.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">M1 Orders: </span>
                    <span className="font-medium">{source.m1Orders}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Steamer Orders: </span>
                    <span className="font-medium">{source.steamerOrders}</span>
                  </div>
                </div>
                {source.link && (
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View Source <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">ROI by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiByChannel} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="channel" type="category" width={100} />
              <Tooltip
                formatter={(value: number | string) => (typeof value === 'number' ? value.toFixed(2) : value)}
              />
              <Bar dataKey="roi" name="ROI (x)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Cost Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cost Structure</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={costStructure}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#E5E7EB" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-2xl font-bold">${overallData.totalCost}</p>
            <p className="text-xs text-green-600 mt-1">Zero marketing spend</p>
          </div>
        </Card>

        <Card className="p-6 col-span-2">
          <h3 className="text-lg font-semibold mb-4">Key Performance Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Exceptional ROI Performance</p>
                <p className="text-xs text-gray-600">
                  6.97x overall ROI with zero marketing spend, driven by influencer sampling
                  strategy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Instagram Reel Success</p>
                <p className="text-xs text-gray-600">
                  Single Instagram reel generated 19 Amazon conversions worth $2,519.72
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Official Website Dominance</p>
                <p className="text-xs text-gray-600">
                  42.1% of revenue from official website with highest ROI (13.91x)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Product Mix Optimization</p>
                <p className="text-xs text-gray-600">
                  M1 drives premium revenue ($408 avg) while steamer provides volume (31 units)
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-blue-600" />
          Strategic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Scale Winners</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Increase Instagram reel collaborations</li>
              <li>• Send more M1 samples (11→25 units)</li>
              <li>• Focus on official website conversions</li>
              <li>• Maintain zero paid marketing approach</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Channel Optimization</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Develop Amazon attribution links</li>
              <li>• Create TikTok Shop campaigns</li>
              <li>• Implement influencer tracking codes</li>
              <li>• Build referral incentive program</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Product Strategy</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Bundle M1 + Steamer for higher AOV</li>
              <li>• Phase out P1 (low performance)</li>
              <li>• Create steamer-focused content</li>
              <li>• Test new product sampling</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KOLCampaignPerformance;
