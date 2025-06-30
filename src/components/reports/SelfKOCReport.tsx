import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';
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
} from 'recharts';

const SelfKOCReport: React.FC = () => {
  // Performance comparison data
  const performanceData = [
    {
      metric: 'Total Content',
      catLitterBox: 4167,
      garmentSteamer: 1041,
    },
    {
      metric: 'Avg Views (K)',
      catLitterBox: 93,
      garmentSteamer: 1.8,
    },
    {
      metric: 'Engagement Rate (%)',
      catLitterBox: 2.3,
      garmentSteamer: 1.2,
    },
    {
      metric: 'Active Accounts',
      catLitterBox: 35,
      garmentSteamer: 44,
    },
  ];

  // Platform distribution
  const platformDistribution = [
    { platform: 'Instagram', catLitterBox: 1872, garmentSteamer: 312 },
    { platform: 'YouTube', catLitterBox: 1456, garmentSteamer: 304 },
    { platform: 'TikTok', catLitterBox: 839, garmentSteamer: 425 },
  ];

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Jan', catLitterBox: 50000, garmentSteamer: 5000 },
    { month: 'Feb', catLitterBox: 57500, garmentSteamer: 4750 },
    { month: 'Mar', catLitterBox: 66125, garmentSteamer: 4512 },
    { month: 'Apr', catLitterBox: 76044, garmentSteamer: 4287 },
    { month: 'May', catLitterBox: 87450, garmentSteamer: 4072 },
    { month: 'Jun', catLitterBox: 100568, garmentSteamer: 3869 },
  ];

  // ROI comparison
  const roiData = [
    { name: 'Cat Litter Box', value: 85, color: '#10B981' },
    { name: 'Garment Steamer', value: 15, color: '#3B82F6' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Neakasa Self-Operated KOC Analysis Report
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive analysis of owned content accounts performance across platforms
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Report Generated</p>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Executive Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-700">Key Finding #1</h3>
            <p className="text-sm text-gray-700 mt-2">
              Cat Litter Box content performs 52x better than Garment Steamer on Instagram (93K vs
              1.8K avg views)
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-700">Key Finding #2</h3>
            <p className="text-sm text-gray-700 mt-2">
              Despite lower views, YouTube delivers highest engagement rate (4.15%) for Cat Litter
              Box content
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-700">Key Finding #3</h3>
            <p className="text-sm text-gray-700 mt-2">
              Cat Litter Box shows 15% monthly growth while Garment Steamer declines 5%
              month-over-month
            </p>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content Volume by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="catLitterBox" name="Cat Litter Box" fill="#10B981" />
              <Bar dataKey="garmentSteamer" name="Garment Steamer" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">ROI Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roiData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {roiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Trend Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">6-Month Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Line
              type="monotone"
              dataKey="catLitterBox"
              name="Cat Litter Box Views"
              stroke="#10B981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="garmentSteamer"
              name="Garment Steamer Views"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Platform-specific Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Instagram</h3>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-pink-600 font-bold">IG</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Best Performing Product</p>
              <p className="font-semibold">Cat Litter Box</p>
              <p className="text-2xl font-bold text-pink-600">93K avg views</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">Key Success Factor</p>
              <p className="text-sm">Visual appeal + pet content = viral potential</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">YouTube</h3>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold">YT</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Highest Engagement Rate</p>
              <p className="font-semibold">Cat Litter Box</p>
              <p className="text-2xl font-bold text-red-600">4.15%</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">Key Success Factor</p>
              <p className="text-sm">In-depth reviews & demos drive engagement</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gray-100 to-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">TikTok</h3>
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Growth Opportunity</p>
              <p className="font-semibold">Both Products</p>
              <p className="text-2xl font-bold text-gray-800">2.1% avg</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">Key Success Factor</p>
              <p className="text-sm">Short-form content with trending audio</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Strategic Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Immediate Actions (0-3 months)</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">1.</span>
                <span className="text-sm">
                  Double down on Cat Litter Box Instagram content - allocate 60% of resources
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">2.</span>
                <span className="text-sm">
                  Create YouTube long-form content strategy for Cat Litter Box
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">3.</span>
                <span className="text-sm">
                  Audit and potentially sunset underperforming Garment Steamer accounts
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Long-term Strategy (3-12 months)</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">1.</span>
                <span className="text-sm">
                  Develop pet-focused product line based on Cat Litter Box success
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">2.</span>
                <span className="text-sm">
                  Build Instagram-first content strategy with platform-specific optimization
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">3.</span>
                <span className="text-sm">
                  Establish KOC community program to amplify successful accounts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Account Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top 10 Performing Accounts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Account</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                  Avg Views
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">1</td>
                <td className="px-4 py-3 text-sm font-medium">@neakasa_official</td>
                <td className="px-4 py-3 text-sm">Instagram</td>
                <td className="px-4 py-3 text-sm">Cat Litter Box</td>
                <td className="px-4 py-3 text-sm text-right">93,038</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">0.6%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">2</td>
                <td className="px-4 py-3 text-sm font-medium">@barmanpsicologa</td>
                <td className="px-4 py-3 text-sm">YouTube</td>
                <td className="px-4 py-3 text-sm">Cat Litter Box</td>
                <td className="px-4 py-3 text-sm text-right">14,025</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">4.8%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">3</td>
                <td className="px-4 py-3 text-sm font-medium">@catlovers_daily</td>
                <td className="px-4 py-3 text-sm">TikTok</td>
                <td className="px-4 py-3 text-sm">Cat Litter Box</td>
                <td className="px-4 py-3 text-sm text-right">12,000</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">2.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SelfKOCReport;
