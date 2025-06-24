import React, { useState, useEffect, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import { Play, BarChart3, Clock, TrendingUp, AlertCircle, RefreshCw, Activity } from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { ABTestIdea, TestExecution } from '../../types/contentTesting';

const ContentTestingExecution: React.FC = () => {
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [executions, setExecutions] = useState<TestExecution[]>([]);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<TestExecution | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [ideas, execs] = await Promise.all([
        ContentTestingService.getTestIdeas(),
        ContentTestingService.getTestExecutions(),
      ]);
      setTestIdeas(ideas.filter((idea) => idea.status === 'active'));
      setExecutions(execs);

      // Auto-select first test if none selected
      setSelectedTest((prev) => {
        if (!prev && execs.length > 0) {
          setSelectedExecution(execs[0]);
          return execs[0].testId;
        }
        return prev;
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh every 30 seconds
    const interval = autoRefresh ? setInterval(loadData, 30000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, loadData]);

  const getTestDetails = (testId: string) => {
    return testIdeas.find((test) => test.id === testId);
  };

  // Real-time performance chart
  const getPerformanceChartOption = () => {
    if (!selectedExecution) return {};

    const dates = selectedExecution.dailyData.map((d) =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    const series = selectedExecution.variants.map((variant) => ({
      name: variant.variantName,
      type: 'line',
      smooth: true,
      data: selectedExecution.dailyData.map((d) => {
        const variantData = d.variantData.find((v) => v.variantId === variant.variantId);
        return variantData?.metrics.conversion_rate || 0;
      }),
      emphasis: {
        focus: 'series',
      },
    }));

    return {
      title: {
        text: 'Conversion Rate Trend',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%',
      },
      legend: {
        bottom: '5%',
        data: selectedExecution.variants.map((v) => v.variantName),
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
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value',
        name: 'Conversion Rate (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series,
    };
  };

  // KPI comparison radar chart
  const getKPIRadarOption = () => {
    if (!selectedExecution || !selectedTest) return {};

    const testDetails = getTestDetails(selectedTest);
    if (!testDetails) return {};

    const indicators = testDetails.kpis.map((kpi) => ({
      name: kpi.type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      max: kpi.targetValue * 1.5,
    }));

    const series = selectedExecution.variants.map((variant) => ({
      name: variant.variantName,
      value: testDetails.kpis.map((kpi) => variant.metrics[kpi.type] || 0),
    }));

    return {
      title: {
        text: 'KPI Performance Comparison',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {},
      legend: {
        bottom: '5%',
        data: selectedExecution.variants.map((v) => v.variantName),
      },
      radar: {
        indicator: indicators,
        shape: 'polygon',
        radius: '70%',
      },
      series: [
        {
          type: 'radar',
          data: series,
          areaStyle: {
            opacity: 0.1,
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
  };

  // Sample size progress
  const getSampleSizeProgress = (execution: TestExecution) => {
    const targetSampleSize = 50000; // Example target
    return Math.min((execution.sampleSize / targetSampleSize) * 100, 100);
  };

  // Calculate days running
  const getDaysRunning = () => {
    if (!selectedExecution) return 0;
    const start = new Date(selectedExecution.startDate);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Content Testing Execution</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </button>
        </div>
      </div>

      {/* Test Selector */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Active Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {executions.map((execution) => {
            const test = getTestDetails(execution.testId);
            if (!test) return null;

            const isSelected = selectedTest === execution.testId;
            const leadingVariant = execution.variants.reduce((prev, current) =>
              current.conversionRate > prev.conversionRate ? current : prev
            );

            return (
              <div
                key={execution.id}
                onClick={() => {
                  setSelectedTest(execution.testId);
                  setSelectedExecution(execution);
                }}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg flex-1">{test.name}</h3>
                  <Play className="w-5 h-5 text-green-500" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leading:</span>
                    <span className="font-medium">{leadingVariant.variantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uplift:</span>
                    <span
                      className={`font-medium ${leadingVariant.uplift && leadingVariant.uplift > 0 ? 'text-green-600' : 'text-gray-700'}`}
                    >
                      {leadingVariant.uplift ? `+${leadingVariant.uplift.toFixed(1)}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sample:</span>
                    <span>{formatNumber(execution.sampleSize)}</span>
                  </div>
                </div>

                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getSampleSizeProgress(execution)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedExecution && (
        <>
          {/* Test Progress Dashboard */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Test Progress Dashboard
            </h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Days Running</span>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{getDaysRunning()}</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Impressions</span>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  {formatNumber(selectedExecution.sampleSize)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Confidence Level</span>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  {selectedExecution.variants[1]?.confidence?.toFixed(1) || '0'}%
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Status</span>
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-lg font-bold text-green-600">Active</div>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <ReactECharts option={getPerformanceChartOption()} style={{ height: 300 }} />
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <ReactECharts option={getKPIRadarOption()} style={{ height: 300 }} />
              </div>
            </div>
          </div>

          {/* Variant Performance Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Variant Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Variant</th>
                    <th className="text-right py-3 px-4">Impressions</th>
                    <th className="text-right py-3 px-4">Conversions</th>
                    <th className="text-right py-3 px-4">Conv. Rate</th>
                    <th className="text-right py-3 px-4">CTR</th>
                    <th className="text-right py-3 px-4">Engagement</th>
                    <th className="text-right py-3 px-4">Uplift</th>
                    <th className="text-right py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExecution.variants.map((variant, index) => (
                    <tr key={variant.variantId} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-gray-400' : 'bg-blue-600'
                            }`}
                          />
                          <span className="font-medium">{variant.variantName}</span>
                          {index === 0 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Control</span>
                          )}
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">{formatNumber(variant.impressions)}</td>
                      <td className="text-right py-3 px-4">{formatNumber(variant.conversions)}</td>
                      <td className="text-right py-3 px-4 font-medium">
                        {variant.conversionRate.toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {variant.metrics.click_through_rate?.toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {variant.metrics.engagement_rate?.toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4">
                        {variant.uplift ? (
                          <span
                            className={`font-medium ${
                              variant.uplift > 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {variant.uplift > 0 ? '+' : ''}
                            {variant.uplift.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="text-right py-3 px-4">
                        {variant.confidence && variant.confidence >= 95 ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Significant
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            Gathering data
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentTestingExecution;
