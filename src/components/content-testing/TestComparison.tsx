import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { ArrowUp, ArrowDown, Minus, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { TestExecution, ABTestIdea, KPIType } from '../../types/contentTesting';

interface ComparisonMetric {
  name: string;
  controlValue: number;
  variantValue: number;
  uplift: number;
  unit: string;
  significant: boolean;
}

const TestComparison: React.FC = () => {
  const [executions, setExecutions] = useState<TestExecution[]>([]);
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState<'single' | 'multiple'>('single');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [execs, ideas] = await Promise.all([
        ContentTestingService.getTestExecutions(),
        ContentTestingService.getTestIdeas(),
      ]);
      setExecutions(execs);
      setTestIdeas(ideas);

      // Auto-select first test
      if (execs.length > 0) {
        setSelectedTests([execs[0].id]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getComparisonMetrics = (execution: TestExecution): ComparisonMetric[] => {
    const control = execution.variants[0];
    const variant = execution.variants[1];

    if (!control || !variant) return [];

    const metrics: ComparisonMetric[] = [];
    const kpiMap: Record<KPIType, { name: string; unit: string }> = {
      click_through_rate: { name: 'Click-Through Rate', unit: '%' },
      engagement_rate: { name: 'Engagement Rate', unit: '%' },
      view_duration: { name: 'View Duration', unit: 's' },
      conversion_rate: { name: 'Conversion Rate', unit: '%' },
      shares: { name: 'Share Rate', unit: '%' },
      saves: { name: 'Save Rate', unit: '%' },
      comments: { name: 'Comment Rate', unit: '%' },
      likes: { name: 'Like Rate', unit: '%' },
    };

    Object.entries(control.metrics).forEach(([key, value]) => {
      const kpiType = key as KPIType;
      const kpiInfo = kpiMap[kpiType];
      if (!kpiInfo) return;

      const variantValue = variant.metrics[kpiType] || 0;
      const uplift = value > 0 ? ((variantValue - value) / value) * 100 : 0;

      metrics.push({
        name: kpiInfo.name,
        controlValue: value,
        variantValue: variantValue,
        uplift: uplift,
        unit: kpiInfo.unit,
        significant: Math.abs(uplift) > 10, // Simplified significance check
      });
    });

    return metrics;
  };

  // Side-by-side comparison chart
  const getSideBySideChartOption = () => {
    if (selectedTests.length === 0) return {};

    const execution = executions.find((e) => e.id === selectedTests[0]);
    if (!execution) return {};

    const metrics = getComparisonMetrics(execution);

    return {
      title: {
        text: 'Variant Performance Comparison',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: Array<{ dataIndex: number }>) => {
          const metric = metrics[params[0].dataIndex];
          return `${metric.name}<br/>
            Control: ${metric.controlValue.toFixed(2)}${metric.unit}<br/>
            Variant: ${metric.variantValue.toFixed(2)}${metric.unit}<br/>
            Uplift: ${metric.uplift > 0 ? '+' : ''}${metric.uplift.toFixed(1)}%`;
        },
      },
      legend: {
        data: ['Control', 'Variant'],
        bottom: '5%',
      },
      xAxis: {
        type: 'category',
        data: metrics.map((m) => m.name),
        axisLabel: {
          interval: 0,
          rotate: 45,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Value',
        axisLabel: {
          formatter: (value: number) => value.toFixed(1),
        },
      },
      series: [
        {
          name: 'Control',
          type: 'bar',
          data: metrics.map((m) => m.controlValue),
          itemStyle: { color: '#6b7280' },
        },
        {
          name: 'Variant',
          type: 'bar',
          data: metrics.map((m) => m.variantValue),
          itemStyle: { color: '#3b82f6' },
        },
      ],
    };
  };

  // Uplift waterfall chart
  const getUpliftWaterfallOption = () => {
    if (selectedTests.length === 0) return {};

    const execution = executions.find((e) => e.id === selectedTests[0]);
    if (!execution) return {};

    const metrics = getComparisonMetrics(execution)
      .filter((m) => m.significant)
      .sort((a, b) => Math.abs(b.uplift) - Math.abs(a.uplift));

    const categories = ['Baseline', ...metrics.map((m) => m.name), 'Total Impact'];
    const values = [100]; // Start at 100%

    let cumulative = 100;
    metrics.forEach((m) => {
      cumulative += m.uplift;
      values.push(cumulative);
    });
    values.push(cumulative); // Final total

    return {
      title: {
        text: 'Cumulative Impact Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: Array<{ dataIndex: number }>) => {
          const index = params[0].dataIndex;
          if (index === 0) return 'Baseline: 100%';
          if (index === categories.length - 1) return `Total Impact: ${values[index].toFixed(1)}%`;

          const metric = metrics[index - 1];
          return `${metric.name}<br/>Impact: ${metric.uplift > 0 ? '+' : ''}${metric.uplift.toFixed(1)}%<br/>Cumulative: ${values[index].toFixed(1)}%`;
        },
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          interval: 0,
          rotate: 45,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Cumulative Impact (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          type: 'line',
          data: values,
          step: 'middle',
          itemStyle: { color: '#10b981' },
          areaStyle: {
            color: 'rgba(16, 185, 129, 0.1)',
          },
          markLine: {
            data: [
              { type: 'average', name: 'Average' },
              { yAxis: 100, name: 'Baseline' },
            ],
          },
        },
      ],
    };
  };

  // Multi-test comparison radar
  const getMultiTestRadarOption = () => {
    if (selectedTests.length < 2) return {};

    const selectedExecutions = executions.filter((e) => selectedTests.includes(e.id));
    const indicators = ['CTR', 'Engagement', 'Conversion', 'Shares', 'View Duration'];

    const series = selectedExecutions.map((execution) => {
      const test = testIdeas.find((t) => t.id === execution.testId);
      const variant = execution.variants[1] || execution.variants[0];

      return {
        name: test?.name || 'Unknown Test',
        value: [
          variant.metrics.click_through_rate || 0,
          variant.metrics.engagement_rate || 0,
          variant.metrics.conversion_rate || 0,
          variant.metrics.shares || 0,
          variant.metrics.view_duration ? variant.metrics.view_duration / 10 : 0, // Normalize
        ],
      };
    });

    return {
      title: {
        text: 'Multi-Test Performance Comparison',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {},
      legend: {
        bottom: '5%',
        data: series.map((s) => s.name),
      },
      radar: {
        indicator: indicators.map((name) => ({ name, max: 20 })),
        radius: '70%',
      },
      series: [
        {
          type: 'radar',
          data: series.map((s) => ({
            ...s,
            areaStyle: { opacity: 0.1 },
            lineStyle: { width: 2 },
          })),
        },
      ],
    };
  };

  const formatMetricValue = (value: number, unit: string): string => {
    if (unit === 's') return `${value.toFixed(1)}s`;
    if (unit === '%') return `${value.toFixed(2)}%`;
    return value.toFixed(2);
  };

  const getMetricIcon = (uplift: number) => {
    if (uplift > 5) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (uplift < -5) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
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
        <h1 className="text-3xl font-bold text-gray-800">Test Comparison Analysis</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setComparisonMode('single')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              comparisonMode === 'single'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Single Test
          </button>
          <button
            onClick={() => setComparisonMode('multiple')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              comparisonMode === 'multiple'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Compare Tests
          </button>
        </div>
      </div>

      {/* Test Selection */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Select Tests to Compare</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {executions.map((execution) => {
            const test = testIdeas.find((t) => t.id === execution.testId);
            const isSelected = selectedTests.includes(execution.id);

            return (
              <label
                key={execution.id}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    if (comparisonMode === 'single') {
                      setSelectedTests(e.target.checked ? [execution.id] : []);
                    } else {
                      if (e.target.checked) {
                        setSelectedTests([...selectedTests, execution.id]);
                      } else {
                        setSelectedTests(selectedTests.filter((id) => id !== execution.id));
                      }
                    }
                  }}
                  className="sr-only"
                />
                <h3 className="font-semibold mb-2">{test?.name || 'Unknown Test'}</h3>
                <div className="text-sm text-gray-600">
                  <div>Started: {new Date(execution.startDate).toLocaleDateString()}</div>
                  <div>Sample Size: {execution.sampleSize.toLocaleString()}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Comparison Results */}
      {selectedTests.length > 0 && (
        <>
          {comparisonMode === 'single' && selectedTests.length === 1 && (
            <>
              {/* Detailed Metrics Table */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">Detailed Metrics Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">Metric</th>
                        <th className="text-right py-3 px-4">Control</th>
                        <th className="text-right py-3 px-4">Variant</th>
                        <th className="text-right py-3 px-4">Uplift</th>
                        <th className="text-center py-3 px-4">Significance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const execution = executions.find((e) => e.id === selectedTests[0]);
                        if (!execution) return null;

                        return getComparisonMetrics(execution).map((metric) => (
                          <tr key={metric.name} className="border-b border-gray-100">
                            <td className="py-3 px-4 font-medium">{metric.name}</td>
                            <td className="text-right py-3 px-4">
                              {formatMetricValue(metric.controlValue, metric.unit)}
                            </td>
                            <td className="text-right py-3 px-4">
                              {formatMetricValue(metric.variantValue, metric.unit)}
                            </td>
                            <td className="text-right py-3 px-4">
                              <div className="flex items-center justify-end gap-2">
                                {getMetricIcon(metric.uplift)}
                                <span
                                  className={`font-medium ${
                                    metric.uplift > 0
                                      ? 'text-green-600'
                                      : metric.uplift < 0
                                        ? 'text-red-600'
                                        : 'text-gray-600'
                                  }`}
                                >
                                  {metric.uplift > 0 ? '+' : ''}
                                  {metric.uplift.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4">
                              {metric.significant ? (
                                <span className="inline-flex items-center gap-1 text-green-600">
                                  <TrendingUp className="w-4 h-4" />
                                  <span className="text-sm">Significant</span>
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">Not significant</span>
                              )}
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <ReactECharts option={getSideBySideChartOption()} style={{ height: 400 }} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <ReactECharts option={getUpliftWaterfallOption()} style={{ height: 400 }} />
                </div>
              </div>

              {/* Business Impact */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Projected Business Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-600">Monthly Reach</span>
                    </div>
                    <div className="text-2xl font-bold">1.2M</div>
                    <div className="text-sm text-gray-500">users impacted</div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Conversion Uplift</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">+25%</div>
                    <div className="text-sm text-gray-500">increase expected</div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-600">Revenue Impact</span>
                    </div>
                    <div className="text-2xl font-bold">$124K</div>
                    <div className="text-sm text-gray-500">monthly increase</div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-600">Time to ROI</span>
                    </div>
                    <div className="text-2xl font-bold">2.3</div>
                    <div className="text-sm text-gray-500">months</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {comparisonMode === 'multiple' && selectedTests.length >= 2 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <ReactECharts option={getMultiTestRadarOption()} style={{ height: 500 }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestComparison;
