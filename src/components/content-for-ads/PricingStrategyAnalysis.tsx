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
import { 
  DollarSign, 
  TrendingDown, 
  Tag, 
  Percent, 
  ShoppingCart,
  AlertCircle,
  Calendar,
  Globe,
  Calculator
} from 'lucide-react';

interface ProductPricing {
  series: string;
  model: string;
  listPrice: number;
  regularPrice: number;
  pdPrice: number;
  pdPriceEur: number;
  summerPrice: number;
  summerPriceEur: number;
  pdDiscount: number;
  summerDiscount: number;
  maxDiscount: number;
}

const PricingStrategyAnalysis: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'usd' | 'eur'>('usd');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'pd' | 'summer'>('all');

  // Product pricing data
  const products: ProductPricing[] = [
    {
      series: 'Cat Litter Box',
      model: 'M1',
      listPrice: 599.99,
      regularPrice: 499.99,
      pdPrice: 379.99,
      pdPriceEur: 399.99,
      summerPrice: 479.99,
      summerPriceEur: 449.99,
      pdDiscount: 36.7,
      summerDiscount: 20.0,
      maxDiscount: 36.7
    },
    {
      series: 'Cat Litter Box',
      model: 'M1 Lite',
      listPrice: 499.99,
      regularPrice: 449.99,
      pdPrice: 399.99,
      pdPriceEur: 399.99,
      summerPrice: 429.99,
      summerPriceEur: 429.99,
      pdDiscount: 20.0,
      summerDiscount: 14.0,
      maxDiscount: 20.0
    },
    {
      series: 'Garment Steamer',
      model: 'Magic1',
      listPrice: 149.99,
      regularPrice: 99.99,
      pdPrice: 79.99,
      pdPriceEur: 99.99,
      summerPrice: 89.99,
      summerPriceEur: 99.99,
      pdDiscount: 46.7,
      summerDiscount: 40.0,
      maxDiscount: 46.7
    }
  ];

  // Calculate metrics
  const calculateMetrics = () => {
    const avgPdDiscount = products.reduce((sum, p) => sum + p.pdDiscount, 0) / products.length;
    const avgSummerDiscount = products.reduce((sum, p) => sum + p.summerDiscount, 0) / products.length;
    const totalListValue = products.reduce((sum, p) => sum + p.listPrice, 0);
    const totalPdValue = products.reduce((sum, p) => sum + p.pdPrice, 0);
    const totalSummerValue = products.reduce((sum, p) => sum + p.summerPrice, 0);
    
    return {
      avgPdDiscount,
      avgSummerDiscount,
      totalListValue,
      totalPdValue,
      totalSummerValue,
      totalSavingsPd: totalListValue - totalPdValue,
      totalSavingsSummer: totalListValue - totalSummerValue
    };
  };

  const metrics = calculateMetrics();

  // Price comparison data
  const priceComparisonData = products.map(product => ({
    name: product.model,
    listPrice: product.listPrice,
    regularPrice: product.regularPrice,
    pdPrice: selectedCurrency === 'usd' ? product.pdPrice : product.pdPriceEur,
    summerPrice: selectedCurrency === 'usd' ? product.summerPrice : product.summerPriceEur
  }));

  // Discount analysis data
  const discountData = products.map(product => ({
    name: product.model,
    pdDiscount: product.pdDiscount,
    summerDiscount: product.summerDiscount,
    series: product.series
  }));

  // Price timeline data
  const timelineData = [
    { date: 'Regular', M1: 499.99, 'M1 Lite': 449.99, Magic1: 99.99 },
    { date: 'PD (7/8-11)', M1: 379.99, 'M1 Lite': 399.99, Magic1: 79.99 },
    { date: 'Summer (7/12-20)', M1: 479.99, 'M1 Lite': 429.99, Magic1: 89.99 }
  ];

  // Savings potential data
  const savingsData = products.map(product => ({
    name: product.model,
    pdSavings: product.listPrice - product.pdPrice,
    summerSavings: product.listPrice - product.summerPrice,
    regularSavings: product.listPrice - product.regularPrice
  }));

  // Category performance radar
  const categoryRadarData = [
    {
      metric: 'Price Point',
      'Cat Litter Box': 80,
      'Garment Steamer': 20
    },
    {
      metric: 'Discount Depth',
      'Cat Litter Box': 28,
      'Garment Steamer': 47
    },
    {
      metric: 'Market Appeal',
      'Cat Litter Box': 85,
      'Garment Steamer': 65
    },
    {
      metric: 'Profit Margin',
      'Cat Litter Box': 60,
      'Garment Steamer': 40
    },
    {
      metric: 'Sales Volume',
      'Cat Litter Box': 45,
      'Garment Steamer': 75
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toFixed(2)}
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
          <h2 className="text-2xl font-bold text-gray-900">Pricing Strategy Analysis</h2>
          <p className="text-gray-600 mt-1">Prime Day & Summer Sale pricing optimization insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value as 'usd' | 'eur')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Periods</option>
            <option value="pd">Prime Day (7/8-11)</option>
            <option value="summer">Summer Sale (7/12-20)</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg PD Discount</p>
              <p className="text-2xl font-bold text-red-600">{metrics.avgPdDiscount.toFixed(1)}%</p>
              <p className="text-sm text-gray-600 mt-1">vs list price</p>
            </div>
            <Percent className="w-12 h-12 text-red-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total PD Savings</p>
              <p className="text-2xl font-bold text-green-600">${metrics.totalSavingsPd.toFixed(0)}</p>
              <p className="text-sm text-gray-600 mt-1">for bundle</p>
            </div>
            <Tag className="w-12 h-12 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Deal</p>
              <p className="text-xl font-bold">Magic1</p>
              <p className="text-sm text-red-600 mt-1">46.7% off</p>
            </div>
            <TrendingDown className="w-12 h-12 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Price Range</p>
              <p className="text-xl font-bold">$79.99-$479.99</p>
              <p className="text-sm text-gray-600 mt-1">3 products</p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sale Period</p>
              <p className="text-xl font-bold">13 Days</p>
              <p className="text-sm text-gray-600 mt-1">Jul 8-20</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Price Comparison Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Price Comparison Across Periods</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={priceComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="listPrice" name="List Price" fill="#94A3B8" />
            <Bar dataKey="regularPrice" name="Regular Price" fill="#3B82F6" />
            <Bar dataKey="pdPrice" name="Prime Day Price" fill="#EF4444" />
            <Bar dataKey="summerPrice" name="Summer Sale Price" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discount Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Discount Depth Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={discountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="pdDiscount" name="Prime Day Discount" fill="#EF4444" />
              <Bar dataKey="summerDiscount" name="Summer Sale Discount" fill="#F59E0B" />
              <Line 
                type="monotone" 
                dataKey="pdDiscount" 
                stroke="#7C3AED" 
                strokeWidth={2}
                dot={{ fill: '#7C3AED', r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Price Timeline */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Price Timeline Evolution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="M1" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="M1 Lite" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="Magic1" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Savings Potential */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Savings Potential</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="regularSavings" name="Regular Savings" fill="#94A3B8" stackId="a" />
            <Bar dataKey="summerSavings" name="Summer Sale Savings" fill="#F59E0B" stackId="b" />
            <Bar dataKey="pdSavings" name="Prime Day Savings" fill="#EF4444" stackId="c" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Product Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Pricing Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">List Price</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Regular</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Prime Day</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">PD Discount</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Summer Sale</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Summer Discount</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Best Deal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{product.model}</p>
                      <p className="text-xs text-gray-500">{product.series}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className="line-through text-gray-400">${product.listPrice}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    ${product.regularPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-red-600">
                    ${product.pdPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      -{product.pdDiscount}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-orange-600">
                    ${product.summerPrice}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                      -{product.summerDiscount}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.pdDiscount > product.summerDiscount ? (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Prime Day
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        Summer Sale
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Performance Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={categoryRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar 
                name="Cat Litter Box" 
                dataKey="Cat Litter Box" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6} 
              />
              <Radar 
                name="Garment Steamer" 
                dataKey="Garment Steamer" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.6} 
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Strategic Insights */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Pricing Strategy Insights
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Prime Day Strategy</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Magic1 leads with 46.7% discount</strong> - aggressive pricing to drive volume</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>M1 at $379.99</strong> - 36.7% off creates strong value perception</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>M1 Lite conservative at 20% off</strong> - protecting margin on newer model</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Market Positioning</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Cat Litter Box series targets premium segment with $380-480 pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Magic1 positioned as accessible entry point at $79.99-89.99</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>EUR pricing shows minimal variation - opportunity for optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
          Strategic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Immediate Actions</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-2">1.</span>
                <span><strong>Push Magic1 during Prime Day</strong> - Best margin opportunity at 46.7% off</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">2.</span>
                <span><strong>Bundle M1 + Magic1</strong> - Create value bundle at $459.98 (save $290)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">3.</span>
                <span><strong>Flash sales for M1 Lite</strong> - Limited time offers to boost adoption</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Long-term Strategy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-2">4.</span>
                <span><strong>Optimize EUR pricing</strong> - Current conversion rates leave money on table</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">5.</span>
                <span><strong>Test dynamic pricing</strong> - Adjust based on inventory and demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-2">6.</span>
                <span><strong>Create urgency messaging</strong> - "Best price of the year" for PD deals</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PricingStrategyAnalysis;