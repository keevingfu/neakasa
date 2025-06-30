import React from 'react';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Globe,
  ShoppingCart,
  MousePointer,
  Target,
  Activity,
  ArrowRight,
  Zap,
  Award,
} from 'lucide-react';

const ContentAdsOverview: React.FC = () => {
  const navigate = useNavigate();

  // Summary metrics from all data sources
  const summaryMetrics = {
    // Channel Performance Data
    totalTraffic: 11874,
    totalRevenue: 3795.41,
    bestChannel: 'Meta',
    channelEfficiency: 85.9,

    // Campaign Detail Data
    totalCampaigns: 7,
    totalDPV: 21281,
    totalPurchases: 520,
    campaignROI: 356.7,

    // Pricing Strategy Data
    avgDiscount: 34.5,
    primeRevenue: 859.97,
    bestDeal: 'Magic1 46.7%',

    // Global Market Data
    globalMarkets: 9,
    totalSKUs: 22,
    regions: 3,
    extendedReach: '2.5B',
  };

  // Channel performance mini chart
  const channelData = [
    { name: 'Meta', value: 3259.44, percentage: 85.9 },
    { name: 'Amazon', value: 479.98, percentage: 12.6 },
    { name: 'Official', value: 55.99, percentage: 1.5 },
    { name: 'TikTok', value: 0, percentage: 0 },
  ];

  // Product performance comparison
  const productPerformance = [
    { product: 'M1', sales: 535.97, units: 130, markets: 11 },
    { product: 'M1 Lite', sales: 399.99, units: 5, markets: 5 },
    { product: 'Magic1', sales: 1984.77, units: 391, markets: 6 },
  ];

  // Regional distribution
  const regionalData = [
    { name: 'Americas', value: 5, revenue: 45000 },
    { name: 'Europe', value: 14, revenue: 120000 },
    { name: 'APAC', value: 3, revenue: 35000 },
  ];

  // Weekly trend
  const weeklyTrend = [
    { week: 'W1', traffic: 8007, revenue: 535.97 },
    { week: 'W2', traffic: 9765, revenue: 3795.41 },
    { week: 'W3 (Est)', traffic: 12000, revenue: 4500 },
  ];

  // Campaign effectiveness
  const campaignEffectiveness = [
    { metric: 'Reach', value: 85 },
    { metric: 'Engagement', value: 72 },
    { metric: 'Conversion', value: 23.6 },
    { metric: 'ROI', value: 356.7 },
    { metric: 'Efficiency', value: 91 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Navigation cards data
  const navigationCards = [
    {
      title: 'Campaign Analytics',
      description: 'Track campaign performance metrics and ROI',
      icon: Activity,
      color: 'blue',
      path: '/content-ads/campaign-analytics',
      metric: '18 active campaigns',
    },
    {
      title: 'Channel Performance',
      description: 'Multi-channel traffic and revenue analysis',
      icon: Target,
      color: 'green',
      path: '/content-ads/channel-performance',
      metric: 'Meta 85.9% revenue',
    },
    {
      title: 'Campaign Details',
      description: 'Deep dive into individual campaigns',
      icon: MousePointer,
      color: 'purple',
      path: '/content-ads/campaign-details',
      metric: '520 total purchases',
    },
    {
      title: 'Pricing Strategy',
      description: 'Prime Day and promotional pricing',
      icon: DollarSign,
      color: 'orange',
      path: '/content-ads/pricing-strategy',
      metric: '34.5% avg discount',
    },
    {
      title: 'Global Prime Day',
      description: 'International market performance',
      icon: Globe,
      color: 'indigo',
      path: '/content-ads/global-prime-day',
      metric: '9 global markets',
    },
    {
      title: 'Pricing Comparison',
      description: 'Neakasa vs Amazon pricing & A/B testing',
      icon: Zap,
      color: 'red',
      path: '/content-ads/pricing-comparison',
      metric: 'A/B test active',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content for Ads Overview</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive advertising performance across channels, campaigns, and global markets
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-900">${summaryMetrics.totalRevenue}</p>
              <p className="text-sm text-blue-700 mt-1">+608% growth W2</p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Campaign ROI</p>
              <p className="text-3xl font-bold text-green-900">{summaryMetrics.campaignROI}%</p>
              <p className="text-sm text-green-700 mt-1">Excellent performance</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Global Markets</p>
              <p className="text-3xl font-bold text-purple-900">{summaryMetrics.globalMarkets}</p>
              <p className="text-sm text-purple-700 mt-1">{summaryMetrics.regions} regions</p>
            </div>
            <Globe className="w-12 h-12 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Total Purchases</p>
              <p className="text-3xl font-bold text-orange-900">{summaryMetrics.totalPurchases}</p>
              <p className="text-sm text-orange-700 mt-1">2.4% conversion</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Revenue Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Channel Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {channelData.map((channel, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{channel.name}</span>
                </div>
                <span className="font-medium">{channel.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Performance Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyTrend}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="traffic"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorTraffic)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Product and Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Performance */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Product Performance Summary</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#3B82F6" />
              <Bar yAxisId="right" dataKey="units" name="Units Sold" fill="#10B981" />
              <Bar yAxisId="right" dataKey="markets" name="Markets" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Campaign Effectiveness Radar */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign Effectiveness</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              data={campaignEffectiveness}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="value"
                fill="#8B5CF6"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(card.path)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium text-${card.color}-600`}>
                    {card.metric}
                  </span>
                  <span className="text-xs text-gray-500">View details →</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-600" />
          Key Insights & Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Performance Highlights</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Meta channel delivers 85.9% of revenue with $0 direct traffic cost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Magic1 steamer outperforms with 71% of campaign revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Europe leads with 14 product listings across 5 markets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Prime Day delivers 34.5% average discount driving volume</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Immediate Actions</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Scale Meta campaigns immediately - exceptional ROI proven</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Activate TikTok Shop - 1,874 visits with 0% conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Fix M1 purchase funnel - high interest but low conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Expand Magic1 to US/APAC markets following EU success</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Performance Badge */}
      <Card className="p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Outstanding Performance</h3>
            <p className="text-green-100">
              Your advertising campaigns achieved 356.7% ROI with 608% week-over-week growth
            </p>
          </div>
          <Award className="w-24 h-24 text-white/20" />
        </div>
      </Card>
    </div>
  );
};

export default ContentAdsOverview;
