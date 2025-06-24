import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Eye, TrendingUp, Package, Sparkles, User, Play, ExternalLink } from 'lucide-react';

interface PerformanceData {
  platform: string;
  catLitterBox: number;
  garmentSteamer: number;
}

const SelfKOCAnalysis: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'catLitterBox' | 'garmentSteamer'>('all');

  // Average views by platform and product
  const viewsData: PerformanceData[] = [
    { platform: 'Instagram', catLitterBox: 93038, garmentSteamer: 1761 },
    { platform: 'YouTube', catLitterBox: 11797, garmentSteamer: 750 },
    { platform: 'TikTok', catLitterBox: 8500, garmentSteamer: 1339 }
  ];

  // Content volume comparison
  const contentVolumeData = [
    { name: 'Cat Litter Box', value: 4167, color: '#10B981' },
    { name: 'Garment Steamer', value: 1041, color: '#3B82F6' }
  ];

  // Platform engagement rates
  const engagementRateData = [
    { platform: 'YouTube', catLitterBox: 4.15, garmentSteamer: 1.46 },
    { platform: 'Instagram', catLitterBox: 0.6, garmentSteamer: 0.52 },
    { platform: 'TikTok', catLitterBox: 2.1, garmentSteamer: 1.8 }
  ];

  // Top performing accounts
  const topAccounts = [
    { account: '@barmanpsicologa', platform: 'YouTube', avgViews: 14025, product: 'Cat Litter Box' },
    { account: '@neakasa_official', platform: 'Instagram', avgViews: 93038, product: 'Cat Litter Box' },
    { account: '@catlovers_daily', platform: 'TikTok', avgViews: 12000, product: 'Cat Litter Box' },
    { account: '@homeclean_tips', platform: 'Instagram', avgViews: 2100, product: 'Garment Steamer' }
  ];

  // Platform effectiveness radar
  const radarData = [
    { metric: 'Reach', Instagram: 90, YouTube: 60, TikTok: 70 },
    { metric: 'Engagement', Instagram: 40, YouTube: 85, TikTok: 65 },
    { metric: 'Conversion', Instagram: 70, YouTube: 80, TikTok: 55 },
    { metric: 'Growth', Instagram: 85, YouTube: 65, TikTok: 80 },
    { metric: 'ROI', Instagram: 75, YouTube: 70, TikTok: 60 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Self-Operated KOC Analysis</h2>
          <p className="text-gray-600 mt-1">Performance analysis of Neakasa's self-operated content accounts</p>
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
            onClick={() => setSelectedProduct('catLitterBox')}
            className={`px-4 py-2 rounded-lg ${
              selectedProduct === 'catLitterBox' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cat Litter Box
          </button>
          <button
            onClick={() => setSelectedProduct('garmentSteamer')}
            className={`px-4 py-2 rounded-lg ${
              selectedProduct === 'garmentSteamer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Garment Steamer
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Content</p>
              <p className="text-2xl font-bold">5,208</p>
              <p className="text-sm text-green-600 mt-1">+23% vs last month</p>
            </div>
            <Package className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Views</p>
              <p className="text-2xl font-bold">35.2K</p>
              <p className="text-sm text-green-600 mt-1">+15% engagement</p>
            </div>
            <Eye className="w-12 h-12 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Platform</p>
              <p className="text-2xl font-bold">Instagram</p>
              <p className="text-sm text-gray-600 mt-1">93K avg views</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Product</p>
              <p className="text-2xl font-bold">Cat Litter Box</p>
              <p className="text-sm text-gray-600 mt-1">4x more content</p>
            </div>
            <Sparkles className="w-12 h-12 text-yellow-600" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platform">Platform Analysis</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="accounts">Top Accounts</TabsTrigger>
          <TabsTrigger value="persona">Account Persona</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Average Views by Platform */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Average Views by Platform & Product</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="catLitterBox" name="Cat Litter Box" fill="#10B981" />
                  <Bar dataKey="garmentSteamer" name="Garment Steamer" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Content Volume Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Content Volume Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentVolumeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentVolumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Effectiveness Radar */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Effectiveness Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Instagram" dataKey="Instagram" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                  <Radar name="YouTube" dataKey="YouTube" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  <Radar name="TikTok" dataKey="TikTok" stroke="#000000" fill="#000000" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Platform Insights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-pink-700">Instagram - Best Reach</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Highest average views (93K for cat litter box), ideal for brand awareness and visual storytelling
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700">YouTube - Best Engagement</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    4.15% engagement rate for cat litter box content, perfect for in-depth product demos
                  </p>
                </div>
                <div className="border-l-4 border-gray-800 pl-4">
                  <h4 className="font-semibold text-gray-700">TikTok - Growing Potential</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Moderate performance but high growth rate, good for reaching younger demographics
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Engagement Rate by Platform</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="catLitterBox" name="Cat Litter Box" fill="#10B981" />
                <Bar dataKey="garmentSteamer" name="Garment Steamer" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Account</th>
                    <th className="text-left py-3 px-4">Platform</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-right py-3 px-4">Avg. Views</th>
                    <th className="text-right py-3 px-4">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {topAccounts.map((account, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{account.account}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          account.platform === 'YouTube' ? 'bg-red-100 text-red-800' :
                          account.platform === 'Instagram' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {account.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4">{account.product}</td>
                      <td className="py-3 px-4 text-right">{account.avgViews.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${Math.min((account.avgViews / 100000) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-green-600">
                            {account.avgViews > 10000 ? 'Excellent' : 'Good'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">KOC Account Personas</h3>
            <p className="text-gray-600 mb-6">Analysis of self-operated Key Opinion Consumer accounts across platforms</p>
            
            {/* Account Persona Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TikTok Accounts */}
              <Card className="overflow-hidden">
                <div className="relative aspect-[9/16] bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/360/640?random=1" 
                      alt="@lf6ai8wvknt TikTok preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@lf6ai8wvknt</h4>
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">TikTok</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Cat Litter Box Product Demos</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-medium">8.2K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">12.5K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">3.8%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.tiktok.com/@lf6ai8wvknt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on TikTok</span>
                  </a>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-[9/16] bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/360/640?random=2" 
                      alt="@n3k4s4c4t TikTok preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@n3k4s4c4t</h4>
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">TikTok</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Pet Care Tips & Product Reviews</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-medium">15.3K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">25.8K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">5.2%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.tiktok.com/@n3k4s4c4t" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on TikTok</span>
                  </a>
                </div>
              </Card>

              {/* YouTube Accounts */}
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/640/360?random=3" 
                      alt="@neakasapetcare YouTube preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@neakasapetcare</h4>
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">YouTube</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">In-depth Product Reviews & Tutorials</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subscribers</span>
                      <span className="font-medium">3.5K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">8.7K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">4.5%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.youtube.com/@neakasapetcare" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on YouTube</span>
                  </a>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/640/360?random=4" 
                      alt="@catslifestylehub YouTube preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@catslifestylehub</h4>
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">YouTube</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Cat Lifestyle & Product Comparisons</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subscribers</span>
                      <span className="font-medium">5.8K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">12.3K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">6.1%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.youtube.com/@catslifestylehub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on YouTube</span>
                  </a>
                </div>
              </Card>

              {/* Instagram Accounts */}
              <Card className="overflow-hidden">
                <div className="relative aspect-square bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/400/400?random=5" 
                      alt="@neakasa_official Instagram preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@neakasa_official</h4>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded">Instagram</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Official Brand Content & Stories</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-medium">45.2K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">93K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">7.8%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.instagram.com/neakasa_official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on Instagram</span>
                  </a>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative aspect-square bg-gray-100">
                  <div className="relative w-full h-full group">
                    <img 
                      src="https://picsum.photos/400/400?random=6" 
                      alt="@petlife_neakasa Instagram preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-4">
                        <Play className="w-8 h-8 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">@petlife_neakasa</h4>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded">Instagram</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Pet Lifestyle & User Stories</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-medium">28.6K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Views</span>
                      <span className="font-medium">62.4K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Engagement</span>
                      <span className="font-medium text-green-600">6.3%</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.instagram.com/petlife_neakasa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View on Instagram</span>
                  </a>
                </div>
              </Card>
            </div>

            {/* Account Persona Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Platform Performance Summary
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">IG</span>
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-gray-600">2 accounts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-600">155.4K</p>
                      <p className="text-sm text-gray-600">Total views</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">YT</span>
                      </div>
                      <div>
                        <p className="font-medium">YouTube</p>
                        <p className="text-sm text-gray-600">2 accounts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">21K</p>
                      <p className="text-sm text-gray-600">Total views</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">TT</span>
                      </div>
                      <div>
                        <p className="font-medium">TikTok</p>
                        <p className="text-sm text-gray-600">2 accounts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">38.3K</p>
                      <p className="text-sm text-gray-600">Total views</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Content Strategy Insights
                </h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h5 className="font-semibold text-pink-700">Instagram Strategy</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Focus on visual storytelling with high-quality product shots. Official account drives 60% of total IG traffic.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h5 className="font-semibold text-red-700">YouTube Optimization</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Long-form tutorials and comparisons work best. Average watch time is 3.5 minutes.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-800 pl-4">
                    <h5 className="font-semibold text-gray-700">TikTok Growth</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Quick tips and pet reaction videos perform well. Posting time 6-9 PM optimal.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-600" />
          Strategic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Product Strategy</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Focus 80% resources on Cat Litter Box - 4x better performance
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Reposition Garment Steamer content strategy or reduce investment
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Platform Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Prioritize Instagram for reach, YouTube for engagement
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Test TikTok trends to capture younger pet owner demographics
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SelfKOCAnalysis;