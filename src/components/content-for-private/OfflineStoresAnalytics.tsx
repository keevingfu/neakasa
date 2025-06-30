import React, { useState } from 'react';
import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {
  Store,
  Users,
  DollarSign,
  Package,
  Activity,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { getOfflineStoresMetrics } from '../../services/privateChannelService';
import type { EChartsFormatterParams } from '../../types/charts';

const OfflineStoresAnalytics: React.FC = () => {
  const [metrics] = useState(getOfflineStoresMetrics());
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Store performance comparison
  const storePerformanceOption = {
    title: {
      text: 'Top Store Performance',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
        const data = Array.isArray(params) ? params[0] : params;
        const store = metrics.storePerformance[data.dataIndex];
        return `${store.store}<br/>
                Revenue: $${store.revenue.toLocaleString()}<br/>
                Visitors: ${store.visitors.toLocaleString()}<br/>
                Conversion: ${store.conversion}%<br/>
                Top Product: ${store.topProduct}`;
      },
    },
    legend: {
      data: ['Revenue', 'Visitors', 'Conversion Rate'],
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
      data: metrics.storePerformance.map(s => s.store.split(' - ')[0]),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
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
        name: 'Visitors / Conversion (%)',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: metrics.storePerformance.map(s => s.revenue),
        itemStyle: { color: '#3B82F6' },
      },
      {
        name: 'Visitors',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.storePerformance.map(s => s.visitors),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'Conversion Rate',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.storePerformance.map(s => s.conversion),
        itemStyle: { color: '#F59E0B' },
      },
    ],
  };

  // Product distribution pie chart
  const productDistributionOption = {
    title: {
      text: 'Product Category Distribution',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: EChartsFormatterParams) => {
        const product = metrics.productDistribution.find(p => p.category === params.name);
        return `${params.name}<br/>
                Units: ${product?.units.toLocaleString() || 0}<br/>
                Revenue: $${((product?.revenue || 0) / 1000000).toFixed(2)}M<br/>
                Stores: ${product?.stores || 0}`;
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
        data: metrics.productDistribution.map(product => ({
          name: product.category,
          value: product.revenue,
          itemStyle: {
            color: product.category.includes('Litter') ? '#3B82F6' : 
                   product.category.includes('Steamer') ? '#10B981' : '#F59E0B',
          },
        })),
      },
    ],
  };

  // Regional performance map
  const regionalMapOption = {
    title: {
      text: 'Regional Performance Comparison',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['Revenue', 'Stores', 'Growth'],
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
      data: metrics.regionalPerformance.map(r => r.region),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Revenue ($ Million)',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `$${(value / 1000000).toFixed(1)}M`,
        },
      },
      {
        type: 'value',
        name: 'Stores / Growth (%)',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: metrics.regionalPerformance.map(r => r.revenue),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#1E40AF' },
          ]),
        },
      },
      {
        name: 'Stores',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.regionalPerformance.map(r => r.stores),
        itemStyle: { color: '#10B981' },
        lineStyle: { width: 3 },
      },
      {
        name: 'Growth',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.regionalPerformance.map(r => r.growth),
        itemStyle: { color: '#F59E0B' },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Inventory turnover heatmap
  const inventoryHeatmapData = [];
  const products = ['M1 Litter Box', 'F1 Smart Box', 'S1 Pro Steamer', 'S2 Portable', 'Accessories'];
  const stores = ['NYC', 'California', 'Texas', 'Florida', 'Illinois'];
  
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < stores.length; j++) {
      inventoryHeatmapData.push([j, i, Math.random() * 8 + 2]);
    }
  }

  const inventoryHeatmapOption = {
    title: {
      text: 'Inventory Turnover by Product & Store',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      position: 'top',
      formatter: (params: EChartsFormatterParams) => {
        const value = params.value as number[];
        return `${stores[value[0]]} - ${products[value[1]]}<br/>Turnover: ${value[2].toFixed(1)}x`;
      },
    },
    grid: {
      height: '50%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: stores,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: products,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      color: ['#10B981', '#F59E0B', '#EF4444'],
    },
    series: [
      {
        type: 'heatmap',
        data: inventoryHeatmapData,
        label: {
          show: true,
          formatter: (params: EChartsFormatterParams) => {
            const value = params.value as number[];
            return value[2].toFixed(1);
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Offline Stores Analytics</h2>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Regions</option>
          <option value="north-america">North America</option>
          <option value="europe">Europe</option>
          <option value="asia-pacific">Asia Pacific</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600">+8</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Stores</h3>
          <p className="text-2xl font-bold">{metrics.overview.totalStores}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600">+15.3%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold">${(metrics.overview.totalRevenue / 1000000).toFixed(1)}M</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600">+9.8%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Foot Traffic</h3>
          <p className="text-2xl font-bold">{(metrics.overview.footTraffic / 1000).toFixed(0)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-green-600">+1.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.conversionRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-green-600">+$23</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Transaction</h3>
          <p className="text-2xl font-bold">${metrics.overview.avgTransactionValue}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-8 w-8 text-teal-600" />
            <span className="text-sm text-green-600">+0.3</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Inventory Turnover</h3>
          <p className="text-2xl font-bold">{metrics.overview.inventoryTurnover}x</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={storePerformanceOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={productDistributionOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={regionalMapOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={inventoryHeatmapOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Store Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Store Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Store Location</th>
                <th className="text-right p-4">Revenue</th>
                <th className="text-right p-4">Visitors</th>
                <th className="text-right p-4">Conversion</th>
                <th className="text-right p-4">Avg Transaction</th>
                <th className="text-right p-4">Top Product</th>
                <th className="text-right p-4">YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {metrics.storePerformance.map((store, index) => {
                const avgTransaction = store.revenue / (store.visitors * store.conversion / 100);
                const growth = Math.random() * 30 - 5; // Simulated growth
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{store.store}</td>
                    <td className="text-right p-4">${store.revenue.toLocaleString()}</td>
                    <td className="text-right p-4">{store.visitors.toLocaleString()}</td>
                    <td className="text-right p-4">{store.conversion}%</td>
                    <td className="text-right p-4">${avgTransaction.toFixed(2)}</td>
                    <td className="text-right p-4">{store.topProduct}</td>
                    <td className="text-right p-4">
                      <span className={`font-semibold ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Regional Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.regionalPerformance.map((region, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">{region.region}</h4>
              <MapPin className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stores</span>
                <span className="font-medium">{region.stores}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium">${(region.revenue / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth</span>
                <span className={`font-medium ${region.growth > 10 ? 'text-green-600' : 'text-gray-600'}`}>
                  +{region.growth}%
                </span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">Revenue per Store</div>
                <div className="text-lg font-semibold">
                  ${((region.revenue / region.stores) / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfflineStoresAnalytics;
