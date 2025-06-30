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
  Treemap,
} from 'recharts';
import {
  Globe,
  ShoppingBag,
  Clock,
  TrendingUp,
  Award,
  MapPin,
  Package,
  Tag,
} from 'lucide-react';
import { CustomTooltipProps } from '../../types/charts';

interface MarketData {
  country: string;
  region: string;
  products: number;
  m1Count: number;
  m1LiteCount: number;
  magic1Count: number;
  currency: string;
  priceRange: string;
  promotionTypes: string[];
  timeZone: string;
  color: string;
}

const GlobalPrimeDayAnalysis: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'americas' | 'europe' | 'apac'>(
    'all'
  );
  const [selectedProduct, setSelectedProduct] = useState<'all' | 'm1' | 'm1lite' | 'magic1'>('all');

  // Market data by country
  const marketData: MarketData[] = [
    {
      country: 'United States',
      region: 'Americas',
      products: 3,
      m1Count: 2,
      m1LiteCount: 1,
      magic1Count: 0,
      currency: 'USD',
      priceRange: '$379.99-$382.49',
      promotionTypes: ['DOTD', 'Prime Exclusive'],
      timeZone: 'PDT',
      color: '#3B82F6',
    },
    {
      country: 'Canada',
      region: 'Americas',
      products: 2,
      m1Count: 1,
      m1LiteCount: 0,
      magic1Count: 1,
      currency: 'CAD',
      priceRange: '$118.99-$559.99',
      promotionTypes: ['BD', 'DOTD'],
      timeZone: 'PDT',
      color: '#EF4444',
    },
    {
      country: 'Japan',
      region: 'APAC',
      products: 2,
      m1Count: 2,
      m1LiteCount: 0,
      magic1Count: 0,
      currency: 'JPY',
      priceRange: '¥41,859',
      promotionTypes: ['BD'],
      timeZone: 'JST',
      color: '#EC4899',
    },
    {
      country: 'Germany',
      region: 'Europe',
      products: 3,
      m1Count: 1,
      m1LiteCount: 1,
      magic1Count: 1,
      currency: 'EUR',
      priceRange: '€99.99-€399.99',
      promotionTypes: ['DOTD', 'Prime Exclusive', 'BD'],
      timeZone: 'GMT+2',
      color: '#F59E0B',
    },
    {
      country: 'Italy',
      region: 'Europe',
      products: 3,
      m1Count: 1,
      m1LiteCount: 1,
      magic1Count: 1,
      currency: 'EUR',
      priceRange: '€99.99-€399.99',
      promotionTypes: ['DOTD', 'Prime Exclusive'],
      timeZone: 'GMT+2',
      color: '#10B981',
    },
    {
      country: 'France',
      region: 'Europe',
      products: 3,
      m1Count: 1,
      m1LiteCount: 1,
      magic1Count: 1,
      currency: 'EUR',
      priceRange: '€99.99-€399.99',
      promotionTypes: ['DOTD', 'Prime Exclusive'],
      timeZone: 'GMT+2',
      color: '#6366F1',
    },
    {
      country: 'United Kingdom',
      region: 'Europe',
      products: 2,
      m1Count: 1,
      m1LiteCount: 0,
      magic1Count: 1,
      currency: 'EUR',
      priceRange: '€99.99-€399.99',
      promotionTypes: ['DOTD', 'BD'],
      timeZone: 'GMT+1',
      color: '#8B5CF6',
    },
    {
      country: 'Spain',
      region: 'Europe',
      products: 3,
      m1Count: 1,
      m1LiteCount: 1,
      magic1Count: 1,
      currency: 'EUR',
      priceRange: '€103.99-€399.99',
      promotionTypes: ['Prime Exclusive'],
      timeZone: 'GMT+2',
      color: '#DC2626',
    },
    {
      country: 'Australia',
      region: 'APAC',
      products: 1,
      m1Count: 1,
      m1LiteCount: 0,
      magic1Count: 0,
      currency: 'AUD',
      priceRange: '$559.00',
      promotionTypes: ['DOTD'],
      timeZone: 'AEST',
      color: '#059669',
    },
  ];

  // Filter data based on selection
  const filteredData = marketData.filter((market) => {
    const regionMatch =
      selectedRegion === 'all' ||
      (selectedRegion === 'americas' && ['United States', 'Canada'].includes(market.country)) ||
      (selectedRegion === 'europe' &&
        ['Germany', 'Italy', 'France', 'United Kingdom', 'Spain'].includes(market.country)) ||
      (selectedRegion === 'apac' && ['Japan', 'Australia'].includes(market.country));

    return regionMatch;
  });

  // Calculate summary metrics
  const summaryMetrics = {
    totalMarkets: filteredData.length,
    totalProducts: filteredData.reduce((sum, m) => sum + m.products, 0),
    totalM1: filteredData.reduce((sum, m) => sum + m.m1Count, 0),
    totalM1Lite: filteredData.reduce((sum, m) => sum + m.m1LiteCount, 0),
    totalMagic1: filteredData.reduce((sum, m) => sum + m.magic1Count, 0),
    avgProductsPerMarket:
      filteredData.length > 0
        ? (filteredData.reduce((sum, m) => sum + m.products, 0) / filteredData.length).toFixed(1)
        : 0,
  };

  // Regional distribution
  const regionalDistribution = [
    {
      region: 'Americas',
      markets: 2,
      products: 5,
      revenue: 45000,
      color: '#3B82F6',
    },
    {
      region: 'Europe',
      markets: 5,
      products: 14,
      revenue: 120000,
      color: '#10B981',
    },
    {
      region: 'APAC',
      markets: 2,
      products: 3,
      revenue: 35000,
      color: '#F59E0B',
    },
  ];

  // Product availability by market
  const productAvailability = filteredData.map((market) => ({
    country: market.country,
    M1: market.m1Count,
    'M1 Lite': market.m1LiteCount,
    'Magic 1': market.magic1Count,
    total: market.products,
  }));

  // Promotion type distribution
  const promotionTypes = ['DOTD', 'Prime Exclusive', 'BD'];
  const promotionDistribution = promotionTypes.map((type) => ({
    type,
    count: filteredData.reduce(
      (sum, market) => sum + (market.promotionTypes.includes(type) ? 1 : 0),
      0
    ),
    percentage:
      filteredData.length > 0
        ? (
            (filteredData.reduce(
              (sum, market) => sum + (market.promotionTypes.includes(type) ? 1 : 0),
              0
            ) /
              filteredData.length) *
            100
          ).toFixed(1)
        : 0,
  }));

  // Time zone coverage
  const timeZoneCoverage = [
    { zone: 'PDT (Americas)', start: '7/8 12:00 AM', duration: 96, offset: -7 },
    { zone: 'GMT+2 (Europe)', start: '7/8 12:00 AM', duration: 96, offset: 2 },
    { zone: 'JST (Japan)', start: '7/8 12:00 AM', duration: 168, offset: 9 },
    { zone: 'AEST (Australia)', start: '7/8 12:00 AM', duration: 96, offset: 10 },
  ];

  // Treemap data for market size
  const treemapData = filteredData.map((market) => ({
    name: market.country,
    size: market.products * 1000,
    value: market.products,
    color: market.color,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
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
          <h2 className="text-2xl font-bold text-gray-900">Global Prime Day Analysis</h2>
          <p className="text-gray-600 mt-1">
            Amazon Prime Day performance across 9 international markets
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as 'all' | 'americas' | 'europe' | 'apac')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Regions</option>
            <option value="americas">Americas</option>
            <option value="europe">Europe</option>
            <option value="apac">Asia-Pacific</option>
          </select>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as 'all' | 'm1' | 'm1lite' | 'magic1')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Products</option>
            <option value="m1">M1 Cat Litter Box</option>
            <option value="m1lite">M1 Lite</option>
            <option value="magic1">Magic 1 Steamer</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Markets</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalMarkets}</p>
              <p className="text-sm text-gray-600 mt-1">countries</p>
            </div>
            <Globe className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total SKUs</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalProducts}</p>
              <p className="text-sm text-gray-600 mt-1">products</p>
            </div>
            <Package className="w-10 h-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">M1 Units</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalM1}</p>
              <p className="text-sm text-green-600 mt-1">flagship</p>
            </div>
            <ShoppingBag className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">M1 Lite</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalM1Lite}</p>
              <p className="text-sm text-blue-600 mt-1">mid-range</p>
            </div>
            <Tag className="w-10 h-10 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Magic 1</p>
              <p className="text-2xl font-bold">{summaryMetrics.totalMagic1}</p>
              <p className="text-sm text-purple-600 mt-1">cross-sell</p>
            </div>
            <Award className="w-10 h-10 text-indigo-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg/Market</p>
              <p className="text-2xl font-bold">{summaryMetrics.avgProductsPerMarket}</p>
              <p className="text-sm text-gray-600 mt-1">products</p>
            </div>
            <TrendingUp className="w-10 h-10 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Regional Distribution and Product Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Regional Market Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="markets" name="Markets" fill="#3B82F6" />
              <Bar yAxisId="left" dataKey="products" name="Products" fill="#10B981" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="Est. Revenue"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Availability by Market */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Availability by Market</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productAvailability} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="country" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="M1" stackId="a" fill="#10B981" />
              <Bar dataKey="M1 Lite" stackId="a" fill="#3B82F6" />
              <Bar dataKey="Magic 1" stackId="a" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Market Size Treemap */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Market Size by Country (Product Count)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip
              content={({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number } }> }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-sm">Products: {data.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </Card>

      {/* Promotion Types and Time Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promotion Type Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Promotion Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={promotionDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ type, percentage }) => `${type}: ${percentage}%`}
              >
                {promotionDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                DOTD (Deal of the Day)
              </span>
              <span className="font-medium">High visibility</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                Prime Exclusive
              </span>
              <span className="font-medium">Member benefit</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                BD (Best Deal)
              </span>
              <span className="font-medium">Value focus</span>
            </div>
          </div>
        </Card>

        {/* Time Zone Coverage */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Global Time Zone Coverage</h3>
          <div className="space-y-4">
            {timeZoneCoverage.map((zone, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{zone.zone}</span>
                  </div>
                  <span className="text-sm text-gray-600">{zone.duration}h</span>
                </div>
                <div className="text-sm text-gray-600">
                  Start: {zone.start} (UTC{zone.offset > 0 ? '+' : ''}
                  {zone.offset})
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${(zone.duration / 168) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Market Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Market Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Country</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Region</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                  Products
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">M1</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">M1 Lite</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Magic 1</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Price Range
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                  Promotion Types
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((market, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {market.country}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        market.region === 'Americas'
                          ? 'bg-blue-100 text-blue-800'
                          : market.region === 'Europe'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {market.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-medium">{market.products}</td>
                  <td className="px-4 py-3 text-sm text-center">{market.m1Count || '-'}</td>
                  <td className="px-4 py-3 text-sm text-center">{market.m1LiteCount || '-'}</td>
                  <td className="px-4 py-3 text-sm text-center">{market.magic1Count || '-'}</td>
                  <td className="px-4 py-3 text-sm">{market.priceRange}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {market.promotionTypes.map((type, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Global Market Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Europe Dominates Coverage</p>
                <p className="text-xs text-gray-600">
                  5 markets with consistent €399.99 pricing for M1, showing strong regional
                  coordination
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Product Mix Strategy</p>
                <p className="text-xs text-gray-600">
                  Europe & Germany lead with full 3-product lineup, while APAC focuses on flagship
                  M1
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">Japan Extended Event</p>
                <p className="text-xs text-gray-600">
                  7-day event (vs 4 days elsewhere) indicates strategic importance of Japanese
                  market
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <div>
                <p className="text-sm font-medium">DOTD Preference</p>
                <p className="text-xs text-gray-600">
                  Deal of the Day is primary promotion type, maximizing visibility on Prime Day
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-green-600" />
            Regional Recommendations
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Americas</h4>
              <ul className="mt-1 space-y-1 text-xs text-gray-600">
                <li>• Expand Magic 1 presence in US market</li>
                <li>• Test M1 Lite in Canada for mid-market penetration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Europe</h4>
              <ul className="mt-1 space-y-1 text-xs text-gray-600">
                <li>• Leverage uniform pricing for pan-European campaigns</li>
                <li>• UK shows opportunity for M1 Lite introduction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">APAC</h4>
              <ul className="mt-1 space-y-1 text-xs text-gray-600">
                <li>• Introduce Magic 1 in Japan to match Europe strategy</li>
                <li>• Expand Australia portfolio beyond single M1 SKU</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GlobalPrimeDayAnalysis;
