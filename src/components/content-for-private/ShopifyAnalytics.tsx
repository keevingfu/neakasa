import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';
import {
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Package,
  Star,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { getShopifyMetrics } from '../../services/privateChannelService';
import type { EChartsFormatterParams } from '../../types/charts';

const ShopifyAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState(getShopifyMetrics());
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    // Simulate data refresh
    const interval = setInterval(() => {
      setMetrics(getShopifyMetrics());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Revenue trend chart
  const revenueTrendOption = {
    title: {
      text: 'Monthly Revenue & Order Trends',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['Revenue', 'Orders', 'Cat Products', 'Steamer Products'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: metrics.monthlyTrends.map(t => t.month),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Revenue ($)',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
      {
        type: 'value',
        name: 'Orders',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: metrics.monthlyTrends.map(t => t.revenue),
        itemStyle: { color: '#3B82F6' },
      },
      {
        name: 'Orders',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.monthlyTrends.map(t => t.orders),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'Cat Products',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.monthlyTrends.map(t => t.catProducts),
        itemStyle: { color: '#F59E0B' },
      },
      {
        name: 'Steamer Products',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.monthlyTrends.map(t => t.steamerProducts),
        itemStyle: { color: '#EF4444' },
      },
    ],
  };

  // Product performance chart
  const productPerformanceOption = {
    title: {
      text: 'Product Performance Analysis',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
        const data = Array.isArray(params) ? params[0] : params;
        const product = metrics.productPerformance[data.dataIndex];
        return `${product.product}<br/>
                Revenue: $${product.revenue.toLocaleString()}<br/>
                Units Sold: ${product.units.toLocaleString()}<br/>
                Rating: ${product.rating} ⭐ (${product.reviews} reviews)`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Revenue ($)',
      axisLabel: {
        formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`,
      },
    },
    yAxis: {
      type: 'category',
      data: metrics.productPerformance.map(p => p.product.split(' ').slice(0, 3).join(' ')),
    },
    series: [
      {
        type: 'bar',
        data: metrics.productPerformance.map(p => p.revenue),
        itemStyle: {
          color: (params: EChartsFormatterParams) => {
            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
            return colors[params.dataIndex];
          },
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: EChartsFormatterParams) => `$${((params.value as number) / 1000).toFixed(0)}K`,
        },
      },
    ],
  };

  // Customer segments chart
  const customerSegmentsOption = {
    title: {
      text: 'Customer Segments & Lifetime Value',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: EChartsFormatterParams) => {
        const segment = metrics.customerSegments.find(s => s.segment === params.name);
        return `${params.name}<br/>
                Customers: ${segment?.count.toLocaleString()}<br/>
                Revenue: $${segment?.revenue.toLocaleString()}<br/>
                LTV: $${segment?.lifetimeValue.toFixed(2)}<br/>
                Purchase Frequency: ${segment?.avgPurchaseFrequency}x`;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        data: metrics.customerSegments.map(segment => ({
          name: segment.segment,
          value: segment.revenue,
        })),
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shopify Analytics Dashboard</h2>
        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600">+12.5%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold">${(metrics.overview.totalRevenue / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600">+8.3%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
          <p className="text-2xl font-bold">{metrics.overview.totalOrders.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600">+0.5%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.conversionRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-green-600">+15.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">AOV</h3>
          <p className="text-2xl font-bold">${metrics.overview.avgOrderValue.toFixed(2)}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-green-600">+5.8%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Returning Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.returningCustomerRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag className="h-8 w-8 text-red-600" />
            <span className="text-sm text-red-600">-2.1%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Cart Abandonment</h3>
          <p className="text-2xl font-bold">{metrics.overview.cartAbandonmentRate}%</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={revenueTrendOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={customerSegmentsOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Product Performance Chart */}
      <Card className="p-6">
        <ReactECharts option={productPerformanceOption} style={{ height: '400px' }} />
      </Card>

      {/* Product Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Product Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Product</th>
                <th className="text-right p-4">Units Sold</th>
                <th className="text-right p-4">Revenue</th>
                <th className="text-right p-4">Avg Price</th>
                <th className="text-center p-4">Rating</th>
                <th className="text-right p-4">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {metrics.productPerformance.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{product.product}</td>
                  <td className="text-right p-4">{product.units.toLocaleString()}</td>
                  <td className="text-right p-4">${product.revenue.toLocaleString()}</td>
                  <td className="text-right p-4">${(product.revenue / product.units).toFixed(2)}</td>
                  <td className="text-center p-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </td>
                  <td className="text-right p-4">{product.reviews.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ShopifyAnalytics;