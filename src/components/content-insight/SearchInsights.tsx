import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Search, TrendingUp, DollarSign, Video, Target } from 'lucide-react';

interface KeywordData {
  keyword: string;
  volume: number;
  cpc: number;
  competition: number;
  trend: number[];
  intent: 'informational' | 'commercial' | 'transactional';
}

interface CompetitorData {
  brand: string;
  searchVolume: number;
  marketShare: number;
  avgCPC: number;
  topKeywords: string[];
}

const SearchInsights: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('12m');

  // Mock data for smart cat litter box market
  const keywordData: KeywordData[] = [
    {
      keyword: 'self cleaning litter box',
      volume: 74000,
      cpc: 2.45,
      competition: 0.78,
      trend: [68000, 69500, 71000, 72500, 74000, 75500, 77000, 78500, 80000, 74000, 73000, 74000],
      intent: 'commercial',
    },
    {
      keyword: 'automatic cat litter box',
      volume: 49500,
      cpc: 2.38,
      competition: 0.82,
      trend: [45000, 46000, 47500, 48000, 49500, 51000, 52500, 54000, 52000, 50000, 49000, 49500],
      intent: 'commercial',
    },
    {
      keyword: 'smart litter box',
      volume: 33100,
      cpc: 2.65,
      competition: 0.75,
      trend: [28000, 29000, 30000, 31000, 32000, 33100, 34500, 36000, 35000, 34000, 33000, 33100],
      intent: 'commercial',
    },
    {
      keyword: 'Neakasa M1',
      volume: 8100,
      cpc: 1.85,
      competition: 0.45,
      trend: [5500, 6000, 6500, 7000, 7500, 8100, 8800, 9500, 9000, 8500, 8200, 8100],
      intent: 'transactional',
    },
    {
      keyword: 'Litter Robot alternative',
      volume: 14800,
      cpc: 2.92,
      competition: 0.68,
      trend: [12000, 12500, 13000, 13500, 14000, 14800, 15500, 16200, 15800, 15200, 14900, 14800],
      intent: 'commercial',
    },
    {
      keyword: 'best automatic litter box 2024',
      volume: 22300,
      cpc: 3.15,
      competition: 0.85,
      trend: [18000, 19000, 20000, 21000, 22300, 23500, 24800, 26000, 25000, 23800, 22800, 22300],
      intent: 'commercial',
    },
  ];

  const competitorData: CompetitorData[] = [
    {
      brand: 'Litter-Robot',
      searchVolume: 165000,
      marketShare: 42.5,
      avgCPC: 2.78,
      topKeywords: ['litter robot 4', 'litter robot reviews', 'litter robot connect'],
    },
    {
      brand: 'Neakasa',
      searchVolume: 45000,
      marketShare: 11.6,
      avgCPC: 2.15,
      topKeywords: ['neakasa m1', 'neakasa m1 review', 'neakasa litter box'],
    },
    {
      brand: 'PetSafe',
      searchVolume: 78000,
      marketShare: 20.1,
      avgCPC: 2.42,
      topKeywords: ['petsafe scoopfree', 'petsafe litter box', 'scoopfree ultra'],
    },
    {
      brand: 'CatGenie',
      searchVolume: 98000,
      marketShare: 25.3,
      avgCPC: 2.95,
      topKeywords: ['cat genie', 'cat genie ai', 'self washing litter box'],
    },
  ];

  // Geographic distribution data
  const geographicData = [
    { region: 'North America', percentage: 36.8, value: 328 },
    { region: 'Europe', percentage: 28.5, value: 254 },
    { region: 'Asia Pacific', percentage: 22.3, value: 199 },
    { region: 'Latin America', percentage: 7.2, value: 64 },
    { region: 'Middle East & Africa', percentage: 5.2, value: 46 },
  ];

  // Seasonal trends data
  const seasonalData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    searchVolume: [
      285000, 278000, 295000, 310000, 325000, 318000, 315000, 322000, 335000, 348000, 385000,
      412000,
    ],
    adoptionRate: [12, 11, 14, 18, 22, 20, 19, 21, 23, 25, 28, 32],
  };

  // Purchase intent keywords
  const purchaseIntentKeywords = [
    { keyword: 'buy automatic litter box', volume: 12500, intent: 95 },
    { keyword: 'litter robot discount code', volume: 8900, intent: 92 },
    { keyword: 'neakasa m1 where to buy', volume: 3200, intent: 90 },
    { keyword: 'automatic litter box sale', volume: 6700, intent: 88 },
    { keyword: 'best price self cleaning litter box', volume: 5400, intent: 85 },
    { keyword: 'cat litter box black friday', volume: 18500, intent: 93 },
  ];

  // Video content search trends
  const videoSearchTrends = [
    { keyword: 'automatic litter box review', platform: 'YouTube', volume: 45000, growth: 23 },
    { keyword: 'litter robot vs neakasa', platform: 'YouTube', volume: 12000, growth: 45 },
    { keyword: 'smart litter box setup', platform: 'YouTube', volume: 28000, growth: 18 },
    { keyword: 'cat litter box comparison', platform: 'TikTok', volume: 34000, growth: 67 },
    { keyword: 'self cleaning litter box test', platform: 'Instagram', volume: 22000, growth: 52 },
  ];

  // Keyword trends chart options
  const keywordTrendsOptions = {
    title: {
      text: 'Keyword Search Volume Trends',
      left: 20,
      top: 20,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: keywordData.map((k) => k.keyword),
      bottom: 10,
      type: 'scroll',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: seasonalData.months,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: 'Search Volume',
      axisLabel: {
        formatter: (value: number) => `${value / 1000}K`,
      },
    },
    series: keywordData.map((keyword) => ({
      name: keyword.keyword,
      type: 'line',
      smooth: true,
      data: keyword.trend,
      emphasis: {
        focus: 'series',
      },
    })),
  };

  // Competitor comparison chart
  const competitorComparisonOptions = {
    title: {
      text: 'Competitor Search Volume & Market Share',
      left: 20,
      top: 20,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: { name: string; seriesName: string; value: number }[]) => {
        let tooltip = params[0].name + '<br/>';
        params.forEach((param) => {
          tooltip += `${param.seriesName}: ${
            param.seriesName.includes('Volume') ? param.value.toLocaleString() : param.value + '%'
          }<br/>`;
        });
        return tooltip;
      },
    },
    legend: {
      data: ['Search Volume', 'Market Share'],
      bottom: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: competitorData.map((c) => c.brand),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Search Volume',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `${value / 1000}K`,
        },
      },
      {
        type: 'value',
        name: 'Market Share (%)',
        position: 'right',
        axisLabel: {
          formatter: '{value}%',
        },
      },
    ],
    series: [
      {
        name: 'Search Volume',
        type: 'bar',
        data: competitorData.map((c) => c.searchVolume),
        itemStyle: {
          color: '#3B82F6',
        },
      },
      {
        name: 'Market Share',
        type: 'line',
        yAxisIndex: 1,
        data: competitorData.map((c) => c.marketShare),
        itemStyle: {
          color: '#10B981',
        },
      },
    ],
  };

  // Geographic distribution chart
  const geographicDistributionOptions = {
    title: {
      text: 'Geographic Search Distribution',
      subtext: '$892M Market Size Distribution',
      left: 20,
      top: 20,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}M ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
    },
    series: [
      {
        name: 'Market Value',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: geographicData.map((d) => ({
          value: d.value,
          name: d.region,
        })),
      },
    ],
  };

  // Seasonal trends chart
  const seasonalTrendsOptions = {
    title: {
      text: 'Seasonal Search Trends & Pet Adoption',
      left: 20,
      top: 20,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['Search Volume', 'Pet Adoption Rate'],
      bottom: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: seasonalData.months,
      axisPointer: {
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Search Volume',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `${value / 1000}K`,
        },
      },
      {
        type: 'value',
        name: 'Adoption Rate (%)',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Search Volume',
        type: 'bar',
        data: seasonalData.searchVolume,
        itemStyle: {
          color: '#8B5CF6',
        },
      },
      {
        name: 'Pet Adoption Rate',
        type: 'line',
        yAxisIndex: 1,
        data: seasonalData.adoptionRate,
        smooth: true,
        itemStyle: {
          color: '#F59E0B',
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Search Insights - Smart Cat Litter Box Market
        </h1>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-2xl"
          >
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Market Size</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold">$892M</p>
          <p className="text-sm text-green-600 mt-1">+28% YoY Growth</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Monthly Searches</h3>
            <Search className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">1.2M</p>
          <p className="text-sm text-blue-600 mt-1">+35% vs last year</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Avg CPC</h3>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">$2.54</p>
          <p className="text-sm text-purple-600 mt-1">+12% increase</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Video Searches</h3>
            <Video className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold">141K</p>
          <p className="text-sm text-red-600 mt-1">+67% growth</p>
        </div>
      </div>

      {/* Keyword Trends Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={keywordTrendsOptions} style={{ height: '400px' }} />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Top Keywords by Volume
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Keyword</th>
                  <th className="text-right py-3 px-2">Volume</th>
                  <th className="text-right py-3 px-2">CPC</th>
                  <th className="text-right py-3 px-2">Competition</th>
                </tr>
              </thead>
              <tbody>
                {keywordData.map((keyword, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{keyword.keyword}</td>
                    <td className="text-right py-3 px-2">{keyword.volume.toLocaleString()}</td>
                    <td className="text-right py-3 px-2">${keyword.cpc}</td>
                    <td className="text-right py-3 px-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          keyword.competition > 0.7
                            ? 'bg-red-100 text-red-700'
                            : keyword.competition > 0.4
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {(keyword.competition * 100).toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Intent Keywords */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            High Purchase Intent Keywords
          </h2>
          <div className="space-y-3">
            {purchaseIntentKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl"
              >
                <div>
                  <p className="font-medium">{keyword.keyword}</p>
                  <p className="text-sm text-gray-600">
                    {keyword.volume.toLocaleString()} searches/mo
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{keyword.intent}%</div>
                  <div className="text-xs text-gray-500">intent score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Comparison Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <ReactECharts option={competitorComparisonOptions} style={{ height: '400px' }} />
      </div>

      {/* Geographic and Seasonal Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={geographicDistributionOptions} style={{ height: '400px' }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={seasonalTrendsOptions} style={{ height: '400px' }} />
        </div>
      </div>

      {/* Video Content Trends */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="w-5 h-5" />
          Video Content Search Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoSearchTrends.map((trend, index) => (
            <div key={index} className="border p-4 rounded-2xl hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-800">{trend.keyword}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    trend.platform === 'YouTube'
                      ? 'bg-red-100 text-red-700'
                      : trend.platform === 'TikTok'
                        ? 'bg-black text-white'
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                  }`}
                >
                  {trend.platform}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{(trend.volume / 1000).toFixed(1)}K</p>
              <p className="text-sm text-green-600">↑ {trend.growth}% growth</p>
            </div>
          ))}
        </div>
      </div>

      {/* CPC Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          CPC Analysis by Keyword Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-2xl">
            <h3 className="font-medium text-blue-900 mb-2">Brand Keywords</h3>
            <p className="text-2xl font-bold text-blue-600">$1.85 - $2.15</p>
            <p className="text-sm text-blue-700 mt-1">Lowest competition</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl">
            <h3 className="font-medium text-purple-900 mb-2">Generic Keywords</h3>
            <p className="text-2xl font-bold text-purple-600">$2.38 - $2.65</p>
            <p className="text-sm text-purple-700 mt-1">Medium competition</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl">
            <h3 className="font-medium text-orange-900 mb-2">Comparison Keywords</h3>
            <p className="text-2xl font-bold text-orange-600">$2.92 - $3.15</p>
            <p className="text-sm text-orange-700 mt-1">Highest competition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInsights;
