import React, { useState } from 'react';
import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {
  Users,
  Eye,
  MessageCircle,
  TrendingUp,
  Award,
  Briefcase,
  Globe,
} from 'lucide-react';
import { getLinkedInMetrics } from '../../services/privateChannelService';
import type { EChartsFormatterParams } from '../../types/charts';

const LinkedInAnalytics: React.FC = () => {
  const [metrics] = useState(getLinkedInMetrics());
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Post performance comparison
  const postPerformanceOption = {
    title: {
      text: 'Post Performance Analysis',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: EChartsFormatterParams | EChartsFormatterParams[]) => {
        const data = Array.isArray(params) ? params[0] : params;
        const post = metrics.postPerformance[data.dataIndex];
        return post.post + '<br/>' +
                'Type: ' + post.type + '<br/>' +
                'Impressions: ' + post.impressions.toLocaleString() + '<br/>' +
                'Engagements: ' + post.engagements.toLocaleString() + '<br/>' +
                'Clicks: ' + post.clicks + '<br/>' +
                'Shares: ' + post.shares + '<br/>' +
                'Comments: ' + post.comments;
      },
    },
    legend: {
      data: ['Impressions', 'Engagements', 'Engagement Rate'],
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
      data: metrics.postPerformance.map(p => p.post.split(' ').slice(0, 3).join(' ')),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left',
      },
      {
        type: 'value',
        name: 'Engagement Rate (%)',
        position: 'right',
        max: 10,
      },
    ],
    series: [
      {
        name: 'Impressions',
        type: 'bar',
        data: metrics.postPerformance.map(p => p.impressions),
        itemStyle: { color: '#3B82F6' },
      },
      {
        name: 'Engagements',
        type: 'bar',
        data: metrics.postPerformance.map(p => p.engagements),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'Engagement Rate',
        type: 'line',
        yAxisIndex: 1,
        data: metrics.postPerformance.map(p => ((p.engagements / p.impressions) * 100).toFixed(2)),
        itemStyle: { color: '#F59E0B' },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Audience demographics
  const audienceIndustryOption = {
    title: {
      text: 'Audience by Industry',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
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
          formatter: '{b}\n{c}%',
        },
        data: metrics.audienceDemographics
          .find(d => d.category === 'Industry')
          ?.data.map((item, index) => ({
            name: item.name,
            value: item.percentage,
            itemStyle: {
              color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index],
            },
          })),
      },
    ],
  };

  // Seniority distribution
  const seniorityDistributionOption = {
    title: {
      text: 'Audience by Seniority Level',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Percentage (%)',
    },
    yAxis: {
      type: 'category',
      data: metrics.audienceDemographics
        .find(d => d.category === 'Seniority')
        ?.data.map(item => item.name),
    },
    series: [
      {
        type: 'bar',
        data: metrics.audienceDemographics
          .find(d => d.category === 'Seniority')
          ?.data.map((item, index) => ({
            value: item.percentage,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#8B5CF6' },
                { offset: 1, color: '#6366F1' },
              ]),
            },
          })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
        },
      },
    ],
  };

  // Competitor comparison radar
  const competitorRadarOption = {
    title: {
      text: 'Competitor Comparison',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: metrics.competitorComparison.map(c => c.company),
      bottom: 0,
    },
    radar: {
      shape: 'polygon',
      indicator: [
        { name: 'Followers (K)', max: 50 },
        { name: 'Engagement Rate (%)', max: 5 },
        { name: 'Share of Voice (%)', max: 20 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: metrics.competitorComparison.map((company, index) => ({
          name: company.company,
          value: [
            company.followers / 1000,
            company.engagementRate,
            company.shareOfVoice,
          ],
          lineStyle: {
            width: 2,
            color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index],
          },
          areaStyle: {
            opacity: 0.2,
            color: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][index],
          },
        })),
      },
    ],
  };

  // Monthly trend analysis
  const monthlyTrendData = [
    { month: 'Jan', followers: 28432, impressions: 1876543, engagements: 78234 },
    { month: 'Feb', followers: 29876, impressions: 1923456, engagements: 82345 },
    { month: 'Mar', followers: 31234, impressions: 2045678, engagements: 89234 },
    { month: 'Apr', followers: 32567, impressions: 2187654, engagements: 94567 },
    { month: 'May', followers: 33876, impressions: 2298765, engagements: 98765 },
    { month: 'Jun', followers: 34567, impressions: 2345678, engagements: 102345 },
  ];

  const monthlyTrendOption = {
    title: {
      text: 'Monthly Growth Trends',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['Followers', 'Impressions', 'Engagements'],
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
      data: monthlyTrendData.map(d => d.month),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Followers',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `${(value / 1000).toFixed(0)}K`,
        },
      },
      {
        type: 'value',
        name: 'Impressions/Engagements',
        position: 'right',
        axisLabel: {
          formatter: (value: number) => `${(value / 1000).toFixed(0)}K`,
        },
      },
    ],
    series: [
      {
        name: 'Followers',
        type: 'bar',
        data: monthlyTrendData.map(d => d.followers),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#1E40AF' },
          ]),
        },
      },
      {
        name: 'Impressions',
        type: 'line',
        yAxisIndex: 1,
        data: monthlyTrendData.map(d => d.impressions),
        itemStyle: { color: '#10B981' },
        lineStyle: { width: 3 },
      },
      {
        name: 'Engagements',
        type: 'line',
        yAxisIndex: 1,
        data: monthlyTrendData.map(d => d.engagements),
        itemStyle: { color: '#F59E0B' },
        lineStyle: { width: 3 },
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">LinkedIn B2B Marketing Analytics</h2>
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600">+{metrics.overview.followerGrowth}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Followers</h3>
          <p className="text-2xl font-bold">{(metrics.overview.followers / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600">+23.4%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Impressions</h3>
          <p className="text-2xl font-bold">{(metrics.overview.impressions / 1000000).toFixed(1)}M</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600">+0.3%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Engagement Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.engagementRate}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-green-600">+18.5%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Website Clicks</h3>
          <p className="text-2xl font-bold">{(metrics.overview.websiteClicks / 1000).toFixed(1)}K</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-green-600">+1.2%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Share of Voice</h3>
          <p className="text-2xl font-bold">{metrics.overview.shareOfVoice}%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-teal-600" />
            <span className="text-sm text-green-600">+{metrics.overview.followerGrowth}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Growth Rate</h3>
          <p className="text-2xl font-bold">{metrics.overview.followerGrowth}%</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={postPerformanceOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={audienceIndustryOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ReactECharts option={seniorityDistributionOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <ReactECharts option={competitorRadarOption} style={{ height: '400px' }} />
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card className="p-6">
        <ReactECharts option={monthlyTrendOption} style={{ height: '400px' }} />
      </Card>

      {/* Post Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Post Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Post Title</th>
                <th className="text-center p-4">Type</th>
                <th className="text-right p-4">Impressions</th>
                <th className="text-right p-4">Engagements</th>
                <th className="text-right p-4">Engagement Rate</th>
                <th className="text-right p-4">Clicks</th>
                <th className="text-right p-4">Shares</th>
                <th className="text-right p-4">Comments</th>
              </tr>
            </thead>
            <tbody>
              {metrics.postPerformance.map((post, index) => {
                const engagementRate = ((post.engagements / post.impressions) * 100).toFixed(2);
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{post.post}</td>
                    <td className="text-center p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.type === 'Video' ? 'bg-blue-100 text-blue-700' :
                        post.type === 'Article' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {post.type}
                      </span>
                    </td>
                    <td className="text-right p-4">{post.impressions.toLocaleString()}</td>
                    <td className="text-right p-4">{post.engagements.toLocaleString()}</td>
                    <td className="text-right p-4">
                      <span className={`font-semibold ${Number(engagementRate) > 5 ? 'text-green-600' : 'text-gray-600'}`}>
                        {engagementRate}%
                      </span>
                    </td>
                    <td className="text-right p-4">{post.clicks}</td>
                    <td className="text-right p-4">{post.shares}</td>
                    <td className="text-right p-4">{post.comments}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Competitor Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.competitorComparison.map((company, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">{company.company}</h4>
              {company.company === 'Neakasa' && (
                <Briefcase className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Followers:</span>
                <span className="font-medium">{(company.followers / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-medium">{company.engagementRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Share of Voice:</span>
                <span className="font-medium">{company.shareOfVoice}%</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">Performance Index</div>
                <div className="text-lg font-semibold">
                  {((company.engagementRate * company.shareOfVoice) / 10).toFixed(1)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkedInAnalytics;
