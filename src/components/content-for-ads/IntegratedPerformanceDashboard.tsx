import React, { useState } from 'react';
import { Card } from '../ui/card';
import {
  BarChart,
  Bar,
  LineChart,
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
  Area,
  Treemap
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Target,
  Instagram,
  Calculator,
  Package,
  AlertCircle,
  Zap
} from 'lucide-react';

const IntegratedPerformanceDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'pricing' | 'conversion' | 'channel' | 'attribution'>('pricing');
  const [timeRange, setTimeRange] = useState<'week1' | 'week2' | 'overall'>('overall');

  // Pricing discount effectiveness analysis
  const pricingEffectiveness = [
    {
      product: 'M1',
      listPrice: 518.98,
      discount: 40.00,
      discountRate: 7.7,
      finalPrice: 478.98,
      amazonPrice: 379.99,
      pricePremium: 98.99,
      premiumRate: 26.1,
      conversionRate: 3.2,
      revenue: 10548.56
    },
    {
      product: 'Magic 1',
      listPrice: 84.55,
      discount: 16.91,
      discountRate: 20.0,
      finalPrice: 67.64,
      amazonPrice: 69.99,
      pricePremium: -2.35,
      premiumRate: -3.4,
      conversionRate: 8.7,
      revenue: 2096.84
    },
    {
      product: 'M1 Lite',
      listPrice: 449.98,
      discount: 40.00,
      discountRate: 8.9,
      finalPrice: 409.98,
      amazonPrice: 382.49,
      pricePremium: 27.49,
      premiumRate: 7.2,
      conversionRate: 0,
      revenue: 0
    }
  ];

  // Channel ROI analysis with cost allocation
  const channelROI = [
    {
      channel: 'Amazon US',
      orders: 44,
      revenue: 7508.54,
      costAllocation: 1066.12,
      roi: 7.04,
      avgOrderValue: 170.65,
      conversionCost: 24.23
    },
    {
      channel: 'Official Website',
      orders: 28,
      revenue: 11446.70,
      costAllocation: 796.41,
      roi: 14.37,
      avgOrderValue: 408.81,
      conversionCost: 28.44
    },
    {
      channel: 'TikTok Shop',
      orders: 3,
      revenue: 287.99,
      costAllocation: 50.81,
      roi: 5.67,
      avgOrderValue: 96.00,
      conversionCost: 16.94
    }
  ];

  // Attribution source effectiveness
  const attributionEffectiveness = [
    {
      source: 'Instagram Reel',
      impressions: 125000,
      clicks: 2850,
      conversions: 19,
      revenue: 2519.72,
      ctr: 2.28,
      conversionRate: 0.67,
      roas: 'Infinite',
      highlight: true
    },
    {
      source: 'Attribution Link',
      impressions: 45000,
      clicks: 890,
      conversions: 7,
      revenue: 1319.94,
      ctr: 1.98,
      conversionRate: 0.79,
      roas: 'Infinite'
    },
    {
      source: 'CC (Click Card)',
      impressions: 78000,
      clicks: 1560,
      conversions: 36,
      revenue: 5510.78,
      ctr: 2.00,
      conversionRate: 2.31,
      roas: 'Infinite'
    },
    {
      source: 'Direct/Organic',
      impressions: 0,
      clicks: 0,
      conversions: 13,
      revenue: 3976.79,
      ctr: 0,
      conversionRate: 0,
      roas: 'N/A'
    }
  ];

  // Conversion funnel by week
  const conversionFunnel = [
    {
      stage: 'Samples Sent',
      week1: 11,
      week2: 0,
      total: 11
    },
    {
      stage: 'Content Created',
      week1: 8,
      week2: 12,
      total: 20
    },
    {
      stage: 'Impressions',
      week1: 125000,
      week2: 123000,
      total: 248000
    },
    {
      stage: 'Clicks',
      week1: 2650,
      week2: 3650,
      total: 6300
    },
    {
      stage: 'Orders',
      week1: 14,
      week2: 39,
      total: 53
    }
  ];

  // Price optimization matrix
  const priceOptimizationMatrix = [
    { price: 350, demand: 45, revenue: 15750, profit: 13837 },
    { price: 380, demand: 38, revenue: 14440, profit: 12684 },
    { price: 410, demand: 28, revenue: 11480, profit: 10088 },
    { price: 440, demand: 18, revenue: 7920, profit: 6956 },
    { price: 470, demand: 10, revenue: 4700, profit: 4130 },
    { price: 500, demand: 5, revenue: 2500, profit: 2195 }
  ];

  // Product mix performance
  const productMixPerformance = [
    {
      product: 'M1',
      weeklyTrend: [
        { week: 'W1', orders: 12, revenue: 5100 },
        { week: 'W2', orders: 10, revenue: 4200 }
      ],
      totalOrders: 22,
      avgPrice: 479.48,
      marginRate: 65.2
    },
    {
      product: 'Magic 1',
      weeklyTrend: [
        { week: 'W1', orders: 1, revenue: 90 },
        { week: 'W2', orders: 30, revenue: 2700 }
      ],
      totalOrders: 31,
      avgPrice: 87.06,
      marginRate: 48.5
    }
  ];

  // Custom gradient colors
  const COLORS = {
    primary: ['#3B82F6', '#60A5FA', '#93BBFC'],
    success: ['#10B981', '#34D399', '#6EE7B7'],
    warning: ['#F59E0B', '#FBBF24', '#FCD34D'],
    danger: ['#EF4444', '#F87171', '#FCA5A5']
  };

  // Advanced tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-4 text-xs">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-medium">
                {entry.dataKey.includes('revenue') || entry.dataKey.includes('Price') || entry.dataKey.includes('price')
                  ? `$${Number(entry.value).toFixed(2)}`
                  : entry.dataKey.includes('rate') || entry.dataKey.includes('Rate')
                  ? `${Number(entry.value).toFixed(1)}%`
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integrated Performance Dashboard</h2>
          <p className="text-gray-600 mt-1">Comprehensive pricing, conversion, and attribution analysis</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pricing">Pricing Analysis</option>
            <option value="conversion">Conversion Funnel</option>
            <option value="channel">Channel Performance</option>
            <option value="attribution">Attribution Analysis</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overall">Overall</option>
            <option value="week1">Week 1</option>
            <option value="week2">Week 2</option>
          </select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">ROAS</p>
              <p className="text-2xl font-bold text-green-900">∞</p>
              <p className="text-xs text-green-700 mt-1">$0 marketing</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold">0.84%</p>
              <p className="text-xs text-blue-600 mt-1">53/6300 clicks</p>
            </div>
            <Target className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold">$251.41</p>
              <p className="text-xs text-gray-600 mt-1">+15% vs target</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sample Efficiency</p>
              <p className="text-2xl font-bold">4.82x</p>
              <p className="text-xs text-gray-600 mt-1">53 orders/11 samples</p>
            </div>
            <Package className="w-10 h-10 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Instagram Impact</p>
              <p className="text-2xl font-bold">35.8%</p>
              <p className="text-xs text-pink-600 mt-1">of steamer sales</p>
            </div>
            <Instagram className="w-10 h-10 text-pink-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cost per Order</p>
              <p className="text-2xl font-bold">$36.10</p>
              <p className="text-xs text-green-600 mt-1">-64% vs CAC</p>
            </div>
            <Calculator className="w-10 h-10 text-indigo-600" />
          </div>
        </Card>
      </div>

      {selectedMetric === 'pricing' && (
        <>
          {/* Pricing Strategy Effectiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Price vs Amazon Premium Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={pricingEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="finalPrice" name="Neakasa Price" fill="#3B82F6" />
                  <Bar yAxisId="left" dataKey="amazonPrice" name="Amazon Price" fill="#10B981" />
                  <Line yAxisId="right" type="monotone" dataKey="premiumRate" name="Premium %" stroke="#F59E0B" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Discount Impact on Conversion</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pricingEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="discountRate" name="Discount %" fill="#10B981" />
                  <Bar yAxisId="right" dataKey="conversionRate" name="Conversion %" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Price Optimization Analysis */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Price Elasticity & Revenue Optimization</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={priceOptimizationMatrix}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" fill="#3B82F6" fillOpacity={0.6} />
                <Line yAxisId="right" type="monotone" dataKey="demand" name="Demand" stroke="#10B981" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="profit" name="Profit" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}

      {selectedMetric === 'conversion' && (
        <>
          {/* Conversion Funnel Visualization */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Conversion Funnel Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={conversionFunnel} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="week1" name="Week 1" fill="#3B82F6" stackId="a" />
                <Bar dataKey="week2" name="Week 2" fill="#10B981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Product Mix Weekly Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {productMixPerformance.map((product, index) => (
              <Card key={index} className="p-6">
                <h4 className="text-lg font-semibold mb-4">{product.product} Weekly Performance</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={product.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="orders" name="Orders" stroke="#3B82F6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold">{product.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Price</p>
                    <p className="text-xl font-bold">${product.avgPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Margin</p>
                    <p className="text-xl font-bold text-green-600">{product.marginRate}%</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedMetric === 'channel' && (
        <>
          {/* Channel ROI Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Channel ROI & Cost Efficiency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={channelROI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="roi" name="ROI (x)" fill="#10B981" />
                  <Line yAxisId="right" type="monotone" dataKey="conversionCost" name="Cost per Order" stroke="#EF4444" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Channel Revenue & Order Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <Treemap
                  data={channelROI.map(ch => ({
                    name: ch.channel,
                    size: ch.revenue,
                    orders: ch.orders,
                    aov: ch.avgOrderValue
                  }))}
                  dataKey="size"
                  aspectRatio={4/3}
                  stroke="#fff"
                  fill="#8884d8"
                >
                  <Tooltip 
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-sm">Revenue: ${data.size.toFixed(2)}</p>
                            <p className="text-sm">Orders: {data.orders}</p>
                            <p className="text-sm">AOV: ${data.aov.toFixed(2)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </Treemap>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}

      {selectedMetric === 'attribution' && (
        <>
          {/* Attribution Source Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Attribution Source Effectiveness</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Source</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Impressions</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">CTR</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Conversions</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Conv. Rate</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Revenue</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attributionEffectiveness.map((source, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${source.highlight ? 'bg-yellow-50' : ''}`}>
                      <td className="px-4 py-3 font-medium flex items-center gap-2">
                        {source.source === 'Instagram Reel' && <Instagram className="w-4 h-4 text-pink-600" />}
                        {source.source}
                      </td>
                      <td className="px-4 py-3 text-right">{source.impressions.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">{source.ctr > 0 ? `${source.ctr}%` : '-'}</td>
                      <td className="px-4 py-3 text-right font-medium">{source.conversions}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-medium ${source.conversionRate > 1 ? 'text-green-600' : ''}`}>
                          {source.conversionRate > 0 ? `${source.conversionRate}%` : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">${source.revenue.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {source.roas}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Attribution Impact Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Revenue by Attribution Source</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attributionEffectiveness.filter(s => s.revenue > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="revenue"
                    label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {attributionEffectiveness.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Instagram className="w-5 h-5 mr-2 text-pink-600" />
                Instagram Reel Impact Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Total Reach</span>
                  <span className="text-xl font-bold">125K</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Engagement Rate</span>
                  <span className="text-xl font-bold text-pink-600">2.28%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Direct Sales</span>
                  <span className="text-xl font-bold text-green-600">$2,519.72</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium">Cost per Acquisition</span>
                  <span className="text-xl font-bold text-blue-600">$0.00</span>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Single reel generated 61% of all garment steamer Amazon sales
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Strategic Insights Panel */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-600" />
          Integrated Strategic Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Pricing Strategy Success</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start gap-1">
                <span className="text-green-600">✓</span>
                <span>A/B test shows Amazon price matching drives conversions</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-600">✓</span>
                <span>20% discount on Magic 1 achieved 8.7% conversion rate</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-yellow-600">!</span>
                <span>M1 Lite needs pricing adjustment (0 conversions)</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Channel Optimization</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start gap-1">
                <span className="text-blue-600">→</span>
                <span>Official Website: 14.37x ROI with premium AOV ($408)</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-blue-600">→</span>
                <span>Amazon: Volume driver with 44 orders</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-blue-600">→</span>
                <span>TikTok Shop: Emerging channel needs focus</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Growth Opportunities</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li className="flex items-start gap-1">
                <span className="text-purple-600">★</span>
                <span>Scale Instagram Reel strategy (infinite ROAS)</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-purple-600">★</span>
                <span>Implement dynamic pricing at $380-410 sweet spot</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-purple-600">★</span>
                <span>Increase sample efficiency to 6x (target: 66 orders)</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntegratedPerformanceDashboard;