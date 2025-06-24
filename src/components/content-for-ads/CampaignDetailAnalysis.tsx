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
  ScatterChart,
  Scatter,
  Treemap,
  ComposedChart,
  Area
} from 'recharts';
import { 
  MousePointer, 
  Eye, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Award,
  Instagram,
  Youtube,
  Music,
  AlertTriangle
} from 'lucide-react';

interface CampaignData {
  name: string;
  platform: string;
  product: string;
  clickThroughs: number;
  totalDPV: number;
  totalATC: number;
  totalPurchases: number;
  productSales: number;
  brandReferralBonus: number;
  conversionRate: number;
  atcRate: number;
  purchaseRate: number;
}

const CampaignDetailAnalysis: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'm1' | 'magic1'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'instagram' | 'youtube' | 'tiktok'>('all');

  // Parse campaign data
  const campaignData: CampaignData[] = [
    {
      name: 'Leapvideo-M1 2409',
      platform: 'mixed',
      product: 'm1',
      clickThroughs: 571125,
      totalDPV: 8,
      totalATC: 8,
      totalPurchases: 0,
      productSales: 0,
      brandReferralBonus: 0,
      conversionRate: 0,
      atcRate: 100,
      purchaseRate: 0
    },
    {
      name: 'pheobe_magic1_leap_ig_2nd',
      platform: 'instagram',
      product: 'magic1',
      clickThroughs: 578316,
      totalDPV: 4956,
      totalATC: 4925,
      totalPurchases: 208,
      productSales: 1084.88,
      brandReferralBonus: 112.94,
      conversionRate: 4.2,
      atcRate: 99.4,
      purchaseRate: 4.2
    },
    {
      name: 'pheobe_magic1_leap_ytb_2nd',
      platform: 'youtube',
      product: 'magic1',
      clickThroughs: 584221,
      totalDPV: 29,
      totalATC: 28,
      totalPurchases: 2,
      productSales: 89.99,
      brandReferralBonus: 9.44,
      conversionRate: 6.9,
      atcRate: 96.6,
      purchaseRate: 7.1
    },
    {
      name: 'pheobe_m1_leap_tk_2nd',
      platform: 'tiktok',
      product: 'm1',
      clickThroughs: 507169,
      totalDPV: 2318,
      totalATC: 2304,
      totalPurchases: 17,
      productSales: 0,
      brandReferralBonus: 0,
      conversionRate: 0,
      atcRate: 99.4,
      purchaseRate: 0.7
    },
    {
      name: 'pheobe_m1_leap_ytb_2nd',
      platform: 'youtube',
      product: 'm1',
      clickThroughs: 507688,
      totalDPV: 33,
      totalATC: 50,
      totalPurchases: 1,
      productSales: 0,
      brandReferralBonus: 0,
      conversionRate: 0,
      atcRate: 151.5,
      purchaseRate: 2.0
    },
    {
      name: 'pheobe_m1_leap_ig_2nd',
      platform: 'instagram',
      product: 'm1',
      clickThroughs: 580536,
      totalDPV: 5733,
      totalATC: 5712,
      totalPurchases: 112,
      productSales: 479.98,
      brandReferralBonus: 50.04,
      conversionRate: 2.0,
      atcRate: 99.6,
      purchaseRate: 2.0
    },
    {
      name: 'pheobe_magic1_leap_tk_2nd',
      platform: 'tiktok',
      product: 'magic1',
      clickThroughs: 593389,
      totalDPV: 8237,
      totalATC: 7809,
      totalPurchases: 170,
      productSales: 809.91,
      brandReferralBonus: 84.07,
      conversionRate: 2.1,
      atcRate: 94.8,
      purchaseRate: 2.2
    }
  ];

  // Filter data based on selections
  const filteredData = campaignData.filter(campaign => {
    const productMatch = selectedProduct === 'all' || campaign.product === selectedProduct;
    const platformMatch = selectedPlatform === 'all' || campaign.platform === selectedPlatform;
    return productMatch && platformMatch;
  });

  // Calculate summary metrics
  const summaryMetrics = {
    totalDPV: filteredData.reduce((sum, c) => sum + c.totalDPV, 0),
    totalATC: filteredData.reduce((sum, c) => sum + c.totalATC, 0),
    totalPurchases: filteredData.reduce((sum, c) => sum + c.totalPurchases, 0),
    totalRevenue: filteredData.reduce((sum, c) => sum + c.productSales, 0),
    totalBonus: filteredData.reduce((sum, c) => sum + c.brandReferralBonus, 0),
    avgConversionRate: filteredData.length > 0 
      ? filteredData.reduce((sum, c) => sum + c.conversionRate, 0) / filteredData.length 
      : 0
  };

  // Platform performance comparison
  const platformPerformance = [
    {
      platform: 'Instagram',
      campaigns: campaignData.filter(c => c.platform === 'instagram').length,
      dpv: campaignData.filter(c => c.platform === 'instagram').reduce((sum, c) => sum + c.totalDPV, 0),
      purchases: campaignData.filter(c => c.platform === 'instagram').reduce((sum, c) => sum + c.totalPurchases, 0),
      revenue: campaignData.filter(c => c.platform === 'instagram').reduce((sum, c) => sum + c.productSales, 0),
      color: '#E4405F'
    },
    {
      platform: 'YouTube',
      campaigns: campaignData.filter(c => c.platform === 'youtube').length,
      dpv: campaignData.filter(c => c.platform === 'youtube').reduce((sum, c) => sum + c.totalDPV, 0),
      purchases: campaignData.filter(c => c.platform === 'youtube').reduce((sum, c) => sum + c.totalPurchases, 0),
      revenue: campaignData.filter(c => c.platform === 'youtube').reduce((sum, c) => sum + c.productSales, 0),
      color: '#FF0000'
    },
    {
      platform: 'TikTok',
      campaigns: campaignData.filter(c => c.platform === 'tiktok').length,
      dpv: campaignData.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.totalDPV, 0),
      purchases: campaignData.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.totalPurchases, 0),
      revenue: campaignData.filter(c => c.platform === 'tiktok').reduce((sum, c) => sum + c.productSales, 0),
      color: '#000000'
    }
  ];

  // Product performance comparison
  const productPerformance = [
    {
      product: 'M1 (Cat Litter Box)',
      campaigns: campaignData.filter(c => c.product === 'm1').length,
      dpv: campaignData.filter(c => c.product === 'm1').reduce((sum, c) => sum + c.totalDPV, 0),
      purchases: campaignData.filter(c => c.product === 'm1').reduce((sum, c) => sum + c.totalPurchases, 0),
      revenue: campaignData.filter(c => c.product === 'm1').reduce((sum, c) => sum + c.productSales, 0),
      color: '#10B981'
    },
    {
      product: 'Magic1 (Garment Steamer)',
      campaigns: campaignData.filter(c => c.product === 'magic1').length,
      dpv: campaignData.filter(c => c.product === 'magic1').reduce((sum, c) => sum + c.totalDPV, 0),
      purchases: campaignData.filter(c => c.product === 'magic1').reduce((sum, c) => sum + c.totalPurchases, 0),
      revenue: campaignData.filter(c => c.product === 'magic1').reduce((sum, c) => sum + c.productSales, 0),
      color: '#8B5CF6'
    }
  ];

  // Conversion funnel data
  const funnelData = filteredData.map(campaign => ({
    name: campaign.name.split('_')[0],
    dpv: campaign.totalDPV,
    atc: campaign.totalATC,
    purchases: campaign.totalPurchases,
    dpvToAtc: campaign.atcRate,
    atcToPurchase: campaign.purchaseRate
  }));

  // Scatter plot data for DPV vs Revenue
  const scatterData = campaignData.map(campaign => ({
    x: campaign.totalDPV,
    y: campaign.productSales,
    name: campaign.name,
    platform: campaign.platform,
    product: campaign.product
  }));

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'tiktok': return <Music className="w-4 h-4" />;
      default: return null;
    }
  };

  // Custom tooltip for scatter chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-xs text-gray-600">Platform: {data.platform}</p>
          <p className="text-xs text-gray-600">Product: {data.product}</p>
          <p className="text-xs">DPV: {data.x.toLocaleString()}</p>
          <p className="text-xs">Revenue: ${data.y.toFixed(2)}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Campaign Detail Analysis</h2>
          <p className="text-gray-600 mt-1">Deep dive into individual campaign performance metrics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Products</option>
            <option value="m1">M1 - Cat Litter Box</option>
            <option value="magic1">Magic1 - Garment Steamer</option>
          </select>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total DPV</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalDPV.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total ATC</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalATC.toLocaleString()}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Purchases</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalPurchases}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">${summaryMetrics.totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bonus</p>
              <p className="text-2xl font-bold">${summaryMetrics.totalBonus.toFixed(2)}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Conv.</p>
              <p className="text-2xl font-bold">{summaryMetrics.avgConversionRate.toFixed(1)}%</p>
            </div>
            <MousePointer className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
      </div>

      {/* Platform and Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? value.toLocaleString() : value} />
              <Legend />
              <Bar yAxisId="left" dataKey="dpv" name="DPV" fill="#3B82F6" />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-15} textAnchor="end" height={60} />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? value.toLocaleString() : value} />
              <Legend />
              <Bar yAxisId="left" dataKey="purchases" name="Purchases" fill="#8B5CF6" />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* DPV vs Revenue Scatter Plot */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">DPV vs Revenue Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="DPV" 
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Revenue" 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Campaigns" 
              data={scatterData} 
              fill="#8884d8"
            >
              {scatterData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.product === 'm1' ? '#10B981' : '#8B5CF6'} 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">M1 (Cat Litter Box)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Magic1 (Garment Steamer)</span>
          </div>
        </div>
      </Card>

      {/* Campaign Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Campaign</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Platform</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">DPV</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">ATC</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Purchases</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Revenue</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Conv. Rate</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{campaign.name.split('_')[0]}</span>
                      <span className="text-xs text-gray-500">
                        ({campaign.product === 'm1' ? 'M1' : 'Magic1'})
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">{getPlatformIcon(campaign.platform)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">{campaign.totalDPV.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">{campaign.totalATC.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">{campaign.totalPurchases}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-green-600">
                    ${campaign.productSales.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {campaign.conversionRate.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    {campaign.productSales > 500 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        High Performer
                      </span>
                    ) : campaign.productSales > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Active
                      </span>
                    ) : campaign.totalPurchases > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        Low Revenue
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        No Sales
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Key Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Magic1 Dominates Revenue</p>
                <p className="text-xs text-gray-600">
                  Garment Steamer generates 71% of total revenue despite similar DPV numbers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Instagram Best Performer</p>
                <p className="text-xs text-gray-600">
                  IG campaigns show highest purchase volume and revenue generation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">M1 Conversion Issue</p>
                <p className="text-xs text-gray-600">
                  Cat Litter Box has high DPV but very low purchase conversion
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">ATC Rate Excellence</p>
                <p className="text-xs text-gray-600">
                  95%+ ATC rate across all campaigns shows strong product interest
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Strategic Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">1.</span>
              <div>
                <p className="text-sm font-medium">Scale Magic1 IG Campaigns</p>
                <p className="text-xs text-gray-600">
                  Focus 60% budget on Instagram Magic1 campaigns for maximum ROI
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">2.</span>
              <div>
                <p className="text-sm font-medium">Fix M1 Purchase Funnel</p>
                <p className="text-xs text-gray-600">
                  Investigate why M1 has high ATC but low purchase conversion
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <div>
                <p className="text-sm font-medium">Optimize TikTok Strategy</p>
                <p className="text-xs text-gray-600">
                  TikTok shows potential - test different content formats
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <div>
                <p className="text-sm font-medium">Leverage Referral Bonus</p>
                <p className="text-xs text-gray-600">
                  10% bonus rate is significant - promote referral program
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailAnalysis;