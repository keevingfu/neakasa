import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import {
  Beaker,
  Play,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Clock,
  // CheckCircle,
  // XCircle,
  ArrowRight,
  Award,
  Activity,
  BookOpen,
  Users,
} from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { ABTestIdea, TestExecution, TestLearning } from '../../types/contentTesting';

const ContentTestingHub: React.FC = () => {
  const navigate = useNavigate();
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [executions, setExecutions] = useState<TestExecution[]>([]);
  const [learnings, setLearnings] = useState<TestLearning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ideas, execs, learns] = await Promise.all([
        ContentTestingService.getTestIdeas(),
        ContentTestingService.getTestExecutions(),
        ContentTestingService.getTestLearnings(),
      ]);
      setTestIdeas(ideas);
      setExecutions(execs);
      setLearnings(learns);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    totalTests: testIdeas.length,
    activeTests: testIdeas.filter((t) => t.status === 'active').length,
    completedTests: testIdeas.filter((t) => t.status === 'completed').length,
    avgUplift:
      executions.reduce((sum, exec) => {
        const variant = exec.variants.find((v) => v.uplift);
        return sum + (variant?.uplift || 0);
      }, 0) / executions.length || 0,
    totalImpressions: executions.reduce((sum, exec) => sum + exec.sampleSize, 0),
    successRate:
      (executions.filter((exec) => {
        const variant = exec.variants.find((v) => v.uplift && v.uplift > 0);
        return variant && variant.confidence && variant.confidence >= 95;
      }).length /
        executions.length) *
        100 || 0,
  };

  // Test status distribution chart
  const getStatusChartOption = () => ({
    tooltip: { trigger: 'item' },
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
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        labelLine: { show: false },
        data: [
          { value: stats.activeTests, name: 'Active', itemStyle: { color: '#10b981' } },
          {
            value: testIdeas.filter((t) => t.status === 'planning').length,
            name: 'Planning',
            itemStyle: { color: '#3b82f6' },
          },
          { value: stats.completedTests, name: 'Completed', itemStyle: { color: '#8b5cf6' } },
          {
            value: testIdeas.filter((t) => t.status === 'draft').length,
            name: 'Draft',
            itemStyle: { color: '#94a3b8' },
          },
        ],
      },
    ],
  });

  // Performance trend chart
  const getPerformanceTrendOption = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>Tests: {c0}<br/>Avg Uplift: {c1}%',
      },
      legend: {
        data: ['Active Tests', 'Avg Uplift'],
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: last7Days,
      },
      yAxis: [
        {
          type: 'value',
          name: 'Tests',
          position: 'left',
        },
        {
          type: 'value',
          name: 'Uplift %',
          position: 'right',
          axisLabel: { formatter: '{value}%' },
        },
      ],
      series: [
        {
          name: 'Active Tests',
          type: 'bar',
          data: [2, 2, 3, 3, 2, 2, stats.activeTests],
          itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
        },
        {
          name: 'Avg Uplift',
          type: 'line',
          yAxisIndex: 1,
          data: [15, 18, 22, 20, 25, 23, stats.avgUplift],
          smooth: true,
          itemStyle: { color: '#10b981' },
        },
      ],
    };
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Content Testing Hub</h1>
          <p className="text-gray-600 mt-1">
            Optimize your content through data-driven A/B testing
          </p>
        </div>
        <Link
          to="/content-testing/ideation"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Beaker className="w-5 h-5" />
          Create New Test
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Tests</span>
            <Beaker className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{stats.totalTests}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active</span>
            <Play className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.activeTests}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Uplift</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">+{stats.avgUplift.toFixed(1)}%</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Success Rate</span>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{stats.successRate.toFixed(0)}%</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Impressions</span>
            <Activity className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">{formatNumber(stats.totalImpressions)}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Learnings</span>
            <BookOpen className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold">{learnings.length}</div>
        </div>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Test Status Distribution</h2>
          <ReactECharts option={getStatusChartOption()} style={{ height: 300 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Testing Performance Trend</h2>
          <ReactECharts option={getPerformanceTrendOption()} style={{ height: 300 }} />
        </div>
      </div>

      {/* Active Tests */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Play className="w-6 h-6 text-green-500" />
            Active Tests
          </h2>
          <Link
            to="/content-testing/execution"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {executions.slice(0, 3).map((execution) => {
            const test = testIdeas.find((t) => t.id === execution.testId);
            if (!test) return null;

            const leadingVariant = execution.variants.reduce((prev, current) =>
              current.conversionRate > prev.conversionRate ? current : prev
            );

            const daysRunning = Math.floor(
              (new Date().getTime() - new Date(execution.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={execution.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/content-testing/execution')}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold flex-1">{test.name}</h3>
                  <div className="flex items-center gap-1 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{daysRunning}d</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Leading:</span>
                    <span className="font-medium">{leadingVariant.variantName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uplift:</span>
                    <span
                      className={`font-medium ${
                        leadingVariant.uplift && leadingVariant.uplift > 0
                          ? 'text-green-600'
                          : 'text-gray-700'
                      }`}
                    >
                      {leadingVariant.uplift ? `+${leadingVariant.uplift.toFixed(1)}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium">
                      {leadingVariant.confidence?.toFixed(1) || '0'}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((execution.sampleSize / 50000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Link
          to="/content-testing/self-koc"
          className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <Users className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="font-semibold mb-1">Self-KOC Analysis</h3>
          <p className="text-sm text-gray-600">Analyze owned accounts</p>
        </Link>
        
        <Link
          to="/content-testing/ideation"
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <Lightbulb className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-1">Ideation & Planning</h3>
          <p className="text-sm text-gray-600">Create and plan new A/B tests</p>
        </Link>

        <Link
          to="/content-testing/execution"
          className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <Activity className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-1">Test Execution</h3>
          <p className="text-sm text-gray-600">Monitor active test performance</p>
        </Link>

        <Link
          to="/content-testing/performance"
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-1">Performance Analysis</h3>
          <p className="text-sm text-gray-600">Analyze test results & insights</p>
        </Link>

        <Link
          to="/content-testing/refinement"
          className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold mb-1">Learning Repository</h3>
          <p className="text-sm text-gray-600">Document and apply learnings</p>
        </Link>

        <Link
          to="/content-testing/comparison"
          className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-2xl hover:shadow-md transition-shadow"
        >
          <BarChart3 className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-semibold mb-1">Test Comparison</h3>
          <p className="text-sm text-gray-600">Compare test performance</p>
        </Link>
      </div>

      {/* Recent Learnings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Recent Learnings
          </h2>
          <Link
            to="/content-testing/refinement"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {learnings.slice(0, 3).map((learning) => (
            <div
              key={learning.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{learning.title}</h3>
                  <p className="text-sm text-gray-600">{learning.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {learning.platform}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {learning.category}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-green-600">
                    +{learning.metrics.uplift.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">Uplift</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTestingHub;
