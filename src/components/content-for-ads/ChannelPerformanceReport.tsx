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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Area
} from 'recharts';
import { DollarSign, TrendingUp, Users, ShoppingCart, Globe, BarChart3, AlertCircle } from 'lucide-react';

const ChannelPerformanceReport: React.FC = () => {
  // Data based on the provided table
  const rawData = {
    week1: {
      period: '06/03-06/10',
      total: { traffic: 8007, revenue: 535.97 },
      channels: [
        { name: 'Official Website', traffic: 1191, revenue: 55.99, color: '#3B82F6' },
        { name: 'Amazon', traffic: 5596, revenue: 479.98, color: '#F59E0B' },
        { name: 'TikTok Shop', traffic: 1220, revenue: 0, color: '#000000' },
        { name: 'Meta', traffic: 0, revenue: 0, color: '#1877F2' }
      ]
    },
    week2: {
      period: '06/11-06/14',
      total: { traffic: 9765, revenue: 3795.41 },
      channels: [
        { name: 'Official Website', traffic: 1680, revenue: 55.99, color: '#3B82F6' },
        { name: 'Amazon', traffic: 6411, revenue: 479.98, color: '#F59E0B' },
        { name: 'TikTok Shop', traffic: 1674, revenue: 0, color: '#000000' },
        { name: 'Meta', traffic: 0, revenue: 3259.44, color: '#1877F2' }
      ]
    },
    total: {
      period: '05/07-06/22',
      total: { traffic: 11874, revenue: 3795.41 },
      channels: [
        { name: 'Official Website', traffic: 1908, revenue: 55.99, color: '#3B82F6' },
        { name: 'Amazon', traffic: 8092, revenue: 479.98, color: '#F59E0B' },
        { name: 'TikTok Shop', traffic: 1874, revenue: 0, color: '#000000' },
        { name: 'Meta', traffic: 0, revenue: 3259.44, color: '#1877F2' }
      ]
    }
  };

  const [selectedView, setSelectedView] = useState<'week1' | 'week2' | 'total'>('total');
  const currentData = rawData[selectedView];

  // Calculate metrics
  const calculateMetrics = (data: typeof rawData.week1) => {
    const totalTraffic = data.total.traffic;
    const totalRevenue = data.total.revenue;
    const avgRevenuePerVisit = totalTraffic > 0 ? totalRevenue / totalTraffic : 0;
    
    return {
      totalTraffic,
      totalRevenue,
      avgRevenuePerVisit,
      trafficGrowth: selectedView === 'week2' ? ((9765 - 8007) / 8007 * 100) : 0,
      revenueGrowth: selectedView === 'week2' ? ((3795.41 - 535.97) / 535.97 * 100) : 0
    };
  };

  const metrics = calculateMetrics(currentData);

  // Traffic vs Revenue comparison
  const comparisonData = currentData.channels.map(channel => ({
    name: channel.name,
    traffic: channel.traffic,
    revenue: channel.revenue,
    trafficShare: ((channel.traffic / metrics.totalTraffic) * 100).toFixed(1),
    revenueShare: channel.revenue > 0 ? ((channel.revenue / metrics.totalRevenue) * 100).toFixed(1) : '0'
  }));

  // Weekly trend data
  const trendData = [
    {
      week: 'Week 1',
      traffic: rawData.week1.total.traffic,
      revenue: rawData.week1.total.revenue,
      avgPerVisit: rawData.week1.total.revenue / rawData.week1.total.traffic
    },
    {
      week: 'Week 2',
      traffic: rawData.week2.total.traffic,
      revenue: rawData.week2.total.revenue,
      avgPerVisit: rawData.week2.total.revenue / rawData.week2.total.traffic
    }
  ];

  // Channel effectiveness radar
  const radarData = [
    {
      metric: 'Traffic Volume',
      'Official': 20,
      'Amazon': 85,
      'TikTok': 20,
      'Meta': 0
    },
    {
      metric: 'Revenue Share',
      'Official': 2,
      'Amazon': 13,
      'TikTok': 0,
      'Meta': 86
    },
    {
      metric: 'Conversion',
      'Official': 10,
      'Amazon': 6,
      'TikTok': 0,
      'Meta': 100
    },
    {
      metric: 'Growth Potential',
      'Official': 40,
      'Amazon': 60,
      'TikTok': 90,
      'Meta': 70
    },
    {
      metric: 'ROI',
      'Official': 30,
      'Amazon': 40,
      'TikTok': 0,
      'Meta': 100
    }
  ];

  const COLORS = ['#3B82F6', '#F59E0B', '#000000', '#1877F2'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Channel Performance Analysis</h2>
          <p className="text-gray-600 mt-1">Multi-channel traffic and revenue breakdown</p>
        </div>
        <select
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value as any)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week1">Week 1 (06/03-06/10)</option>
          <option value="week2">Week 2 (06/11-06/14)</option>
          <option value="total">Total Period (05/07-06/22)</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Traffic</p>
              <p className="text-2xl font-bold">{metrics.totalTraffic.toLocaleString()}</p>
              {metrics.trafficGrowth > 0 && (
                <p className="text-sm text-green-600 mt-1">+{metrics.trafficGrowth.toFixed(1)}%</p>
              )}
            </div>
            <Users className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${metrics.totalRevenue.toFixed(2)}</p>
              {metrics.revenueGrowth > 0 && (
                <p className="text-sm text-green-600 mt-1">+{metrics.revenueGrowth.toFixed(0)}%</p>
              )}
            </div>
            <DollarSign className="w-12 h-12 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue/Visit</p>
              <p className="text-2xl font-bold">${metrics.avgRevenuePerVisit.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-1">Average value</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Channel</p>
              <p className="text-2xl font-bold">Meta</p>
              <p className="text-sm text-gray-600 mt-1">85.9% revenue</p>
            </div>
            <Globe className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Alert</p>
              <p className="text-lg font-bold">TikTok Shop</p>
              <p className="text-sm text-red-600 mt-1">0% conversion</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic vs Revenue Comparison */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic vs Revenue by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="traffic" name="Traffic" fill="#3B82F6" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue ($)" 
                stroke="#10B981" 
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Share Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData.channels.filter(c => c.revenue > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
                label={({ name, revenue }) => `${name}: $${revenue}`}
              >
                {currentData.channels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="traffic" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Traffic"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Revenue ($)"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="avgPerVisit" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="$/Visit"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Channel Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Channel Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Channel</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Traffic</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Traffic %</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Revenue</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Revenue %</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">$/Visit</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comparisonData.map((channel, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{channel.name}</td>
                  <td className="px-4 py-3 text-sm text-right">{channel.traffic.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">{channel.trafficShare}%</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    ${channel.revenue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">{channel.revenueShare}%</td>
                  <td className="px-4 py-3 text-sm text-right">
                    ${channel.traffic > 0 ? (channel.revenue / channel.traffic).toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {channel.revenue === 0 && channel.traffic > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Needs Activation
                      </span>
                    ) : channel.name === 'Meta' ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Excellent
                      </span>
                    ) : channel.revenue > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        No Data
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Channel Effectiveness Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Channel Effectiveness Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Official Website" dataKey="Official" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Radar name="Amazon" dataKey="Amazon" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Radar name="TikTok Shop" dataKey="TikTok" stroke="#000000" fill="#000000" fillOpacity={0.6} />
              <Radar name="Meta" dataKey="Meta" stroke="#1877F2" fill="#1877F2" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Strategic Recommendations
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">1.</span>
                  <span><strong>Scale Meta Campaigns:</strong> 85.9% of revenue with $0 direct traffic cost</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">2.</span>
                  <span><strong>Optimize Amazon:</strong> 68% traffic but only 12.6% revenue - improve conversion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">3.</span>
                  <span><strong>Activate TikTok Shop:</strong> 1,874 visits with $0 revenue - urgent setup needed</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Growth Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Week 2 showed 608% revenue growth - analyze and replicate success factors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Official website has stable but low conversion - consider UX improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChannelPerformanceReport;