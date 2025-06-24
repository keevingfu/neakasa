import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Activity,
  FileText,
  Bot
} from 'lucide-react';

const NeakasaLeapProjectAnalysis: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'steamer' | 'litterbox'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'week1' | 'week2' | 'comparison'>('comparison');

  // 数据统计周期管理
  const dataManagementMetrics = {
    dataCycle: '7 days',
    currentPeriod: '23-30',
    dataAccuracy: 95.2,
    syncStatus: 'Aligned',
    lastUpdate: '2024-06-24'
  };

  // 挂烫机业务数据
  const steamerData = {
    week1: {
      exposure: 15000000,
      engagement: 250000,
      clicks: 4200,
      sales: 25000,
      officialWebsite: 1800
    },
    week2: {
      exposure: 18000000,
      engagement: 290000,
      clicks: 4500,
      sales: 27000,
      officialWebsite: 2000
    }
  };

  // 猫砂盆业务数据
  const litterBoxData = {
    exposure: 15000000,
    engagement: 50000,
    clicks: 11000,
    sales: 0,
    viralVideos: {
      tiktok: [
        { views: 4300000, platform: 'TikTok', engagement: 8.2 },
        { views: 3900000, platform: 'TikTok', engagement: 7.5 }
      ],
      instagram: { views: 200000, platform: 'Instagram', engagement: 12.3 },
      youtube: { avgViews: 50000, platform: 'YouTube', engagement: 5.6 }
    }
  };

  // 平台流量分析
  const platformTraffic = [
    {
      platform: 'TikTok',
      week1: 25000,
      week2: 18000,
      change: -28,
      viralContent: true,
      avgEngagement: 7.8
    },
    {
      platform: 'Instagram',
      week1: 12000,
      week2: 15000,
      change: 25,
      viralContent: false,
      avgEngagement: 9.2
    },
    {
      platform: 'YouTube',
      week1: 8000,
      week2: 9500,
      change: 18.75,
      viralContent: false,
      avgEngagement: 5.6
    },
    {
      platform: 'DTC',
      week1: 15000,
      week2: 5000,
      change: -66.7,
      viralContent: false,
      avgEngagement: 3.2
    }
  ];

  // 转化漏斗数据
  const conversionFunnel = [
    { stage: 'Exposure', steamer: 18000000, litterBox: 15000000 },
    { stage: 'Engagement', steamer: 290000, litterBox: 50000 },
    { stage: 'Clicks', steamer: 4500, litterBox: 11000 },
    { stage: 'Add to Cart', steamer: 450, litterBox: 220 },
    { stage: 'Purchase', steamer: 180, litterBox: 0 }
  ];

  // 达人ROI分析
  const influencerROI = [
    {
      channel: 'Influencer Marketing',
      investment: 2000,
      revenue: 13000,
      roi: 6.5,
      avgOrderValue: 108,
      conversions: 120
    },
    {
      channel: 'Self-operated',
      investment: 1500,
      revenue: 8000,
      roi: 5.33,
      avgOrderValue: 95,
      conversions: 84
    },
    {
      channel: 'MCN Model',
      investment: 0,
      revenue: 5000,
      roi: 'Infinite',
      avgOrderValue: 125,
      conversions: 40
    }
  ];

  // 脚本创新追踪
  const scriptInnovation = [
    {
      theme: 'Product Demo',
      usage: 45,
      performance: 'Low',
      status: 'Overused'
    },
    {
      theme: 'Black Friday',
      usage: 15,
      performance: 'High',
      status: 'New'
    },
    {
      theme: 'Pet Stories',
      usage: 25,
      performance: 'Medium',
      status: 'Stable'
    },
    {
      theme: 'AI Content',
      usage: 15,
      performance: 'Testing',
      status: 'Experimental'
    }
  ];

  // 项目管理状态
  const projectStatus = [
    {
      task: 'Data Alignment',
      owner: 'Huang Fujie & Cheng Weidong',
      status: 'In Progress',
      deadline: '2024-06-30',
      progress: 85
    },
    {
      task: 'Script Innovation',
      owner: 'Fu Lingjian Team',
      status: 'Planning',
      deadline: '2024-07-05',
      progress: 30
    },
    {
      task: 'AI Account Setup',
      owner: 'Two Teams',
      status: 'Testing',
      deadline: '2024-07-10',
      progress: 45
    },
    {
      task: 'MCN Model Implementation',
      owner: 'Fu Lingjian',
      status: 'Proposal',
      deadline: '2024-06-27',
      progress: 20
    }
  ];

  // 业务异常警报
  const businessAlerts = [
    {
      type: 'critical',
      message: 'DTC platform traffic dropped 66.7% week-over-week',
      action: 'Investigate link settings and data accuracy',
      priority: 'High'
    },
    {
      type: 'warning',
      message: 'Cat litter box 0 conversions despite 11k clicks',
      action: 'Review pricing strategy and checkout flow',
      priority: 'High'
    },
    {
      type: 'info',
      message: 'Script duplication reducing ad performance',
      action: 'Implement Black Friday themed content',
      priority: 'Medium'
    },
    {
      type: 'success',
      message: 'Influencer ROI averaging 6.5x',
      action: 'Scale influencer partnerships',
      priority: 'Low'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {
                typeof entry.value === 'number' 
                  ? entry.value.toLocaleString()
                  : entry.value
              }
            </p>
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
          <h2 className="text-2xl font-bold text-gray-900">Neakasa x Leap Project Analysis</h2>
          <p className="text-gray-600 mt-1">Comprehensive project tracking and performance analysis</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProduct('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedProduct === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setSelectedProduct('steamer')}
            className={`px-4 py-2 rounded-lg ${
              selectedProduct === 'steamer' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Garment Steamer
          </button>
          <button
            onClick={() => setSelectedProduct('litterbox')}
            className={`px-4 py-2 rounded-lg ${
              selectedProduct === 'litterbox' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cat Litter Box
          </button>
        </div>
      </div>

      {/* Business Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessAlerts.map((alert, index) => (
          <Card key={index} className={`p-4 border-l-4 ${
            alert.type === 'critical' ? 'border-red-500 bg-red-50' :
            alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
            alert.type === 'info' ? 'border-blue-500 bg-blue-50' :
            'border-green-500 bg-green-50'
          }`}>
            <div className="flex items-start gap-3">
              {alert.type === 'critical' ? <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" /> :
               alert.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" /> :
               alert.type === 'info' ? <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" /> :
               <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.action}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="data-management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="data-management">Data Management</TabsTrigger>
          <TabsTrigger value="traffic-analysis">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="roi-analysis">ROI Analysis</TabsTrigger>
          <TabsTrigger value="innovation">Script Innovation</TabsTrigger>
          <TabsTrigger value="project-status">Project Status</TabsTrigger>
        </TabsList>

        <TabsContent value="data-management" className="space-y-6">
          {/* Data Management Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Data Cycle</p>
                  <p className="text-2xl font-bold">{dataManagementMetrics.dataCycle}</p>
                  <p className="text-sm text-green-600 mt-1">Fixed period</p>
                </div>
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Period</p>
                  <p className="text-2xl font-bold">{dataManagementMetrics.currentPeriod}</p>
                  <p className="text-sm text-gray-600 mt-1">June 2024</p>
                </div>
                <Activity className="w-10 h-10 text-green-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Data Accuracy</p>
                  <p className="text-2xl font-bold">{dataManagementMetrics.dataAccuracy}%</p>
                  <p className="text-sm text-yellow-600 mt-1">Under review</p>
                </div>
                <Target className="w-10 h-10 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sync Status</p>
                  <p className="text-2xl font-bold">{dataManagementMetrics.syncStatus}</p>
                  <p className="text-sm text-green-600 mt-1">Real-time</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Update</p>
                  <p className="text-lg font-bold">{dataManagementMetrics.lastUpdate}</p>
                  <p className="text-sm text-gray-600 mt-1">Auto-sync</p>
                </div>
                <FileText className="w-10 h-10 text-purple-600" />
              </div>
            </Card>
          </div>

          {/* Weekly Data Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={[
                {
                  metric: 'Exposure',
                  'Week 1': selectedProduct === 'litterbox' ? 0 : 15000000,
                  'Week 2': selectedProduct === 'litterbox' ? 0 : 18000000,
                  'Litter Box': selectedProduct === 'steamer' ? 0 : 15000000
                },
                {
                  metric: 'Engagement',
                  'Week 1': selectedProduct === 'litterbox' ? 0 : 250000,
                  'Week 2': selectedProduct === 'litterbox' ? 0 : 290000,
                  'Litter Box': selectedProduct === 'steamer' ? 0 : 50000
                },
                {
                  metric: 'Clicks',
                  'Week 1': selectedProduct === 'litterbox' ? 0 : 4200,
                  'Week 2': selectedProduct === 'litterbox' ? 0 : 4500,
                  'Litter Box': selectedProduct === 'steamer' ? 0 : 11000
                },
                {
                  metric: 'Sales ($)',
                  'Week 1': selectedProduct === 'litterbox' ? 0 : 25000,
                  'Week 2': selectedProduct === 'litterbox' ? 0 : 27000,
                  'Litter Box': 0
                }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedProduct !== 'litterbox' && (
                  <>
                    <Bar dataKey="Week 1" fill="#3B82F6" />
                    <Bar dataKey="Week 2" fill="#10B981" />
                  </>
                )}
                {selectedProduct !== 'steamer' && (
                  <Bar dataKey="Litter Box" fill="#F59E0B" />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="traffic-analysis" className="space-y-6">
          {/* Platform Traffic Analysis */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Traffic Performance</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={platformTraffic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="week1" name="Week 1" fill="#3B82F6" />
                <Bar yAxisId="left" dataKey="week2" name="Week 2" fill="#10B981" />
                <Line yAxisId="right" type="monotone" dataKey="change" name="Change %" stroke="#EF4444" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Traffic Anomaly Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Traffic Anomalies</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-900">DTC Platform</span>
                    <span className="text-2xl font-bold text-red-600">-66.7%</span>
                  </div>
                  <p className="text-sm text-gray-700">Critical drop from 15k to 5k visits</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600">Possible causes:</p>
                    <ul className="text-xs text-gray-600 ml-4 list-disc">
                      <li>Link configuration issues</li>
                      <li>Data tracking errors</li>
                      <li>Platform algorithm changes</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-900">TikTok Viral</span>
                    <span className="text-2xl font-bold text-green-600">10M+</span>
                  </div>
                  <p className="text-sm text-gray-700">One video reached 10M+ views</p>
                  <p className="text-xs text-gray-600 mt-1">Users prefer official site/Amazon via linktree</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Viral Content Impact</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'TikTok 4.3M', value: 4300000, platform: 'TikTok' },
                      { name: 'TikTok 3.9M', value: 3900000, platform: 'TikTok' },
                      { name: 'Instagram 200K', value: 200000, platform: 'Instagram' },
                      { name: 'YouTube 50K avg', value: 50000, platform: 'YouTube' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {[0, 1, 2, 3].map((index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          {/* Conversion Funnel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Product Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={conversionFunnel} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {selectedProduct !== 'litterbox' && (
                  <Bar dataKey="steamer" name="Garment Steamer" fill="#8B5CF6" />
                )}
                {selectedProduct !== 'steamer' && (
                  <Bar dataKey="litterBox" name="Cat Litter Box" fill="#10B981" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Rate Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Conversion Rate by Stage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Exposure → Engagement</span>
                    <div className="flex gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-purple-600">Steamer: 1.61%</span>
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-green-600">Litter Box: 0.33%</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '16.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Engagement → Click</span>
                    <div className="flex gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-purple-600">Steamer: 1.55%</span>
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-green-600">Litter Box: 22%</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Click → Purchase</span>
                    <div className="flex gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-purple-600">Steamer: 4%</span>
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-red-600">Litter Box: 0%</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Critical Conversion Issues
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-medium text-red-900">Cat Litter Box: 0% Conversion</h4>
                  <p className="text-sm text-gray-700 mt-1">Despite 11,000 clicks and viral content</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-gray-600">Action Items:</p>
                    <ul className="text-xs text-gray-600 ml-4 list-disc">
                      <li>Review pricing strategy</li>
                      <li>Test cat pedal accessories</li>
                      <li>Optimize checkout flow</li>
                      <li>Add urgency messaging</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <h4 className="font-medium text-orange-900">Low Engagement-to-Click Rate</h4>
                  <p className="text-sm text-gray-700 mt-1">Steamer: 1.55% vs Industry: 3-5%</p>
                  <p className="text-xs text-gray-600 mt-2">Consider improving CTAs and link placement</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi-analysis" className="space-y-6">
          {/* ROI Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Channel ROI Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={influencerROI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" angle={-15} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roi" name="ROI (x)" fill="#10B981" />
                  <Bar dataKey="conversions" name="Conversions" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cost Efficiency Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={influencerROI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" angle={-15} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="investment" name="Investment ($)" fill="#EF4444" />
                  <Line yAxisId="right" type="monotone" dataKey="avgOrderValue" name="AOV ($)" stroke="#F59E0B" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* MCN Model Proposal */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="text-lg font-semibold mb-4">MCN Model Proposal (No Sample Cost)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-green-600">$0</span>
                </div>
                <h4 className="font-medium">Sample Cost</h4>
                <p className="text-sm text-gray-600 mt-1">Zero inventory risk</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-blue-600">∞</span>
                </div>
                <h4 className="font-medium">Potential ROI</h4>
                <p className="text-sm text-gray-600 mt-1">Infinite return potential</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-purple-600">100%</span>
                </div>
                <h4 className="font-medium">Focus on DTC</h4>
                <p className="text-sm text-gray-600 mt-1">Higher margins</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="innovation" className="space-y-6">
          {/* Script Innovation Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Script Theme Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={scriptInnovation}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="usage"
                    label={({ theme, usage }) => `${theme}: ${usage}%`}
                  >
                    {scriptInnovation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.status === 'Overused' ? '#EF4444' :
                        entry.status === 'New' ? '#10B981' :
                        entry.status === 'Stable' ? '#3B82F6' :
                        '#F59E0B'
                      } />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Script Performance Analysis</h3>
              <div className="space-y-4">
                {scriptInnovation.map((script, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{script.theme}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        script.status === 'Overused' ? 'bg-red-100 text-red-800' :
                        script.status === 'New' ? 'bg-green-100 text-green-800' :
                        script.status === 'Stable' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {script.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Performance</span>
                      <span className={`font-medium ${
                        script.performance === 'High' ? 'text-green-600' :
                        script.performance === 'Low' ? 'text-red-600' :
                        script.performance === 'Testing' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {script.performance}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          script.performance === 'High' ? 'bg-green-600' :
                          script.performance === 'Low' ? 'bg-red-600' :
                          script.performance === 'Testing' ? 'bg-yellow-600' :
                          'bg-gray-600'
                        }`}
                        style={{ width: `${script.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Content Strategy */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-600" />
              AI Content Development Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">AI Account Concepts</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <div>
                      <span className="font-medium">Cat Mom Cooking Series</span>
                      <p className="text-xs text-gray-600">Anthropomorphic cats using kitchen/bathroom</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <div>
                      <span className="font-medium">Pet Daily Life</span>
                      <p className="text-xs text-gray-600">Natural integration of litter box in scenes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <div>
                      <span className="font-medium">Health Education</span>
                      <p className="text-xs text-gray-600">Cat health tips with product placement</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Content Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm">Hashtags</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm">Link in Bio</span>
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm">Product Tags</span>
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm">Quality Control</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="project-status" className="space-y-6">
          {/* Project Management Dashboard */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Status Overview</h3>
            <div className="space-y-4">
              {projectStatus.map((task, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{task.task}</h4>
                      <p className="text-sm text-gray-600">Owner: {task.owner}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'Testing' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          task.progress >= 70 ? 'bg-green-600' :
                          task.progress >= 40 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Deadline: {task.deadline}</span>
                      <span className={
                        new Date(task.deadline) < new Date('2024-07-01') ? 'text-red-600' : ''
                      }>
                        {Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <h3 className="text-lg font-semibold mb-4">Immediate Actions</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Data Alignment</span>
                    <p className="text-xs text-gray-600">Complete 7-day cycle standardization</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <span className="font-medium">DTC Traffic Investigation</span>
                    <p className="text-xs text-gray-600">Identify cause of 66.7% drop</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Black Friday Scripts</span>
                    <p className="text-xs text-gray-600">Implement theme variations</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <span className="font-medium">MCN Proposal Review</span>
                    <p className="text-xs text-gray-600">Thursday 11:00-12:00 meeting</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50">
              <h3 className="text-lg font-semibold mb-4">Risk Mitigation</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Litter Box Zero Conversion</span>
                    <p className="text-xs text-gray-600">Test accessories and pricing adjustments</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Script Duplication</span>
                    <p className="text-xs text-gray-600">Reducing ad performance effectiveness</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Project Management Gaps</span>
                    <p className="text-xs text-gray-600">Strengthen reporting cadence</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Influencer ROI Strong</span>
                    <p className="text-xs text-gray-600">Scale successful partnerships</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeakasaLeapProjectAnalysis;