import React, { useState } from 'react';
import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';
import {
  MessageCircle,
  Send,
  CheckCheck,
  Users,
  Clock,
  Star,
} from 'lucide-react';
import { getWhatsAppMetrics } from '../../services/privateChannelService';
import type { EChartsFormatterParams } from '../../types/charts';

const WhatsAppAnalytics: React.FC = () => {
  const [metrics] = useState(getWhatsAppMetrics());
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  // Campaign performance funnel
  const campaignFunnelOption = {
    title: {
      text: 'Campaign Performance Funnel',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
        const data = Array.isArray(params) ? params[0] : params;
        const campaign = metrics.campaignPerformance[data.dataIndex];
        return `${campaign.campaign}<br/>
                Sent: ${campaign.sent.toLocaleString()}<br/>
                Delivered: ${campaign.delivered.toLocaleString()} (${((campaign.delivered / campaign.sent) * 100).toFixed(1)}%)<br/>
                Read: ${campaign.read.toLocaleString()} (${((campaign.read / campaign.delivered) * 100).toFixed(1)}%)<br/>
                Clicked: ${campaign.clicks.toLocaleString()} (${((campaign.clicks / campaign.read) * 100).toFixed(1)}%)<br/>
                Converted: ${campaign.conversions} (${((campaign.conversions / campaign.clicks) * 100).toFixed(1)}%)`;
      },
    },
    legend: {
      data: ['Sent', 'Delivered', 'Read', 'Clicked', 'Converted'],
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
      data: metrics.campaignPerformance.map(c => c.campaign.split(' ').slice(0, 2).join(' ')),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Messages',
    },
    series: [
      {
        name: 'Sent',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => c.sent),
        itemStyle: { color: '#3B82F6' },
      },
      {
        name: 'Delivered',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => c.delivered),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'Read',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => c.read),
        itemStyle: { color: '#F59E0B' },
      },
      {
        name: 'Clicked',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => c.clicks),
        itemStyle: { color: '#8B5CF6' },
      },
      {
        name: 'Converted',
        type: 'bar',
        data: metrics.campaignPerformance.map(c => c.conversions),
        itemStyle: { color: '#EF4444' },
      },
    ],
  };

  // Message types distribution
  const messageTypesOption = {
    title: {
      text: 'Message Types Distribution',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
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
        data: metrics.messageTypes.map(type => ({
          name: type.type,
          value: type.count,
        })),
      },
    ],
  };

  // Customer journey funnel
  const customerJourneyOption = {
    title: {
      text: 'Customer Journey Funnel',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: EChartsFormatterParams) => {
        const stage = metrics.customerJourney.find(s => s.stage === params.name);
        return `${params.name}<br/>
                Users: ${stage?.users.toLocaleString() || 0}<br/>
                ${stage && stage.conversionToNext && stage.conversionToNext > 0 ? `Conversion to Next: ${stage.conversionToNext}%` : ''}`;
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
        sort: 'none',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}\n{c} users',
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#fff',
        },
        data: metrics.customerJourney.map((stage, index) => ({
          name: stage.stage,
          value: 100 - (index * 20),
          itemStyle: {
            color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index],
          },
        })),
      },
    ],
  };

  // Response time heatmap
  const responseTimeData = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < hours.length; j++) {
      responseTimeData.push([j, i, Math.random() * 10]);
    }
  }

  const responseTimeHeatmapOption = {
    title: {
      text: 'Response Time Heatmap (Hours)',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      position: 'top',
      formatter: (params: EChartsFormatterParams) => {
        const value = params.value as number[];
        return `${days[value[1]]} ${hours[value[0]]}<br/>Avg Response: ${value[2].toFixed(1)} hours`;
      },
    },
    grid: {
      height: '50%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      color: ['#EF4444', '#F59E0B', '#10B981'],
    },
    series: [
      {
        type: 'heatmap',
        data: responseTimeData,
        label: { show: false },
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">WhatsApp Business Analytics</h2>
        <select
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Campaigns</option>
          <option value="product">Product Launches</option>
          <option value="promotion">Promotions</option>
          <option value="support">Customer Support</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600">+15.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Contacts</h3>
          <p className="text-2xl font-bold">{metrics.overview.totalContacts.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600">+8.7%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Active Chats</h3>
          <p className="text-2xl font-bold">{metrics.overview.activeChats.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Send className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600">+23.4%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Messages Sent</h3>
          <p className="text-2xl font-bold">{(metrics.overview.messagesSent / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCheck className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-green-600">+19.8%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Messages Received</h3>
          <p className="text-2xl font-bold">{(metrics.overview.messagesReceived / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-green-600">-12.3%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Avg Response</h3>
          <p className="text-2xl font-bold">{metrics.overview.avgResponseTime}h</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="h-8 w-8 text-yellow-600" />
            <span className="text-sm text-green-600">+0.3</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Satisfaction</h3>
          <p className="text-2xl font-bold">{metrics.overview.satisfactionScore}/5</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={campaignFunnelOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={messageTypesOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={customerJourneyOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={responseTimeHeatmapOption} style={{ height: '400px' }} />
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
                <th className="text-right p-4">Read Rate</th>
                <th className="text-right p-4">CTR</th>
                <th className="text-right p-4">Conversions</th>
                <th className="text-right p-4">Conv Rate</th>
              </tr>
            </thead>
            <tbody>
              {metrics.campaignPerformance.map((campaign, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{campaign.campaign}</td>
                  <td className="text-right p-4">{campaign.sent.toLocaleString()}</td>
                  <td className="text-right p-4">
                    {campaign.delivered.toLocaleString()}
                    <span className="text-sm text-gray-500 ml-1">
                      ({((campaign.delivered / campaign.sent) * 100).toFixed(1)}%)
                    </span>
                  </td>
                  <td className="text-right p-4">
                    {((campaign.read / campaign.delivered) * 100).toFixed(1)}%
                  </td>
                  <td className="text-right p-4">
                    {((campaign.clicks / campaign.read) * 100).toFixed(1)}%
                  </td>
                  <td className="text-right p-4">{campaign.conversions}</td>
                  <td className="text-right p-4">
                    {((campaign.conversions / campaign.clicks) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default WhatsAppAnalytics;