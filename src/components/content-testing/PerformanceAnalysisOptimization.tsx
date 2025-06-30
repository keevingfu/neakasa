import React, { useState, useEffect, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import { Calculator, TrendingUp, Award, BarChart3, Info, CheckCircle, XCircle } from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { TestExecution, TestAnalysis, ABTestIdea } from '../../types/contentTesting';
import SelfKOCPerformanceAnalysis from './SelfKOCPerformanceAnalysis';

const ContentPerformanceOptimization: React.FC = () => {
  const [executions, setExecutions] = useState<TestExecution[]>([]);
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [selectedExecution, setSelectedExecution] = useState<TestExecution | null>(null);
  const [analysis, setAnalysis] = useState<TestAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [execs, ideas] = await Promise.all([
        ContentTestingService.getTestExecutions(),
        ContentTestingService.getTestIdeas(),
      ]);
      setExecutions(execs);
      setTestIdeas(ideas);

      if (execs.length > 0) {
        setSelectedExecution(execs[0]);
        // Analyze test will be called in separate useEffect when selectedExecution changes
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const analyzeTest = async (execution: TestExecution) => {
    // Calculate statistical significance
    const control = execution.variants.find((v, idx) => idx === 0);
    const variant = execution.variants.find((v, idx) => idx === 1);

    if (control && variant) {
      const significance = await ContentTestingService.calculateSignificance(control, variant);

      const analysis: TestAnalysis = {
        testId: execution.testId,
        executionId: execution.id,
        winner:
          significance.isSignificant && variant.uplift && variant.uplift > 0
            ? variant.variantId
            : undefined,
        confidence: significance.confidence,
        significanceReached: significance.isSignificant,
        estimatedRemainingDays: significance.recommendedSampleSize
          ? Math.ceil((significance.recommendedSampleSize - execution.sampleSize) / 2000)
          : undefined,
        insights: generateInsights(execution),
        recommendations: generateRecommendations(execution, significance.isSignificant),
        nextSteps: generateNextSteps(execution, significance.isSignificant),
      };

      setAnalysis(analysis);
    }
  };

  const generateInsights = (execution: TestExecution): TestAnalysis['insights'] => {
    const insights: TestAnalysis['insights'] = [];
    const control = execution.variants[0];
    const variant = execution.variants[1];

    if (variant.uplift && variant.uplift > 20) {
      insights.push({
        type: 'positive',
        title: 'Strong Performance Improvement',
        description: `The variant is showing a ${variant.uplift.toFixed(1)}% improvement over the control`,
        impact: 'high',
      });
    }

    if (variant.metrics.engagement_rate > control.metrics.engagement_rate * 1.15) {
      insights.push({
        type: 'positive',
        title: 'Higher Engagement Detected',
        description: 'Users are significantly more engaged with the variant content',
        metric: 'engagement_rate',
        impact: 'medium',
      });
    }

    if (variant.metrics.view_duration > control.metrics.view_duration) {
      insights.push({
        type: 'positive',
        title: 'Improved View Duration',
        description: `Average view time increased by ${(((variant.metrics.view_duration - control.metrics.view_duration) / control.metrics.view_duration) * 100).toFixed(1)}%`,
        metric: 'view_duration',
        impact: 'medium',
      });
    }

    return insights;
  };

  const generateRecommendations = (execution: TestExecution, isSignificant: boolean): string[] => {
    const recommendations: string[] = [];

    if (isSignificant) {
      recommendations.push('Consider implementing the winning variant across all content');
      recommendations.push('Document the key differences that drove success');
      recommendations.push('Plan follow-up tests to further optimize performance');
    } else {
      recommendations.push('Continue running the test to gather more data');
      recommendations.push('Consider increasing traffic allocation to speed up results');
      recommendations.push('Review if the changes are substantial enough to drive impact');
    }

    return recommendations;
  };

  const generateNextSteps = (execution: TestExecution, isSignificant: boolean): string[] => {
    const steps: string[] = [];

    if (isSignificant) {
      steps.push('Roll out winning variant to 100% of traffic');
      steps.push('Create documentation of learnings for future reference');
      steps.push('Identify next optimization opportunity based on results');
    } else {
      steps.push('Monitor test progress daily');
      steps.push('Ensure even traffic distribution between variants');
      steps.push('Prepare contingency plan if no significance is reached');
    }

    return steps;
  };

  // Winner determination visualization
  const getWinnerChartOption = () => {
    if (!selectedExecution) return {};

    const variants = selectedExecution.variants.map((v) => ({
      name: v.variantName,
      value: v.conversionRate,
      uplift: v.uplift || 0,
    }));

    return {
      title: {
        text: 'Variant Performance Comparison',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (
          params: Array<{ name: string; value: number; data: { value: number; uplift: number } }>
        ) => {
          const data = params[0];
          return `${data.name}<br/>Conversion Rate: ${data.value.toFixed(2)}%<br/>Uplift: ${data.data.uplift > 0 ? '+' : ''}${data.data.uplift.toFixed(1)}%`;
        },
      },
      xAxis: {
        type: 'category',
        data: variants.map((v) => v.name),
      },
      yAxis: {
        type: 'value',
        name: 'Conversion Rate (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          type: 'bar',
          data: variants.map((v) => ({
            value: v.value,
            uplift: v.uplift,
            itemStyle: {
              color: v.uplift > 0 ? '#10b981' : '#6b7280',
              borderRadius: [4, 4, 0, 0],
            },
          })),
        },
      ],
    };
  };

  // Statistical significance funnel
  const getSignificanceFunnelOption = () => {
    if (!selectedExecution || !analysis) return {};

    const control = selectedExecution.variants[0];
    const variant = selectedExecution.variants[1];

    return {
      title: {
        text: 'Conversion Funnel Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: '5%',
        data: ['Control', 'Variant'],
      },
      series: [
        {
          name: 'Control',
          type: 'funnel',
          left: '10%',
          width: '35%',
          label: {
            position: 'left',
          },
          data: [
            { value: control.impressions, name: 'Impressions' },
            {
              value: control.impressions * (control.metrics.click_through_rate / 100),
              name: 'Clicks',
            },
            { value: control.conversions, name: 'Conversions' },
          ],
          itemStyle: {
            color: '#6b7280',
          },
        },
        {
          name: 'Variant',
          type: 'funnel',
          left: '55%',
          width: '35%',
          label: {
            position: 'right',
          },
          data: [
            { value: variant.impressions, name: 'Impressions' },
            {
              value: variant.impressions * (variant.metrics.click_through_rate / 100),
              name: 'Clicks',
            },
            { value: variant.conversions, name: 'Conversions' },
          ],
          itemStyle: {
            color: '#3b82f6',
          },
        },
      ],
    };
  };

  // Metric comparison heatmap
  const getMetricHeatmapOption = () => {
    if (!selectedExecution) return {};

    const metrics = ['CTR', 'Engagement', 'View Duration', 'Shares', 'Saves'];
    const control = selectedExecution.variants[0];
    const variant = selectedExecution.variants[1];

    const data: Array<[number, number, string]> = [];
    metrics.forEach((metric, i) => {
      let metricKey: keyof typeof control.metrics;
      if (metric === 'CTR') {
        metricKey = 'click_through_rate';
      } else if (metric === 'Engagement') {
        metricKey = 'engagement_rate';
      } else if (metric === 'View Duration') {
        metricKey = 'view_duration';
      } else if (metric === 'Shares') {
        metricKey = 'shares';
      } else {
        metricKey = 'saves';
      }

      const controlValue = control.metrics[metricKey] || 0;
      const variantValue = variant.metrics[metricKey] || 0;
      const improvement =
        controlValue > 0 ? ((variantValue - controlValue) / controlValue) * 100 : 0;

      data.push([0, i, controlValue.toFixed(2)]);
      data.push([1, i, variantValue.toFixed(2)]);
      data.push([2, i, improvement.toFixed(1)]);
    });

    return {
      title: {
        text: 'Detailed Metric Analysis',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        position: 'top',
        formatter: (params: { data: [number, number, string] }) => {
          const xLabels = ['Control', 'Variant', 'Improvement %'];
          return `${xLabels[params.data[0]]}<br/>${metrics[params.data[1]]}: ${params.data[2]}${params.data[0] === 2 ? '%' : ''}`;
        },
      },
      grid: {
        height: '50%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: ['Control', 'Variant', 'Improvement %'],
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: metrics,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: -20,
        max: 50,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        color: ['#10b981', '#fbbf24', '#ef4444'],
      },
      series: [
        {
          name: 'Metrics',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
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
  };

  // Remove unused formatNumber function

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Performance Analysis & Optimization</h1>

      {selectedExecution && analysis && (
        <>
          {/* Statistical Significance Calculator */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Statistical Significance Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{analysis.confidence.toFixed(1)}%</div>
                <div className="text-gray-600">Confidence Level</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                  {analysis.significanceReached ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <span className="text-green-600">Yes</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-yellow-500" />
                      <span className="text-yellow-600">Not Yet</span>
                    </>
                  )}
                </div>
                <div className="text-gray-600">Statistical Significance</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {analysis.estimatedRemainingDays || 0}
                </div>
                <div className="text-gray-600">Est. Days to Significance</div>
              </div>
            </div>

            {analysis.winner && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">Winner Declared!</div>
                  <div className="text-green-700">
                    {
                      selectedExecution.variants.find((v) => v.variantId === analysis.winner)
                        ?.variantName
                    }{' '}
                    is the winning variant
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Performance Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <ReactECharts option={getWinnerChartOption()} style={{ height: 350 }} />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <ReactECharts option={getSignificanceFunnelOption()} style={{ height: 350 }} />
            </div>
          </div>

          {/* Detailed Metric Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <ReactECharts option={getMetricHeatmapOption()} style={{ height: 400 }} />
          </div>

          {/* Insights and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Key Insights
              </h2>
              <div className="space-y-3">
                {analysis.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      insight.type === 'positive'
                        ? 'border-green-200 bg-green-50'
                        : insight.type === 'negative'
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Info
                        className={`w-5 h-5 mt-0.5 ${
                          insight.type === 'positive'
                            ? 'text-green-600'
                            : insight.type === 'negative'
                              ? 'text-red-600'
                              : 'text-gray-600'
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{insight.title}</h3>
                        <p className="text-sm text-gray-700">{insight.description}</p>
                        {insight.metric && (
                          <span className="inline-block mt-2 text-xs bg-white px-2 py-1 rounded">
                            {insight.metric.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          insight.impact === 'high'
                            ? 'bg-red-100 text-red-700'
                            : insight.impact === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {insight.impact} impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                Recommendations & Next Steps
              </h2>

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-700">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Next Actions</h3>
                <ul className="space-y-2">
                  {analysis.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">→</span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Self-KOC Performance Analysis */}
      <SelfKOCPerformanceAnalysis />
    </div>
  );
};

export default ContentPerformanceOptimization;
