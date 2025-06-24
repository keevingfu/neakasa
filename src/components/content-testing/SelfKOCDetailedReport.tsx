import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface DetailedReportProps {
  product: 'catbox' | 'garmentsteamer';
}

const SelfKOCDetailedReport: React.FC<DetailedReportProps> = ({ product }) => {
  const insights = {
    catbox: {
      strengths: [
        {
          title: 'High TikTok Engagement',
          description: 'Average engagement rate of 8.5% significantly exceeds industry average (1-3%)',
          impact: 'high',
          metrics: '371K likes, 62K shares across 1.8K videos'
        },
        {
          title: 'Viral Content Success',
          description: 'Multiple videos achieving 100K+ likes demonstrate strong viral potential',
          impact: 'high',
          metrics: 'Top video: 111.7K likes, 15.9K shares'
        },
        {
          title: 'YouTube Authority Building',
          description: 'Consistent long-form content establishing product expertise',
          impact: 'medium',
          metrics: '10.2M total views, 4.15% engagement rate'
        }
      ],
      weaknesses: [
        {
          title: 'Low Instagram Conversion',
          description: 'Despite 148M views, engagement rate only 0.52%',
          impact: 'high',
          suggestion: 'Implement Instagram-specific content strategy with Stories and Reels'
        },
        {
          title: 'Limited Account Diversification',
          description: 'Only 35 accounts across all platforms',
          impact: 'medium',
          suggestion: 'Expand KOC network to 50+ accounts for better reach'
        }
      ],
      opportunities: [
        'Pet influencer collaborations on TikTok',
        'YouTube Shorts to capture mobile audience',
        'Instagram pet community engagement campaigns',
        'Cross-platform content repurposing strategy'
      ],
      recommendations: [
        {
          priority: 'high',
          action: 'Scale TikTok content production',
          timeline: 'Immediate',
          expectedImpact: '+25% engagement within 3 months'
        },
        {
          priority: 'high',
          action: 'Revamp Instagram content strategy',
          timeline: '1-2 months',
          expectedImpact: 'Increase engagement rate to 2%+'
        },
        {
          priority: 'medium',
          action: 'Launch YouTube Shorts program',
          timeline: '2-3 months',
          expectedImpact: 'Capture additional 5M views/month'
        }
      ]
    },
    garmentsteamer: {
      strengths: [
        {
          title: 'Larger KOC Network',
          description: '44 accounts providing broader market coverage',
          impact: 'medium',
          metrics: '79 total accounts, 44 for garment steamer'
        },
        {
          title: 'Consistent Content Volume',
          description: 'Over 5,000 pieces of content across platforms',
          impact: 'medium',
          metrics: '5,156 total posts, averaging 117 per account'
        },
        {
          title: 'Strong TikTok Performance',
          description: 'Maintaining 7.2% engagement rate on TikTok',
          impact: 'high',
          metrics: '425K likes, 71K shares'
        }
      ],
      weaknesses: [
        {
          title: 'Lower Overall Engagement',
          description: 'Average engagement rate (3.83%) below cat litter box (4.39%)',
          impact: 'high',
          suggestion: 'Develop more emotionally engaging content angles'
        },
        {
          title: 'Instagram Underperformance',
          description: 'Even lower engagement (0.48%) than cat litter box',
          impact: 'high',
          suggestion: 'Focus on lifestyle and fashion content for Instagram'
        }
      ],
      opportunities: [
        'Fashion and lifestyle influencer partnerships',
        'Before/after transformation content',
        'Travel and convenience-focused messaging',
        'Seasonal campaigns (wedding, holiday seasons)'
      ],
      recommendations: [
        {
          priority: 'high',
          action: 'Create emotional storytelling content',
          timeline: 'Immediate',
          expectedImpact: 'Increase engagement by 20%'
        },
        {
          priority: 'medium',
          action: 'Launch fashion influencer program',
          timeline: '1-2 months',
          expectedImpact: 'Reach fashion-conscious audience segment'
        },
        {
          priority: 'medium',
          action: 'Seasonal content calendar',
          timeline: '2-3 months',
          expectedImpact: 'Capitalize on peak demand periods'
        }
      ]
    }
  };

  const currentInsights = insights[product];

  return (
    <div className="space-y-6">
      {/* Strengths */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Key Strengths
        </h3>
        <div className="space-y-4">
          {currentInsights.strengths.map((strength, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{strength.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{strength.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{strength.metrics}</p>
                </div>
                <Badge variant={strength.impact === 'high' ? 'default' : 'secondary'}>
                  {strength.impact} impact
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weaknesses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          Areas for Improvement
        </h3>
        <div className="space-y-4">
          {currentInsights.weaknesses.map((weakness, index) => (
            <div key={index} className="border-l-4 border-yellow-500 pl-4">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{weakness.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{weakness.description}</p>
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="text-sm font-medium text-blue-900">Suggestion:</p>
                  <p className="text-sm text-blue-700">{weakness.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Opportunities */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Growth Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentInsights.opportunities.map((opportunity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">{opportunity}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Plan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Action Plan</h3>
        <div className="space-y-4">
          {currentInsights.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className={`px-3 py-1 rounded text-sm font-medium ${
                rec.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {rec.priority.toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{rec.action}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>Timeline: {rec.timeline}</span>
                  <span>•</span>
                  <span>Expected Impact: {rec.expectedImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ROI Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ROI & Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Cost per Engagement</p>
            <p className="text-2xl font-bold mt-2">
              ${product === 'catbox' ? '0.043' : '0.052'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Industry avg: $0.08</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Content Efficiency</p>
            <p className="text-2xl font-bold mt-2">
              {product === 'catbox' ? '270' : '214'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Engagements per post</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Platform ROI Leader</p>
            <p className="text-2xl font-bold mt-2">TikTok</p>
            <p className="text-xs text-gray-500 mt-1">
              {product === 'catbox' ? '8.5%' : '7.2%'} engagement
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SelfKOCDetailedReport;