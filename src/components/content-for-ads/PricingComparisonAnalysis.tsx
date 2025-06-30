import React, { useState } from 'react';
import { Card } from '../ui/card';
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from 'recharts';
import {
  TrendingDown,
  Tag,
  AlertCircle,
  ArrowUpDown,
  Calculator,
  Target,
} from 'lucide-react';
import { CustomTooltipProps } from '../../types/charts';

interface ProductPricing {
  product: string;
  activity: number;
  discountRatio?: string;
  discountAmount: number;
  actualPayment: number;
  neakasaPrice: number;
  amazonPrice: number;
  pagePrice: number;
  landedPrice: number;
  remarks: string;
}

const PricingComparisonAnalysis: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'comparison' | 'abtest' | 'strategy'>(
    'comparison'
  );

  // Product pricing data
  const pricingData: ProductPricing[] = [
    {
      product: 'M1',
      activity: 518.98,
      discountAmount: 40.0,
      actualPayment: 478.98,
      neakasaPrice: 486.98,
      amazonPrice: 379.99,
      pagePrice: 138.99,
      landedPrice: 106.99,
      remarks:
        'Group B maintains 4 days, Group A $379.99 consistent with Amazon, after PO activity Bundle restores to $499.99',
    },
    {
      product: 'Magic 1',
      activity: 84.55,
      discountRatio: '20%',
      discountAmount: 16.91,
      actualPayment: 67.64,
      neakasaPrice: 71.02,
      amazonPrice: 69.99,
      pagePrice: 14.56,
      landedPrice: 1.03,
      remarks:
        'Group B maintains 4 days, Group A $69.99 consistent with Amazon, after PO activity restores to $99',
    },
    {
      product: 'M1 Lite',
      activity: 449.98,
      discountAmount: 40.0,
      actualPayment: 409.98,
      neakasaPrice: 417.98,
      amazonPrice: 382.49,
      pagePrice: 67.49,
      landedPrice: 35.49,
      remarks: 'Normal price',
    },
  ];

  // Calculate pricing metrics
  const pricingMetrics = pricingData.map((item) => ({
    product: item.product,
    neakasaPremium: (((item.neakasaPrice - item.amazonPrice) / item.amazonPrice) * 100).toFixed(1),
    discountPercentage:
      item.discountRatio || ((item.discountAmount / item.activity) * 100).toFixed(1) + '%',
    priceDifference: item.neakasaPrice - item.amazonPrice,
    competitiveGap: ((item.amazonPrice / item.neakasaPrice) * 100).toFixed(1),
  }));

  // A/B Test Groups data
  const abTestData = [
    {
      product: 'M1',
      groupA: 379.99,
      groupB: 478.98,
      amazonMatch: true,
      testDuration: 4,
      postPromoPrice: 499.99,
    },
    {
      product: 'Magic 1',
      groupA: 69.99,
      groupB: 67.64,
      amazonMatch: true,
      testDuration: 4,
      postPromoPrice: 99.0,
    },
    {
      product: 'M1 Lite',
      groupA: 382.49,
      groupB: 409.98,
      amazonMatch: false,
      testDuration: 0,
      postPromoPrice: 449.98,
    },
  ];

  // Price comparison chart data
  const comparisonData = pricingData.map((item) => ({
    product: item.product,
    Neakasa: item.neakasaPrice,
    Amazon: item.amazonPrice,
    'Actual Payment': item.actualPayment,
    gap: item.neakasaPrice - item.amazonPrice,
  }));

  // Discount analysis
  const discountAnalysis = pricingData.map((item) => ({
    product: item.product,
    originalPrice: item.activity,
    discount: item.discountAmount,
    finalPrice: item.actualPayment,
    savingsRate: ((item.discountAmount / item.activity) * 100).toFixed(1),
  }));

  // Strategy effectiveness radar
  const strategyRadar = [
    { metric: 'Price Competitiveness', M1: 78, 'Magic 1': 98, 'M1 Lite': 92 },
    { metric: 'Margin Protection', M1: 85, 'Magic 1': 65, 'M1 Lite': 90 },
    { metric: 'Market Positioning', M1: 92, 'Magic 1': 88, 'M1 Lite': 85 },
    { metric: 'Discount Depth', M1: 77, 'Magic 1': 80, 'M1 Lite': 89 },
    { metric: 'Amazon Alignment', M1: 100, 'Magic 1': 100, 'M1 Lite': 0 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ${Number(entry.value).toFixed(2)}
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
          <h2 className="text-2xl font-bold text-gray-900">Pricing Comparison Analysis</h2>
          <p className="text-gray-600 mt-1">
            Neakasa vs Amazon pricing strategy and A/B testing insights
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('comparison')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'comparison'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Price Comparison
          </button>
          <button
            onClick={() => setSelectedView('abtest')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'abtest'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            A/B Testing
          </button>
          <button
            onClick={() => setSelectedView('strategy')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'strategy'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Strategy Analysis
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Neakasa Premium</p>
              <p className="text-2xl font-bold text-red-600">+21.8%</p>
              <p className="text-sm text-gray-600 mt-1">vs Amazon</p>
            </div>
            <TrendingDown className="w-10 h-10 text-red-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Discount</p>
              <p className="text-2xl font-bold text-green-600">$32.30</p>
              <p className="text-sm text-gray-600 mt-1">12.5% off</p>
            </div>
            <Tag className="w-10 h-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Amazon Match</p>
              <p className="text-2xl font-bold">2/3</p>
              <p className="text-sm text-gray-600 mt-1">products</p>
            </div>
            <Target className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">A/B Test Active</p>
              <p className="text-2xl font-bold text-purple-600">4 days</p>
              <p className="text-sm text-gray-600 mt-1">duration</p>
            </div>
            <AlertCircle className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
      </div>

      {selectedView === 'comparison' && (
        <>
          {/* Price Comparison Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Price Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Neakasa" fill="#3B82F6" />
                  <Bar dataKey="Amazon" fill="#10B981" />
                  <Bar dataKey="Actual Payment" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Discount Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={discountAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="originalPrice" name="Original" fill="#E5E7EB" />
                  <Bar yAxisId="left" dataKey="finalPrice" name="Final" fill="#10B981" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="savingsRate"
                    name="Savings %"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Pricing Metrics Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Pricing Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Product
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Activity Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Neakasa Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Amazon Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                      Premium
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Strategy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pricingData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.product}</td>
                      <td className="px-4 py-3 text-right">${item.activity.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-green-600">
                          -${item.discountAmount.toFixed(2)}
                          {item.discountRatio && ` (${item.discountRatio})`}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${item.neakasaPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${item.amazonPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-medium ${
                            item.neakasaPrice > item.amazonPrice ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {item.neakasaPrice > item.amazonPrice ? '+' : ''}$
                          {(item.neakasaPrice - item.amazonPrice).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600 max-w-xs truncate">
                          {item.remarks}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {selectedView === 'abtest' && (
        <>
          {/* A/B Test Groups */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {abTestData.map((test, index) => (
              <Card key={index} className="p-6">
                <h4 className="font-semibold text-lg mb-4">{test.product}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Group A</span>
                    <span className="text-lg font-bold text-blue-600">${test.groupA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Group B</span>
                    <span className="text-lg font-bold text-green-600">${test.groupB}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Amazon Match</span>
                      <span
                        className={`font-medium ${test.amazonMatch ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {test.amazonMatch ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600">Test Duration</span>
                      <span className="font-medium">{test.testDuration || '-'} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600">Post-Promo</span>
                      <span className="font-medium">${test.postPromoPrice}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* A/B Test Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">A/B Test Price Variance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={abTestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="groupA"
                  name="Group A (Amazon Match)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="groupB"
                  name="Group B"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="postPromoPrice"
                  name="Post-Promo Price"
                  stroke="#F59E0B"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}

      {selectedView === 'strategy' && (
        <>
          {/* Strategy Effectiveness Radar */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Strategy Effectiveness by Product</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={strategyRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="M1" dataKey="M1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar
                  name="Magic 1"
                  dataKey="Magic 1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                />
                <Radar
                  name="M1 Lite"
                  dataKey="M1 Lite"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Strategic Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Pricing Strategy Insights
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium">Amazon Price Matching</p>
                    <p className="text-xs text-gray-600">
                      M1 and Magic 1 Group A prices match Amazon exactly, showing competitive
                      alignment strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium">Premium Positioning</p>
                    <p className="text-xs text-gray-600">
                      Neakasa maintains 21.8% average premium over Amazon, justified by direct
                      service value
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium">Promotional Depth</p>
                    <p className="text-xs text-gray-600">
                      Fixed $40 discount on M1 series, percentage-based (20%) on Magic 1 for price
                      point optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium">Post-Promotion Strategy</p>
                    <p className="text-xs text-gray-600">
                      Clear return to higher prices after 4-day test period, maximizing margin
                      recovery
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ArrowUpDown className="w-5 h-5 mr-2 text-green-600" />
                Recommended Actions
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Immediate (0-7 days)</h4>
                  <ul className="mt-1 space-y-1 text-xs text-gray-600">
                    <li>• Monitor Group A conversion rates vs Amazon</li>
                    <li>• Track Group B margin impact during 4-day test</li>
                    <li>• Prepare inventory for post-promotion price increase</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Short-term (7-30 days)</h4>
                  <ul className="mt-1 space-y-1 text-xs text-gray-600">
                    <li>• Analyze A/B test results for optimal pricing</li>
                    <li>• Consider M1 Lite Amazon alignment strategy</li>
                    <li>• Test dynamic pricing based on inventory levels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Long-term (30+ days)</h4>
                  <ul className="mt-1 space-y-1 text-xs text-gray-600">
                    <li>• Develop automated price matching system</li>
                    <li>• Create value-add bundles to justify premium</li>
                    <li>• Establish seasonal pricing calendar</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default PricingComparisonAnalysis;
