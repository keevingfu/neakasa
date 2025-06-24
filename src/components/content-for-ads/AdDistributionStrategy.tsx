import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Calendar, Clock, Globe, Monitor, Smartphone, Tablet, Users } from 'lucide-react';

const AdDistributionStrategy: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedDevice, setSelectedDevice] = useState<string>('all');

  // Multi-platform campaign data
  const platformData = [
    { name: 'Facebook', value: 35, color: '#1877F2', reach: '2.8M', budget: '$12,500' },
    { name: 'Google', value: 30, color: '#4285F4', reach: '3.2M', budget: '$10,700' },
    { name: 'TikTok', value: 20, color: '#000000', reach: '1.5M', budget: '$7,100' },
    { name: 'Instagram', value: 15, color: '#E4405F', reach: '1.1M', budget: '$5,350' },
  ];

  // Geographic targeting heatmap data
  const geoData = [
    { name: 'United States', value: 45000 },
    { name: 'United Kingdom', value: 28000 },
    { name: 'Canada', value: 22000 },
    { name: 'Australia', value: 18000 },
    { name: 'Germany', value: 15000 },
    { name: 'France', value: 12000 },
    { name: 'Japan', value: 10000 },
    { name: 'Brazil', value: 8000 },
    { name: 'India', value: 7500 },
    { name: 'Mexico', value: 6000 },
  ];

  // Time-based scheduling data
  const scheduleData = {
    Monday: [
      8, 12, 15, 18, 22, 16, 10, 8, 12, 18, 25, 30, 28, 25, 22, 18, 20, 25, 30, 28, 22, 15, 10, 8,
    ],
    Tuesday: [
      10, 14, 18, 20, 24, 18, 12, 10, 14, 20, 28, 32, 30, 28, 24, 20, 22, 28, 32, 30, 24, 18, 12,
      10,
    ],
    Wednesday: [
      12, 16, 20, 22, 26, 20, 14, 12, 16, 22, 30, 35, 32, 30, 26, 22, 24, 30, 35, 32, 26, 20, 14,
      12,
    ],
    Thursday: [
      14, 18, 22, 24, 28, 22, 16, 14, 18, 24, 32, 38, 35, 32, 28, 24, 26, 32, 38, 35, 28, 22, 16,
      14,
    ],
    Friday: [
      16, 20, 24, 26, 30, 24, 18, 16, 20, 26, 35, 40, 38, 35, 30, 26, 28, 35, 40, 38, 30, 24, 18,
      16,
    ],
    Saturday: [
      18, 22, 26, 28, 32, 26, 20, 18, 22, 28, 38, 42, 40, 38, 32, 28, 30, 38, 42, 40, 32, 26, 20,
      18,
    ],
    Sunday: [
      20, 24, 28, 30, 35, 28, 22, 20, 24, 30, 40, 45, 42, 40, 35, 30, 32, 40, 45, 42, 35, 28, 22,
      20,
    ],
  };

  // Device targeting data
  const deviceData = [
    { device: 'Mobile', percentage: 65, conversions: 8500, avgCPC: '$0.75' },
    { device: 'Desktop', percentage: 25, conversions: 4200, avgCPC: '$1.20' },
    { device: 'Tablet', percentage: 10, conversions: 1800, avgCPC: '$0.95' },
  ];

  // Platform distribution pie chart
  const platformChartOptions = {
    title: {
      text: 'Campaign Distribution by Platform',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
    },
    legend: {
      bottom: 0,
      data: platformData.map((p) => p.name),
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
        data: platformData.map((p) => ({
          value: p.value,
          name: p.name,
          itemStyle: { color: p.color },
        })),
      },
    ],
  };

  // Geographic heatmap chart (currently unused - keeping for future implementation)
  const _geoChartOptions = {
    title: {
      text: 'Geographic Targeting Heatmap',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} impressions',
    },
    visualMap: {
      min: 0,
      max: 50000,
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true,
      inRange: {
        color: ['#e0f2fe', '#0369a1'],
      },
    },
    series: [
      {
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
          label: {
            show: true,
          },
        },
        data: geoData,
      },
    ],
  };

  // Time scheduling heatmap
  const scheduleChartOptions = {
    title: {
      text: 'Optimal Ad Scheduling (Engagement Rate %)',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      position: 'top',
      formatter: function (params: { name: string; value: [number, number, number] }) {
        return `${params.name}<br/>${params.value[1]}:00 - ${params.value[2]}%`;
      },
    },
    grid: {
      height: '70%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: [
        '12am',
        '1am',
        '2am',
        '3am',
        '4am',
        '5am',
        '6am',
        '7am',
        '8am',
        '9am',
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
        '7pm',
        '8pm',
        '9pm',
        '10pm',
        '11pm',
      ],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: Object.keys(scheduleData),
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 45,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#f3f4f6', '#fbbf24', '#f59e0b', '#dc2626'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: Object.entries(scheduleData).flatMap(([_day, hours], dayIndex) =>
          hours.map((value, hourIndex) => [hourIndex, dayIndex, value])
        ),
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // Device targeting bar chart
  const deviceChartOptions = {
    title: {
      text: 'Device Targeting Performance',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Traffic %', 'Conversions'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: deviceData.map((d) => d.device),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Percentage',
        position: 'left',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      {
        type: 'value',
        name: 'Conversions',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Traffic %',
        type: 'bar',
        data: deviceData.map((d) => d.percentage),
        itemStyle: {
          color: '#3b82f6',
        },
      },
      {
        name: 'Conversions',
        type: 'bar',
        yAxisIndex: 1,
        data: deviceData.map((d) => d.conversions),
        itemStyle: {
          color: '#10b981',
        },
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Ad Distribution Strategy</h1>
        <p className="text-gray-600">
          Optimize your ad placement and distribution across multiple channels to maximize reach and
          engagement.
        </p>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformData.map((platform) => (
          <div
            key={platform.name}
            className={`bg-white rounded-2xl shadow-sm p-6 cursor-pointer transition-all ${
              selectedPlatform === platform.name ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedPlatform(platform.name)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{platform.name}</h3>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: platform.color }}
              >
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Budget</span>
                <span className="font-semibold">{platform.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reach</span>
                <span className="font-semibold">{platform.reach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Share</span>
                <span className="font-semibold">{platform.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <ReactECharts option={platformChartOptions} style={{ height: '400px' }} />
        </div>

        {/* Device Targeting */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <ReactECharts option={deviceChartOptions} style={{ height: '400px' }} />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {deviceData.map((device) => (
              <div
                key={device.device}
                className={`text-center p-3 rounded-lg cursor-pointer transition-all ${
                  selectedDevice === device.device
                    ? 'bg-blue-50 ring-2 ring-blue-500'
                    : 'bg-gray-50'
                }`}
                onClick={() => setSelectedDevice(device.device)}
              >
                {device.device === 'Mobile' && <Smartphone className="h-6 w-6 mx-auto mb-2" />}
                {device.device === 'Desktop' && <Monitor className="h-6 w-6 mx-auto mb-2" />}
                {device.device === 'Tablet' && <Tablet className="h-6 w-6 mx-auto mb-2" />}
                <div className="font-semibold">{device.device}</div>
                <div className="text-sm text-gray-500">Avg CPC: {device.avgCPC}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Scheduling Heatmap */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <ReactECharts option={scheduleChartOptions} style={{ height: '500px' }} />
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              Peak hours highlighted in red indicate optimal ad delivery times
            </span>
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              Target regions based on audience concentration
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Configure Regions
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {geoData.map((country) => (
            <div key={country.name} className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-sm">{country.name}</div>
              <div className="text-2xl font-bold text-blue-600">
                {(country.value / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-500">impressions</div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Management Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Management Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <div className="font-semibold">Schedule Campaign</div>
            <div className="text-sm text-gray-600">Set up time-based ad delivery</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
            <Globe className="h-6 w-6 text-green-600 mb-2" />
            <div className="font-semibold">Geographic Targeting</div>
            <div className="text-sm text-gray-600">Configure location-based targeting</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <Monitor className="h-6 w-6 text-purple-600 mb-2" />
            <div className="font-semibold">Device Optimization</div>
            <div className="text-sm text-gray-600">Adjust bids by device type</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDistributionStrategy;
