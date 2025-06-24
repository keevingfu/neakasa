import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, Users, Search, Video, BarChart3, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { commentAnalysisService } from '../../services/commentAnalysisService';
import { domainMockData } from '../../services/domainMockData';
import { ContentTestingService } from '../../services/contentTestingService';
import { useVideos } from '../../hooks/useVideoQuery';

const ContentInsightOverview: React.FC = () => {
  // Fetch data from different services
  const { data: _comments } = useQuery({
    queryKey: ['comments-overview'],
    queryFn: () => commentAnalysisService.getComments(),
  });

  const { data: sentiment } = useQuery({
    queryKey: ['sentiment-overview'],
    queryFn: async () => {
      const allComments = await commentAnalysisService.getComments();
      return commentAnalysisService.getSentimentAnalysis(allComments);
    },
  });

  const { data: viralVideos } = useVideos(10, { platform: 'all' });

  const { data: testResults } = useQuery({
    queryKey: ['test-executions-overview'],
    queryFn: () => ContentTestingService.getTestExecutions(),
  });

  // Calculate key metrics
  const totalEngagement = viralVideos?.reduce((sum, video) => 
    sum + video.likes + video.comments + video.shares, 0) || 0;

  const avgViralityScore = viralVideos ? 
    viralVideos.reduce((sum, video) => sum + (video.views / 1000000), 0) / viralVideos.length : 0;

  const topKeywords = domainMockData['neakasa.com'].keywords
    .sort((a, b) => b.search_volume - a.search_volume)
    .slice(0, 5);

  const totalSearchVolume = topKeywords.reduce((sum, kw) => sum + kw.search_volume, 0);

  const activeTests = testResults?.filter(test => test.status === 'active').length || 0;
  const avgTestUplift = testResults ? 
    testResults.reduce((sum, test) => {
      const maxUplift = Math.max(...test.variants.map(v => v.uplift || 0));
      return sum + maxUplift;
    }, 0) / testResults.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Insight Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Comprehensive analysis across consumer voice, search trends, viral content, and growth factors
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Consumer Voice Metric */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sentiment Score</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {sentiment ? (sentiment.averageSentimentScore * 100).toFixed(1) : 0}%
              </p>
              <p className="mt-1 text-sm text-green-600">
                +{((sentiment?.positive || 0) / (sentiment?.total || 1) * 100).toFixed(0)}% positive
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Search Insights Metric */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Search Volume</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {(totalSearchVolume / 1000).toFixed(1)}K
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Across {topKeywords.length} keywords
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Viral Video Metric */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Views (M)</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {avgViralityScore.toFixed(1)}M
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {viralVideos?.length || 0} viral videos
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Video className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Growth Factor Metric */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Test Uplift</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                +{avgTestUplift.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {activeTests} active tests
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumer Voice Analysis Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Consumer Voice Analysis</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Positive Sentiment</span>
                <span className="font-medium">{((sentiment?.positive || 0) / (sentiment?.total || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(sentiment?.positive || 0) / (sentiment?.total || 1) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Neutral Sentiment</span>
                <span className="font-medium">{((sentiment?.neutral || 0) / (sentiment?.total || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: `${(sentiment?.neutral || 0) / (sentiment?.total || 1) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Negative Sentiment</span>
                <span className="font-medium">{((sentiment?.negative || 0) / (sentiment?.total || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(sentiment?.negative || 0) / (sentiment?.total || 1) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Total Comments Analyzed: {sentiment?.total || 0}
            </p>
          </div>
        </Card>

        {/* Search Insights Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Search Insights</h2>
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{keyword.keyword}</p>
                  <p className="text-xs text-gray-500">Position: #{keyword.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{(keyword.search_volume / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500">CPC: ${keyword.cpc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Viral Video Insights Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Viral Video Performance</h2>
            <Video className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(totalEngagement / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">Total Engagement</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {viralVideos?.length || 0}
                </p>
                <p className="text-xs text-gray-500">Viral Videos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {avgViralityScore.toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">Avg Views</p>
              </div>
            </div>
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Likes</span>
                </div>
                <span className="font-medium">
                  {((viralVideos?.reduce((sum, v) => sum + v.likes, 0) || 0) / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Shares</span>
                </div>
                <span className="font-medium">
                  {((viralVideos?.reduce((sum, v) => sum + v.shares, 0) || 0) / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Viral Factor Analysis Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Growth Factor Analysis</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Active A/B Tests</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(activeTests / (testResults?.length || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{activeTests}/{testResults?.length || 0}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Test Success Rate</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-lg font-bold text-green-600">
                    {testResults?.filter(t => t.variants.some(v => (v.uplift || 0) > 10)).length || 0}
                  </p>
                  <p className="text-xs text-green-600">Successful</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold text-gray-600">
                    {testResults?.filter(t => !t.variants.some(v => (v.uplift || 0) > 10)).length || 0}
                  </p>
                  <p className="text-xs text-gray-600">Learning</p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">
                Average uplift from successful tests: <span className="font-medium text-gray-900">+{avgTestUplift.toFixed(1)}%</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Analyze Comments</p>
            <p className="text-sm text-gray-500">Deep dive into consumer sentiment</p>
          </button>
          <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
            <Search className="w-5 h-5 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Keyword Research</p>
            <p className="text-sm text-gray-500">Discover trending search terms</p>
          </button>
          <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
            <Video className="w-5 h-5 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Find Viral Content</p>
            <p className="text-sm text-gray-500">Explore top performing videos</p>
          </button>
          <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-5 h-5 text-orange-600 mb-2" />
            <p className="font-medium text-gray-900">Run A/B Test</p>
            <p className="text-sm text-gray-500">Test content variations</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ContentInsightOverview;