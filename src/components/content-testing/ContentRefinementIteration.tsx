import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Lightbulb,
  BookOpen,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Copy,
  XCircle,
} from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import {
  TestLearning,
  ContentImprovement,
  TestAnalysis,
  TestExecution,
  ABTestIdea,
} from '../../types/contentTesting';

const ContentRefinementIteration: React.FC = () => {
  const [learnings, setLearnings] = useState<TestLearning[]>([]);
  const [improvements, setImprovements] = useState<ContentImprovement[]>([]);
  const [executions, setExecutions] = useState<TestExecution[]>([]);
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [learns, execs, ideas] = await Promise.all([
        ContentTestingService.getTestLearnings(),
        ContentTestingService.getTestExecutions(),
        ContentTestingService.getTestIdeas(),
      ]);
      setLearnings(learns);
      setExecutions(execs);
      setTestIdeas(ideas);

      // Generate improvements for the first execution
      if (execs.length > 0) {
        const testAnalysis: TestAnalysis = {
          testId: execs[0].testId,
          executionId: execs[0].id,
          confidence: 95,
          significanceReached: true,
          insights: [],
          recommendations: [],
          nextSteps: [],
        };
        const imps = ContentTestingService.generateContentImprovements(testAnalysis);
        setImprovements(imps);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Learning impact visualization
  const getLearningImpactOption = () => {
    const categories = ['Thumbnail', 'Title', 'Hook', 'Format', 'Timing'];
    const avgUplift = categories.map((cat) => {
      const catLearnings = learnings.filter((l) => l.category.includes(cat));
      if (catLearnings.length === 0) return 0;
      return catLearnings.reduce((sum, l) => sum + l.metrics.uplift, 0) / catLearnings.length;
    });

    return {
      title: {
        text: 'Average Uplift by Optimization Type',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%',
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { interval: 0, rotate: 45 },
      },
      yAxis: {
        type: 'value',
        name: 'Average Uplift (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          type: 'bar',
          data: avgUplift.map((value) => ({
            value,
            itemStyle: {
              color: value > 20 ? '#10b981' : value > 10 ? '#3b82f6' : '#6b7280',
              borderRadius: [4, 4, 0, 0],
            },
          })),
        },
      ],
    };
  };

  // Best practices radar chart
  const getBestPracticesRadarOption = () => {
    const platforms = ['YouTube', 'TikTok', 'Instagram'];
    const metrics = ['Thumbnail', 'Title', 'Description', 'Hashtags', 'Timing'];

    const data = platforms.map((platform) => {
      const _platformLearnings = learnings.filter((l) => l.platform === platform.toLowerCase());
      return {
        name: platform,
        value: metrics.map(() => Math.random() * 80 + 20), // Mock data for demonstration
      };
    });

    return {
      title: {
        text: 'Platform-Specific Best Practices Score',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {},
      legend: {
        bottom: '5%',
        data: platforms,
      },
      radar: {
        indicator: metrics.map((m) => ({ name: m, max: 100 })),
        radius: '65%',
      },
      series: [
        {
          type: 'radar',
          data: data.map((d) => ({
            ...d,
            areaStyle: { opacity: 0.1 },
            lineStyle: { width: 2 },
          })),
        },
      ],
    };
  };

  // Improvement timeline
  const getImprovementTimelineOption = () => {
    const timelineData = executions.map((exec) => {
      const test = testIdeas.find((t) => t.id === exec.testId);
      const variant = exec.variants[1]; // Assume variant is index 1
      return {
        date: new Date(exec.startDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        uplift: variant?.uplift || 0,
        name: test?.name || 'Unknown Test',
      };
    });

    return {
      title: {
        text: 'Improvement Journey Over Time',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: Array<{ name: string; value: number; data: { name: string } }>) => {
          const data = params[0];
          return `${data.name}<br/>Test: ${data.data.name}<br/>Uplift: ${data.value}%`;
        },
      },
      xAxis: {
        type: 'category',
        data: timelineData.map((d) => d.date),
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: 'Uplift (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          type: 'line',
          data: timelineData.map((d) => ({
            value: d.uplift,
            name: d.name,
          })),
          smooth: true,
          symbolSize: 8,
          itemStyle: {
            color: '#3b82f6',
          },
          areaStyle: {
            color: 'rgba(59, 130, 246, 0.1)',
          },
        },
      ],
    };
  };

  const filteredLearnings = learnings.filter((learning) => {
    const categoryMatch = selectedCategory === 'all' || learning.category === selectedCategory;
    const platformMatch = selectedPlatform === 'all' || learning.platform === selectedPlatform;
    return categoryMatch && platformMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Content Refinement & Iteration</h1>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getLearningImpactOption()} style={{ height: 300 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getBestPracticesRadarOption()} style={{ height: 300 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={getImprovementTimelineOption()} style={{ height: 300 }} />
        </div>
      </div>

      {/* Improvement Recommendations */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Improvement Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {improvements.map((improvement) => (
            <div key={improvement.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded mb-2">
                    {improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)}
                  </span>
                  <h3 className="font-semibold">{improvement.reason}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {(improvement.confidenceScore * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Original</div>
                  <div className="text-sm line-through text-gray-600">
                    {improvement.originalValue}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 mx-auto" />
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Improved</div>
                  <div className="text-sm font-medium">{improvement.improvedValue}</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <strong>Expected Impact:</strong> {improvement.expectedImpact}
              </div>

              <button
                className={`w-full py-2 rounded-lg transition-colors ${
                  improvement.implemented
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={improvement.implemented}
              >
                {improvement.implemented ? 'Implemented' : 'Apply Improvement'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Test Learning Repository */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Test Learning Repository
          </h2>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Visual Content">Visual Content</option>
              <option value="Content Format">Content Format</option>
              <option value="Messaging">Messaging</option>
            </select>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredLearnings.map((learning) => (
            <div
              key={learning.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{learning.title}</h3>
                  <p className="text-gray-600">{learning.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +{learning.metrics.uplift.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Uplift</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded">{learning.platform}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {learning.category}
                </span>
                <span className="text-gray-500">
                  {new Date(learning.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Do's</h4>
                  <ul className="space-y-1">
                    {learning.dosList.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Don'ts</h4>
                  <ul className="space-y-1">
                    {learning.dontsList.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Key Takeaways</h4>
                <div className="flex flex-wrap gap-2">
                  {learning.keyTakeaways.map((takeaway, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {takeaway}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 text-sm">
                <span className="text-gray-500">
                  Confidence: {learning.metrics.confidence.toFixed(1)}%
                </span>
                <span className="text-gray-500">
                  Sample Size: {learning.metrics.sampleSize.toLocaleString()}
                </span>
                <button className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Copy className="w-4 h-4" />
                  Copy Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Action Suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Suggested Next Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-2">Test Hook Variations</h3>
            <p className="text-sm text-gray-600 mb-3">
              Based on recent learnings, testing different hook styles could improve view duration
              by 20-30%
            </p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Test
            </button>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-2">Optimize Thumbnails</h3>
            <p className="text-sm text-gray-600 mb-3">
              Lifestyle thumbnails are showing 25% higher CTR. Consider updating your content
              library
            </p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              View Guidelines
            </button>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-2">Platform-Specific Content</h3>
            <p className="text-sm text-gray-600 mb-3">
              TikTok content is outperforming. Consider creating platform-optimized variations
            </p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Explore Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRefinementIteration;
