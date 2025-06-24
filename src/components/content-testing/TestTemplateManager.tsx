import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Copy, CheckCircle, Target, Clock } from 'lucide-react';
import { ContentTestingService } from '../../services/contentTestingService';
import { TestTemplate, KPIType } from '../../types/contentTesting';

const TestTemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<TestTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TestTemplate | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const temps = await ContentTestingService.getTestTemplates();
      setTemplates(temps);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const kpiOptions: { value: KPIType; label: string }[] = [
    { value: 'click_through_rate', label: 'Click-Through Rate' },
    { value: 'engagement_rate', label: 'Engagement Rate' },
    { value: 'view_duration', label: 'View Duration' },
    { value: 'conversion_rate', label: 'Conversion Rate' },
    { value: 'shares', label: 'Share Rate' },
    { value: 'saves', label: 'Save Rate' },
    { value: 'comments', label: 'Comment Rate' },
    { value: 'likes', label: 'Like Rate' },
  ];

  const categoryOptions = [
    'Visual Content',
    'Content Format',
    'Messaging',
    'Timing',
    'Platform-Specific',
    'Audience Targeting',
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram' },
  ];

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
        <h1 className="text-3xl font-bold text-gray-800">Test Template Manager</h1>
        <button
          onClick={() => {
            setSelectedTemplate(null);
            setShowEditor(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Template
        </button>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowEditor(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-medium capitalize">{template.platform}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{template.suggestedDuration} days</span>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">KPIs:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.suggestedKPIs.map((kpi) => (
                      <span key={kpi} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {kpi.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Best Practices:</div>
                  <ul className="space-y-1">
                    {template.bestPractices.slice(0, 2).map((practice, index) => (
                      <li key={index} className="text-xs text-gray-500 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{practice}</span>
                      </li>
                    ))}
                    {template.bestPractices.length > 2 && (
                      <li className="text-xs text-gray-400">
                        +{template.bestPractices.length - 2} more...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {selectedTemplate ? 'Edit Template' : 'Create New Template'}
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Thumbnail A/B Test"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    defaultValue={selectedTemplate?.category || categoryOptions[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  defaultValue={selectedTemplate?.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe what this template tests..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    defaultValue={selectedTemplate?.platform || 'all'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {platformOptions.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suggested Duration (days)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedTemplate?.suggestedDuration || 14}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="90"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Hypothesis
                </label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.defaultHypothesis}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Alternative thumbnail style will increase CTR by X%..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suggested KPIs
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {kpiOptions.map((kpi) => {
                    const isSelected = selectedTemplate?.suggestedKPIs.includes(kpi.value);
                    return (
                      <label key={kpi.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={isSelected}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{kpi.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Best Practices
                </label>
                <div className="space-y-2">
                  {(selectedTemplate?.bestPractices || ['']).map((practice, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={practice}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a best practice..."
                      />
                      <button type="button" className="p-2 text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    + Add Best Practice
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestTemplateManager;
