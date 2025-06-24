import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Plus, Lightbulb, Target, Beaker, ChevronRight, Search } from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { ABTestIdea, TestTemplate, KPIType, TestVariant } from '../../types/contentTesting';

const ContentIdeationPlanning: React.FC = () => {
  const [testIdeas, setTestIdeas] = useState<ABTestIdea[]>([]);
  const [templates, setTemplates] = useState<TestTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TestTemplate | null>(null);
  const [showIdeaBuilder, setShowIdeaBuilder] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Form state for new test idea
  const [newIdea, setNewIdea] = useState<Partial<ABTestIdea>>({
    name: '',
    hypothesis: '',
    description: '',
    platform: 'all',
    estimatedDuration: 14,
    category: 'Visual Content',
    tags: [],
    variants: [],
    kpis: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ideas, temps] = await Promise.all([
        ContentTestingService.getTestIdeas(),
        ContentTestingService.getTestTemplates(),
      ]);
      setTestIdeas(ideas);
      setTemplates(temps);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chart data for test ideas by status
  const testStatusData = {
    title: {
      text: 'A/B Test Ideas by Status',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: '5%',
      data: ['Draft', 'Planning', 'Active', 'Completed'],
    },
    series: [
      {
        name: 'Test Status',
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
        labelLine: { show: false },
        data: [
          {
            value: testIdeas.filter((t) => t.status === 'draft').length,
            name: 'Draft',
            itemStyle: { color: '#94a3b8' },
          },
          {
            value: testIdeas.filter((t) => t.status === 'planning').length,
            name: 'Planning',
            itemStyle: { color: '#3b82f6' },
          },
          {
            value: testIdeas.filter((t) => t.status === 'active').length,
            name: 'Active',
            itemStyle: { color: '#10b981' },
          },
          {
            value: testIdeas.filter((t) => t.status === 'completed').length,
            name: 'Completed',
            itemStyle: { color: '#8b5cf6' },
          },
        ],
      },
    ],
  };

  // Chart data for KPIs usage
  const kpiUsageData = {
    title: {
      text: 'Most Tracked KPIs',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['CTR', 'Engagement', 'View Duration', 'Conversion', 'Shares', 'Saves'],
      axisLabel: { interval: 0, rotate: 45 },
    },
    yAxis: { type: 'value', name: 'Usage Count' },
    series: [
      {
        data: [12, 10, 8, 7, 6, 5],
        type: 'bar',
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const kpiOptions: { value: KPIType; label: string; unit: string }[] = [
    { value: 'click_through_rate', label: 'Click-Through Rate', unit: '%' },
    { value: 'engagement_rate', label: 'Engagement Rate', unit: '%' },
    { value: 'view_duration', label: 'Average View Duration', unit: 'seconds' },
    { value: 'conversion_rate', label: 'Conversion Rate', unit: '%' },
    { value: 'shares', label: 'Share Rate', unit: '%' },
    { value: 'saves', label: 'Save Rate', unit: '%' },
    { value: 'comments', label: 'Comment Rate', unit: '%' },
    { value: 'likes', label: 'Like Rate', unit: '%' },
  ];

  const handleTemplateSelect = (template: TestTemplate) => {
    setSelectedTemplate(template);
    setNewIdea({
      ...newIdea,
      name: '',
      hypothesis: template.defaultHypothesis,
      category: template.category,
      platform: template.platform as 'youtube' | 'tiktok' | 'instagram' | 'all',
      estimatedDuration: template.suggestedDuration,
      kpis: template.suggestedKPIs.map((kpi) => ({
        type: kpi,
        targetValue: 0,
        weight: 1 / template.suggestedKPIs.length,
        unit: kpiOptions.find((k) => k.value === kpi)?.unit || '%',
      })),
    });
    setShowIdeaBuilder(true);
  };

  const handleAddVariant = () => {
    const newVariant: TestVariant = {
      id: `variant-${Date.now()}`,
      name: '',
      type: newIdea.variants?.length === 0 ? 'control' : 'variant',
      description: '',
      changes: [],
    };
    setNewIdea({
      ...newIdea,
      variants: [...(newIdea.variants || []), newVariant],
    });
  };

  const handleSaveIdea = async () => {
    try {
      await ContentTestingService.createTestIdea(newIdea);
      await loadData();
      setShowIdeaBuilder(false);
      setNewIdea({
        name: '',
        hypothesis: '',
        description: '',
        platform: 'all',
        estimatedDuration: 14,
        category: 'Visual Content',
        tags: [],
        variants: [],
        kpis: [],
      });
      setSelectedTemplate(null);
    } catch (error) {
      console.error('Error saving test idea:', error);
    }
  };

  const filteredIdeas = testIdeas.filter((idea) => {
    const categoryMatch = selectedCategory === 'all' || idea.category === selectedCategory;
    const searchMatch =
      searchTerm === '' ||
      idea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.hypothesis.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Content Ideation & Planning</h1>
        <button
          onClick={() => setShowIdeaBuilder(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Test Idea
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={testStatusData} style={{ height: 300 }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <ReactECharts option={kpiUsageData} style={{ height: 300 }} />
        </div>
      </div>

      {/* Test Templates */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Beaker className="w-6 h-6 text-blue-600" />
          Test Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{template.platform}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Test Ideas */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Test Ideas Repository
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Visual Content">Visual Content</option>
              <option value="Content Format">Content Format</option>
              <option value="Messaging">Messaging</option>
              <option value="Timing">Timing</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{idea.name}</h3>
                  <p className="text-gray-600">{idea.hypothesis}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    idea.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : idea.status === 'completed'
                        ? 'bg-purple-100 text-purple-700'
                        : idea.status === 'planning'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {idea.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {idea.kpis.length} KPIs
                </span>
                <span>{idea.variants.length} Variants</span>
                <span>{idea.estimatedDuration} days</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{idea.platform}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Idea Builder Modal */}
      {showIdeaBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {selectedTemplate
                ? `Create Test from Template: ${selectedTemplate.name}`
                : 'Create New A/B Test'}
            </h2>

            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                <input
                  type="text"
                  value={newIdea.name || ''}
                  onChange={(e) => setNewIdea({ ...newIdea, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Thumbnail Style Test - Product vs Lifestyle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hypothesis</label>
                <textarea
                  value={newIdea.hypothesis || ''}
                  onChange={(e) => setNewIdea({ ...newIdea, hypothesis: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="What do you expect to happen and why?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={newIdea.platform || 'all'}
                    onChange={(e) =>
                      setNewIdea({
                        ...newIdea,
                        platform: e.target.value as 'all' | 'youtube' | 'tiktok' | 'instagram',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Platforms</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newIdea.category || 'Visual Content'}
                    onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Visual Content">Visual Content</option>
                    <option value="Content Format">Content Format</option>
                    <option value="Messaging">Messaging</option>
                    <option value="Timing">Timing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={newIdea.estimatedDuration || 14}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, estimatedDuration: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="90"
                  />
                </div>
              </div>
            </div>

            {/* KPI Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {kpiOptions.map((kpi) => {
                  const isSelected = newIdea.kpis?.some((k) => k.type === kpi.value);
                  return (
                    <label
                      key={kpi.value}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewIdea({
                              ...newIdea,
                              kpis: [
                                ...(newIdea.kpis || []),
                                {
                                  type: kpi.value,
                                  targetValue: 0,
                                  weight: 0.25,
                                  unit: kpi.unit,
                                },
                              ],
                            });
                          } else {
                            setNewIdea({
                              ...newIdea,
                              kpis: newIdea.kpis?.filter((k) => k.type !== kpi.value) || [],
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="flex-1">{kpi.label}</span>
                      <span className="text-sm text-gray-500">{kpi.unit}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Variants */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Test Variants</h3>
                <button
                  onClick={handleAddVariant}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Variant
                </button>
              </div>

              {newIdea.variants?.map((variant, index) => (
                <div key={variant.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Variant name"
                      value={variant.name}
                      onChange={(e) => {
                        const updated = [...(newIdea.variants || [])];
                        updated[index] = { ...variant, name: e.target.value };
                        setNewIdea({ ...newIdea, variants: updated });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={variant.type}
                      onChange={(e) => {
                        const updated = [...(newIdea.variants || [])];
                        updated[index] = {
                          ...variant,
                          type: e.target.value as 'control' | 'variant',
                        };
                        setNewIdea({ ...newIdea, variants: updated });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="control">Control</option>
                      <option value="variant">Variant</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Describe what changes in this variant..."
                    value={variant.description}
                    onChange={(e) => {
                      const updated = [...(newIdea.variants || [])];
                      updated[index] = { ...variant, description: e.target.value };
                      setNewIdea({ ...newIdea, variants: updated });
                    }}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* Best Practices */}
            {selectedTemplate && (
              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
                <ul className="space-y-1">
                  {selectedTemplate.bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowIdeaBuilder(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIdea}
                disabled={
                  !newIdea.name || !newIdea.hypothesis || (newIdea.variants?.length || 0) < 2
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Test Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentIdeationPlanning;
