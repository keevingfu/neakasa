import React, { useState } from 'react';
import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';
import {
  Mail,
  Users,
  MousePointer,
  Eye,
  UserX,
  CheckCircle,
} from 'lucide-react';
import { getEDMMetrics } from '../../services/privateChannelService';
import type { EChartsFormatterParams } from '../../types/charts';

const EDMAnalytics: React.FC = () => {
  const [metrics] = useState(getEDMMetrics());
  const [selectedSegment, setSelectedSegment] = useState('all');

  // Campaign performance comparison
  const campaignComparisonOption = {
    title: {
      text: 'Campaign Performance Comparison',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
        const data = Array.isArray(params) ? params[0] : params;
        const campaign = metrics.campaignPerformance[data.dataIndex];
        return campaign.campaign + '<br/>' +
                'Sent: ' + campaign.sent.toLocaleString() + '<br/>' +
                'Open Rate: ' + ((campaign.opened / campaign.delivered) * 100).toFixed(1) + '%<br/>' +
                'CTR: ' + ((campaign.clicked / campaign.opened) * 100).toFixed(1) + '%<br/>' +
                'Conversions: ' + campaign.conversions + '<br/>' +
                'Revenue: $' + campaign.revenue.toLocaleString();
      },
    },
    legend: {
      data: ['Open Rate', 'Click Rate', 'Conversion Rate'],
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
      data: metrics.campaignPerformance.map(c => c.campaign.split(' - ')[0]),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Rate (%)',
      max: 40,
    },
    series: [
      {
        name: 'Open Rate',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => ((c.opened / c.delivered) * 100).toFixed(1)),
        itemStyle: { color: '#3B82F6' },
      },
      {
        name: 'Click Rate',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => ((c.clicked / c.opened) * 100).toFixed(1)),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'Conversion Rate',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => ((c.conversions / c.clicked) * 100).toFixed(1)),
        itemStyle: { color: '#F59E0B' },
      },
    ],
  };

  // Segment performance radar
  const segmentRadarOption = {
    title: {
      text: 'Customer Segment Performance',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: metrics.segmentPerformance.map(s => s.segment),
      bottom: 0,
    },
    radar: {
      shape: 'polygon',
      indicator: [
        { name: 'Subscribers', max: 70000 },
        { name: 'Open Rate (%)', max: 40 },
        { name: 'Click Rate (%)', max: 10 },
        { name: 'Revenue (K)', max: 250 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: metrics.segmentPerformance.map(segment => ({
          name: segment.segment,
          value: [
            segment.subscribers,
            segment.openRate,
            segment.clickRate,
            segment.revenue / 1000,
          ],
          lineStyle: {
            width: 2,
          },
        })),
      },
    ],
  };

  // Content performance heatmap
  const contentHeatmapData = [];
  const contentTypes = metrics.contentPerformance.map(c => c.contentType);
  const performanceMetrics = ['Open Rate', 'Click Rate', 'Emails Sent'];
  
  for (let i = 0; i < contentTypes.length; i++) {
    const content = metrics.contentPerformance[i];
    contentHeatmapData.push([0, i, content.avgOpenRate]);
    contentHeatmapData.push([1, i, content.avgClickRate]);
    contentHeatmapData.push([2, i, content.emails]);
  }

  const contentHeatmapOption = {
    title: {
      text: 'Content Type Performance Heatmap',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      position: 'top',
      formatter: (params: EChartsFormatterParams) => {
        const value = params.value as number[];
        const metric = performanceMetrics[value[0]];
        const contentType = contentTypes[value[1]];
        return contentType + '<br/>' + metric + ': ' + value[2] + (metric.includes('Rate') ? '%' : '');
      },
    },
    grid: {
      height: '50%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: performanceMetrics,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: contentTypes,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: 35,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      color: ['#10B981', '#F59E0B', '#EF4444'],
    },
    series: [
      {
        type: 'heatmap',
        data: contentHeatmapData,
        label: {
          show: true,
          formatter: (params: EChartsFormatterParams) => {
            const value = params.value as number[];
            return value[2].toString() + (performanceMetrics[value[0]].includes('Rate') ? '%' : '');
          },
        },
      },
    ],
  };

  // Revenue funnel
  const revenueFunnelOption = {
    title: {
      text: 'Email Marketing Revenue Funnel',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: EChartsFormatterParams) => {
        const campaign = metrics.campaignPerformance.find(c => c.campaign.includes(params.name));
        if (campaign) {
          return params.name + '<br/>' +
                  'Sent: ' + campaign.sent.toLocaleString() + '<br/>' +
                  'Revenue: $' + campaign.revenue.toLocaleString();
        }
        return '';
      },
    },
    series: [
      {
        type: 'funnel',
        left: '10%',
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}\n${c}K',
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#fff',
        },
        data: metrics.campaignPerformance
          .sort((a, b) => b.revenue - a.revenue)
          .map((campaign, index) => ({
            name: campaign.campaign.split(' - ')[0],
            value: (campaign.revenue / 1000).toFixed(0),
            itemStyle: {
              color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index],
            },
          })),
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Direct Marketing Analytics</h2>
        <select
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Segments</option>
          <option value="cat-owners">Cat Owners</option>
          <option value="professionals">Professionals</option>
          <option value="home-users">Home Users</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600">+12.4%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Subscribers</h3>
          <p className="text-2xl font-bold">{(metrics.overview.totalSubscribers / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600">+8.3%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Active Subscribers</h3>
          <p className="text-2xl font-bold">{(metrics.overview.activeSubscribers / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600">+2.1%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Open Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.avgOpenRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MousePointer className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-green-600">+0.8%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Click Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.avgClickRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <UserX className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-red-600">+0.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Unsubscribe Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.unsubscribeRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Mail className="h-8 w-8 text-teal-600" />
            <span className="text-sm text-green-600">+1.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Deliverability</h3>
          <p className="text-2xl font-bold">{metrics.overview.deliverabilityRate}%</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={campaignComparisonOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={segmentRadarOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={contentHeatmapOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={revenueFunnelOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Campaign Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Campaign</th>
                <th className="text-right p-4">Sent</th>
                <th className="text-right p-4">Delivered</th>
                <th className="text-right p-4">Open Rate</th>
                <th className="text-right p-4">CTR</th>
                <th className="text-right p-4">Conversions</th>
                <th className="text-right p-4">Revenue</th>
                <th className="text-right p-4">ROI</th>
              </tr>
            </thead>
            <tbody>
              {metrics.campaignPerformance.map((campaign, index) => {
                const openRate = ((campaign.opened / campaign.delivered) * 100).toFixed(1);
                const ctr = ((campaign.clicked / campaign.opened) * 100).toFixed(1);
                const roi = ((campaign.revenue / (campaign.sent * 0.02)) * 100).toFixed(0); // Assuming $0.02 per email
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{campaign.campaign}</td>
                    <td className="text-right p-4">{campaign.sent.toLocaleString()}</td>
                    <td className="text-right p-4">
                      {campaign.delivered.toLocaleString()}
                      <span className="text-sm text-gray-500 ml-1">
                        ({((campaign.delivered / campaign.sent) * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="text-right p-4">{openRate}%</td>
                    <td className="text-right p-4">{ctr}%</td>
                    <td className="text-right p-4">{campaign.conversions}</td>
                    <td className="text-right p-4">${campaign.revenue.toLocaleString()}</td>
                    <td className="text-right p-4">
                      <span className={`font-semibold ${Number(roi) > 100 ? 'text-green-600' : 'text-gray-600'}`}>
                        {roi}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Segment Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.segmentPerformance.map((segment, index) => (
          <Card key={index} className="p-6">
            <h4 className="font-semibold text-lg mb-3">{segment.segment}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subscribers:</span>
                <span className="font-medium">{segment.subscribers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Open Rate:</span>
                <span className="font-medium">{segment.openRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Click Rate:</span>
                <span className="font-medium">{segment.clickRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">${(segment.revenue / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EDMAnalytics;
